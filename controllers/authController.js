const User = require('../models/User');
// const httpErrors = require('http-errors'); //ask why it was declared but never used
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../utils/validation');

const register = async (req, res) => {
  const result = await registerValidator.validateAsync(req.body);
  const {
    email,
    password,
    gender,
    firstName,
    lastName,
    phone,
    role,
    otherNames,
  } = result;

  // check if email is already in the database
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    res.status(400).json({ message: 'Email already exists.' });
    return;
  }

  // hash the password

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    gender,
    firstName,
    lastName,
    phone,
    role,
    otherNames,
    password: hashedPassword,
  });

  res.status(201).json({ user });
};

const login = async (req, res) => {
  const result = await loginValidator.validateAsync(req.body);
  const { email, password } = result;

  // check if email is in the database
  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  // check for password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  // generate token
  const token = jwt.sign({ id: user._id }, '123456789', {
    expiresIn: '7h',
  });
  res.status(200).json({ user ,token});

  // res.status(200).json({ token });
};

/////////////VERIFY TOKEN/////////////////
// const verifyToken = (req, res, next) => {
//   let token = req.headers['authorization'] || '';

//   token = token.split(' ')[1];
//   if (token) {
//     const decodedToken = jwt.verify(token, '123456789');
//     req.user = decodedToken.id;
//     next();
//   } else {
//     res.status(403).json({ message: 'Unauthotized' });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ Users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('User with this ID could not be found.');
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findOneAndDelete({ _id: userId });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}
