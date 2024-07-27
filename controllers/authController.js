const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log('Registering user:', username, email);
    const user = new User({ username, password, email });
    await user.save();
    console.log('User registered successfully');
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Attempting to login user: ${username}`);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    console.log(`User found: ${username}, comparing passwords...`);
    const isMatch = await user.comparePassword(password);
    console.log(`Password match result: ${isMatch}`);

    if (!isMatch) {
      console.log('Invalid password');
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, token generated');
    res.send({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
