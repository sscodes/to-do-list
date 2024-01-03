const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const sendOTP = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    res.status(400);
    throw new Error('No user found with this email id.');
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: req.params.email,
    subject: 'OTP for password reset of TO-DO-LIST',
    text: `here is your OTP for password reset. Do not share it with anyone. ${otp}`,
  };

  const info = await transporter.sendMail(mailOptions);
  if (info.accepted.length > 0) res.status(200).json(otp);
};

module.exports = { sendOTP };
