const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path'); // Ensure path is imported
const authRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const Donation = require('./models/donation'); // Ensure this is correct
const feedbackRoutes = require('./routes/feedbackRoutes'); // Move feedbackRoutes here

dotenv.config();

// Initialize app (This should come before app.use)
const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'],
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));  // Apply CORS
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded bodies

// Use feedbackRoutes here (After app is initialized)
app.use('/api/feedback', feedbackRoutes);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const Campaign = require('./models/campaignModel');
app.post('/api/campaigns/create', upload.single('image'), async (req, res) => {
  console.log('Received data:', req.body); // Debugging: Check the request data
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
      imagePath: req.file ? req.file.path : null,
    });

    await newCampaign.save();
    console.log('Campaign saved:', newCampaign); // Debugging: Check if the campaign was saved
    res.status(201).json({ message: 'Campaign created successfully!', data: newCampaign });
  } catch (err) {
    console.error('Error saving campaign:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/donate', async (req, res) => {
  console.log('Received request at /donate'); // Log request received
  console.log('Request Body:', req.body); // Log request data

  try {
    const { donorName, donationAmount } = req.body;

    if (!donorName || !donationAmount) {
      console.log('❌ Invalid request:', req.body);
      return res.status(400).json({ message: 'Invalid donation' });
    }

    console.log('Attempting to save donation...');

    const donation = new Donation({ name: donorName, amount: donationAmount });
    await donation.save();

    console.log('✅ Donation saved:', donation);
    res.status(200).json({ message: 'Donation successful', donation });
  } catch (error) {
    console.error('❌ Error saving donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/feedback/submit', (req, res) => {
  const { email, message } = req.body;

  // Example validation
  if (!email || !message) {
    return res.status(400).json({ message: 'Email and message are required' });
  }

  // Assuming you're saving feedback to MongoDB
  const feedback = new Feedback({ email, message });
  feedback.save()
    .then(() => {
      res.status(200).json({ message: 'Feedback submitted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error saving feedback', error: err });
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
