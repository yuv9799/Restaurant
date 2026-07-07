const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) return null;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  return transporter;
}

async function sendEmail({ to, subject, html }) {
  const t = getTransporter();
  if (!t) {
    console.log('Email not configured. Skipping email to:', to);
    return false;
  }
  try {
    await t.sendMail({
      from: `"ReNorth Restaurant" <${process.env.EMAIL_USER}>`,
      to, subject, html
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error.message);
    return false;
  }
}

module.exports = sendEmail;
