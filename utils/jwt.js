const jwt = require('jsonwebtoken');

const { JWT_KEY = 'some-secret-key' } = process.env;

const getJwt = (payload) => jwt.sign(payload, JWT_KEY, { expiresIn: '10d' });

module.exports = { getJwt };
