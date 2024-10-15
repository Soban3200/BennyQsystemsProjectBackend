const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const products = require('./routes/product'); 
const orders = require('./routes/order'); 
const cctvProducts = require('./routes/cctvProductRoutes'); 
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

connectDatabase();

// CORS configuration for specific frontend URL
app.use(cors({
  origin: 'https://bennyqsystemsprojectfrontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Serve static files from the frontend's dist directory
const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

// API routes
app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/v1', cctvProducts);

// Serve index.html for any other route (ensure this is last)
app.get('*', (req, res) => {
  const filePath = path.join(staticPath, 'index.html'); // Use staticPath here
  console.log('Serving file from path:', filePath);
  res.sendFile(filePath);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
