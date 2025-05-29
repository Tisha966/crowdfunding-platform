const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  daysLeft: { type: Number, required: true },
  supporters: { type: Number, default: 0 },   // ✅ Track supporters
  amountRaised: { type: Number, default: 0 },  // ✅ Track raised amount
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Add this line
});

module.exports = mongoose.model('Campaign', campaignSchema);
