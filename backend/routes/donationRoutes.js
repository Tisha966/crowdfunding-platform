const express = require("express");
const Donation = require("../models/donation");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received donation request:", req.body);

  const { name, email, amount } = req.body; // Removed message from destructuring

  // Input validation (message is no longer required)
  if (!name || !email || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid donation data" });
  }

  try {
    const newDonation = new Donation({ name, email, amount }); // Removed message field
    await newDonation.save();

    console.log("Donation saved:", newDonation);
    res.status(201).json({ message: "Donation successful!", donation: newDonation });
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ error: "Server error while saving donation" });
  }
});

module.exports = router;
