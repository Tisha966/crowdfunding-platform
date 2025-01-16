const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userRoutes'); // Example import for auth routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5001;

// CORS Options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'], // Allow multiple origins
  methods: ['GET', 'POST'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Use example routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
