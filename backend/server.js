const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

const authRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const Campaign = require('./models/campaignModel');
const Donation = require('./models/donation'); 
const donationRoutes = require('./routes/donationRoutes');
const Feedback = require('./models/feedbackModel'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'],
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/donations', donationRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Campaign Creation Route
app.post('/api/campaigns/create', upload.single('image'), async (req, res) => {
  console.log('Received data:', req.body);
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, daysLeft, numSupporters } = req.body;

    const newCampaign = new Campaign({
      title,
      description,
      daysLeft,
      numSupporters,
      imagePath: req.file.path.replace(/\\/g, "/"), // Ensuring cross-platform compatibility
    });

    await newCampaign.save();
    console.log('Campaign saved:', newCampaign);
    res.status(201).json({ message: 'Campaign created successfully!', data: newCampaign });
  } catch (err) {
    console.error('Error saving campaign:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.post('/api/feedback/submit', async (req, res) => {
  console.log("Received feedback:", req.body); // Debugging step

  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ message: 'Email and message are required' });
  }

  try {
    const feedback = new Feedback({ email, message });
    await feedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Error saving feedback', error: err });
  }
});
app.post('/api/donations', async (req, res) => {
  console.log('Received donation data:', req.body); // Debugging

  const { name, email, amount } = req.body; // Removed message field

  if (!name || !email || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const donation = new Donation({ name, email, amount }); // No message field
    await donation.save();
    res.status(201).json({ message: 'Donation successfully saved!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save donation' });
  }
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/feedback', feedbackRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
