const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const router = express.Router(); // Initialize router

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json('User created successfully');
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return res.status(400).json({ code: 'DUPLICATE_FIELD', message: `${duplicateField} already exists` });
    }
    res.status(500).json({ code: 'SERVER_ERROR', message: 'An error occurred' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: 'An error occurred' });
  }
});

module.exports = router; // Export router
