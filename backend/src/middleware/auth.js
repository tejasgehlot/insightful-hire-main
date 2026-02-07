const { verify } = require('../utils/jwt');
const User = require('../models/User');

async function authenticate(req, res, next) {
  const auth = req.headers.authorization || '';
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = parts[1];
  try {
    const payload = verify(token);
    const user = await User.findById(payload.id).select('-passwordHash -refreshTokens');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
