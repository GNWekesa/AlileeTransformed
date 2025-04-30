// Import the Express framework
const express = require('express');

// Import the path module (to handle file paths)
const path = require('path');

// Initialize the Express application
const app = express();

// Middleware: Serve static files (CSS, JS, Images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
//added on day 2, to Serve static files from 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// Middleware: Serve Bootstrap static files from node_modules
// Allows me to use Bootstrap via "/bootstrap" URL path
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Route: Handle GET request for the homepage "/"
// Sends the 'index.html' file as the response
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server and listen on port 3000
// Console log a message once the server is running
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
