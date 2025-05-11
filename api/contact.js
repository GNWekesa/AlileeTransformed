// api/contact.js

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact From ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
}
