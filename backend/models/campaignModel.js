const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },  // Store image URL or file path
  daysLeft: { type: Number, required: true },
  votingLimit: { type: Number, required: true },
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;
