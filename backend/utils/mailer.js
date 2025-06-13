// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your Gmail address
    pass: process.env.EMAIL_PASS,       // your 16-char app password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transport error:', error);
  } else {
    console.log('✅ Server is ready to send emails');
  }
});

module.exports = transporter;
