const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel"); // Ensure Feedback model is imported

router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    res.status(201).json({ success: true, message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error during saving feedback:", error); // Log the error details
    res.status(500).json({ success: false, message: "Error saving feedback", error: error.message });
  }
});


module.exports = router;
