
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to handle base64 images

// API routes are handled first
app.use('/api', apiRoutes);

// --- Serving Frontend Files ---
// Point to the root directory to serve index.html and other assets
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// The "catchall" handler for Single Page Applications (SPA):
// For any request that doesn't match an API route or a static file,
// send back the main index.html file. This allows React Router to handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log('Open your browser and navigate to this address to see the application.');
});
