const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');  // Import the middleware

// GET /api/user/dashboard
router.get('/dashboard', async (req, res) => {
    try {
      const userId = req.query.userId; // 👈 or get from token if using auth middleware
  
      const donations = await Donation.find({ userId }); // 👈 Fetch only that user's donations
  
      res.status(200).json({ donations });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user dashboard data', error });
    }
  });
  
module.exports = router;
