const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const sendOTP = asyncHandler(async (req, res) => {
  let user = null;
  if (req.params.type !== 'signup')
    user = await User.findOne({ email: req.params.email });
  if (!user && req.params.type !== 'signup') {
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
    subject: 'OTP for your TO-DO-LIST account',
    html: `<h3>Here is your OTP for your TO-DO-LIST account. <br/> <br/> <b>${otp}</b> <br/> <br/> Warning: Do not share it with anyone!</h3> `,
  };

  const info = await transporter.sendMail(mailOptions);
  if (info.accepted.length > 0) res.status(200).json(otp);
});

module.exports = { sendOTP };
