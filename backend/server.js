const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ Import Routes
const authRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const donationRoutes = require('./routes/donationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cashfreeRoutes = require('./routes/cashfreeRoutes');

// ✅ Middleware - CORS
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     process.env.CLIENT_URL || 'https://your-frontend-app.com',
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// };

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.REACT_APP_API_URL,
].filter(Boolean); // removes undefined/null

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Middleware - Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/cashfree', cashfreeRoutes);
app.use('/api/user', dashboardRoutes);

// ✅ Serve Static Files
const frontendPath = path.join(__dirname, '../build');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(frontendPath));

// ✅ Fallback to Frontend for non-API routes
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  }
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`[${new Date().toISOString()}] ✅ Connected to MongoDB`);
    // ✅ Start Server
    app.listen(PORT, () => {
      console.log(`[${new Date().toISOString()}] 🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`[${new Date().toISOString()}] ❌ MongoDB connection error:`, error.message);
    process.exit(1);
  });
