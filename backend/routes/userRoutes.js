const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path if needed
const router = express.Router();
const transporter = require('../utils/mailer');

// REGISTER Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Respond with token and user info
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
  });
});

// GET USER BY ID Route (for dashboard to show user name)
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password - generate token and simulate sending reset link
// Forgot Password - generate token and send reset link via email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const resetLink = `${CLIENT_URL}/reset-password/${resetToken}`;


    console.log(`📧 Sending reset email to ${user.email} using ${process.env.EMAIL_USER}`);

    try {
      await transporter.sendMail({
        from: `"Crowdfunding Support" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Reset your password',
        html: `
          <p>Hi ${user.name || 'there'},</p>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link will expire in 15 minutes.</p>
        `
      });

      console.log('✅ Email sent successfully');
      res.status(200).json({ message: 'Password reset link sent to your email.' });

    } catch (emailErr) {
      console.error('❌ Failed to send email:', emailErr);
      res.status(500).json({ message: 'Email service failed. Try again later.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during password reset' });
  }
});

// Reset Password - use token to update the password
router.post('/reset-password/:token', async (req, res) => {
  console.log("✅ reset-password route HIT");
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});


module.exports = router;
