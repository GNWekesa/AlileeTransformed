//since am using vercel, am moving my Express logic here
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files (Vercel will handle this differently)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(process.cwd()));
app.use('/node_modules', express.static(path.join(process.cwd(), 'node_modules')));
app.use(express.static(path.join(process.cwd(), 'views')));
app.use('/partials', express.static(path.join(process.cwd(), 'partials')));
app.use('/bootstrap', express.static(path.join(process.cwd(), 'node_modules/bootstrap/dist')));

// Helper
const servePage = (page) => path.join(process.cwd(), page);

// Routes
app.get('/', (req, res) => res.sendFile(servePage('index.html')));
app.get('/shop', (req, res) => res.sendFile(servePage('views/shop.html')));
app.get('/collections', (req, res) => res.sendFile(servePage('views/collections.html')));
app.get('/new-arrivals', (req, res) => res.sendFile(servePage('views/new-arrivals.html')));
app.get('/contactp', (req, res) => res.sendFile(servePage('views/contactp.html')));
app.get('/cart-checkout', (req, res) => res.sendFile(servePage('views/cart-checkout.html')));

// Policy pages
const policyPages = {
  '/return-refundpolicy': 'views/return-refundpolicy.html',
  '/shipping-policy': 'views/shipping-policy.html',
  '/privacy-policy': 'views/privacy-policy.html',
  '/termsnconditions': 'views/termsnconditions.html'
};

Object.entries(policyPages).forEach(([route, file]) => {
  app.get(route, (req, res) => res.sendFile(servePage(file)));
});

// Redirect
app.get('/index.html', (req, res) => res.redirect('/'));

// Contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER || 'nekesa254@gmail.com',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${name}`,
      text: `From: ${email}\n\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
