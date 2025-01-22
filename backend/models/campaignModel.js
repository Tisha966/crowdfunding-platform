// campaignModel.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  daysLeft: { type: Number, required: true },
  numSupporters: { type: Number, required: true },
  imagePath: { type: String },
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;

