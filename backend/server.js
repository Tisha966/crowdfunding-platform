const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userRoutes'); // Example import for auth routes
const campaignRoutes = require('./routes/campaignRoutes'); 


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

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});



const upload = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/campaigns/create', upload.single('image'), (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Log the form data
    console.log('Uploaded File:', req.file); // Log the uploaded file

    const { title, description, daysLeft, numSupporters } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ 
      message: 'Campaign created successfully!', 
      imagePath: image.path 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Use example routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

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
