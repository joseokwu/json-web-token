const {
  UnauthenticatedError,
  BadRequestError,
  CustomAPIError,
} = require('../errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearing ')) {
    throw new UnauthenticatedError('You are not authorized access');
  }
  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Cant verify authentication');
  }
};

module.exports = authMiddleware;
