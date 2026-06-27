const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 */
async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"ReNorth Restaurant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

module.exports = sendEmail;