const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,  // Save the image file path or URL
  daysLeft: Number,
  numSupporters: Number
});

const Campaign = mongoose.model('Campaign', campaignSchema);


module.exports = Campaign;


