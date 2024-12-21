// Example: userController.js

// Register User
exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  // Logic to handle registration
  res.status(200).json({ message: 'User registered successfully!' });
};

// Login User
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Logic to handle login
  res.status(200).json({ message: 'User logged in successfully!' });
};
