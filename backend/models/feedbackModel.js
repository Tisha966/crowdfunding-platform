const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'feedback'); // Ensure 'feedback' is the collection name

module.exports = Feedback;
