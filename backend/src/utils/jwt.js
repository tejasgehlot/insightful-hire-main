const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function signAccess(user) {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

function signRefresh(user) {
  const payload = { id: user._id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signAccess, signRefresh, verify };
