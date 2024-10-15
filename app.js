const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const products = require('./routes/product'); // PC product routes
const orders = require('./routes/order'); // Order routes
const cctvProducts = require('./routes/cctvProductRoutes'); // CCTV product routes
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use(cors({
  origin: 'https://bennyqsystemsprojectfrontend.onrender.com', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Use routes
app.use('/api/v1', products); // PC product routes
app.use('/api/v1', orders); // Order routes
app.use('/api/v1', cctvProducts); // CCTV product routes

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
