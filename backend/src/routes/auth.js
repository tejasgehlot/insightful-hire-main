const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signAccess, signRefresh, verify } = require('../utils/jwt');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash, name, role });
    await user.save();

    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.json({ ok: true });

    // remove refresh token from any user that has it
    await User.updateOne({ 'refreshTokens.token': refreshToken }, { $pull: { refreshTokens: { token: refreshToken } } });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).json({ error: 'Missing refresh token' });

    let payload;
    try { payload = verify(refreshToken); } catch (e) { return res.status(401).json({ error: 'Invalid refresh token' }); }

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const found = user.refreshTokens.some(rt => rt.token === refreshToken);
    if (!found) return res.status(401).json({ error: 'Refresh token revoked' });

    const accessToken = signAccess(user);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Me
router.get('/me', authenticate, async (req, res) => {
  const user = req.user;
  res.json({ id: user._id, email: user.email, role: user.role, name: user.name });
});

module.exports = router;
