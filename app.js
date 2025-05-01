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

// Middleware: Serve static files (CSS, JS, Images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
//added on day 2, to Serve static files from 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// Middleware: Serve Bootstrap static files from node_modules
// Allows me to use Bootstrap via "/bootstrap" URL path
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// block below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route: Handle GET request for the homepage "/"
// Sends the 'index.html' file as the response
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
        pass: 'lacl txzw lrun spyb', // your Gmail app password (not regular password)
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

// Start the server and listen on port 3000 or environment port
// Start the server and listen on port 3000
// Console log a message once the server is running
//const PORT = 3000;//i commented this line since i declared
// this line const PORT = process.env.PORT || 3000; above
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

