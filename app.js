// THIS IS MY SERVER
// Import the Express framework. Express.js is a lightweight, 
// flexible web application framework for Node.js. It simplifies 
// the process of building web servers and APIs using JavaScript.
const express = require('express');
//add the line below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
const nodemailer = require('nodemailer');
// Import the path module (to handle file paths)
const path = require('path');
//add the line below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
const bodyParser = require('body-parser');
// Initialize the Express application
const app = express();
//add the line below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
const PORT = process.env.PORT || 3000;

// ======================
// Middleware Configuration
// ======================
// Middleware: Serve static files (CSS, JS, Images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
//added on day 2, to Serve static files from 'node_modules'
// Serve static files from root directory
app.use(express.static(path.join(__dirname)));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// Serve static files from the 'views' folder (add this line)
app.use(express.static(path.join(__dirname, 'views')));
// Serve static files from the 'partials' directory
app.use('/partials', express.static(path.join(__dirname, 'partials')));
// Middleware: Serve Bootstrap static files from node_modules
// Allows me to use Bootstrap via "/bootstrap" URL path
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


// ======================
// Route Handling
// ======================
// Main pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, 'views/shop.html')));
app.get('/collections', (req, res) => res.sendFile(path.join(__dirname, 'views/collections.html')));
app.get('/new-arrivals', (req, res) => res.sendFile(path.join(__dirname, 'views/new-arrivals.html')));
app.get('/contactp', (req, res) => res.sendFile(path.join(__dirname, 'views/contactp.html')));
app.get('/cart-checkout', (req, res) => res.sendFile(path.join(__dirname, 'views/cart-checkout.html')));
// Policy Pages Routes
app.get('/return-refundpolicy', (req, res) => {res.sendFile(path.join(__dirname, 'views/return-refundpolicy.html'));});
app.get('/shipping-policy', (req, res) => {res.sendFile(path.join(__dirname, 'views/shipping-policy.html'));});
app.get('/privacy-policy', (req, res) => {res.sendFile(path.join(__dirname, 'views/privacy-policy.html'));});
app.get('/termsnconditions', (req, res) => {res.sendFile(path.join(__dirname, 'views/termsnconditions.html'));});

// Redirect index.html to root
app.get('/index.html', (req, res) => res.redirect('/'));



// ======================
// Contact Form Handling
// ======================
// block below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
// POST route to handle contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure the transporter to use Gmail with STARTTLS (port 587)
    const transporter = require('nodemailer').createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: false, // false for STARTTLS
      auth: {
        user: 'nekesa254@gmail.com', // your Gmail address
        pass: '', // your Gmail app password (not regular password)
      },
    });

    const mailOptions = {
      from: email, // sender from form
      to: 'nekesa254@gmail.com', // your receiving email
      subject: `Contact Form Submission from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});
// ======================
// End of Contact Form Handling
// ======================

// Start the server and listen on port 3000 or environment port
// Start the server and listen on port 3000
// Console log a message once the server is running
//const PORT = 3000;//i commented this line since i declared
// this line const PORT = process.env.PORT || 3000; above
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



// block below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

