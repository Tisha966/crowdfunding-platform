const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path'); // Ensure path is imported
const authRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-app.com'],
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
