const jwt = require('jsonwebtoken');
const {
  UnauthenticatedError,
  BadRequestError,
  CustomAPIError,
} = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Input values');
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'Token Created', token });
};

const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number`,
  });
};

module.exports = {
  login,
  dashboard,
};
