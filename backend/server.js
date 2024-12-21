// server.js (or your main backend file)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Example import for auth routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS Options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'], // Allow multiple origins
  methods: ['GET', 'POST'],
  credentials: true, // If you're using cookies or sessions
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Example of using routes
app.use('/api/auth', authRoutes); // Example: Authentication routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
