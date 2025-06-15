const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const donationRoutes = require('./routes/donationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');  // Import dashboard routes
const cashfreeRoutes = require('./routes/cashfreeRoutes');



dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// ✅ CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/cashfree', cashfreeRoutes); // ✅ new


// ✅ Adding the new route for the personalized dashboard
app.use('/api/user', dashboardRoutes);  // Now this will handle requests like /api/user/dashboard

// ✅ Serve static images from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
