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

// Connect to MongoDB
connectDatabase();

// CORS Setup: Allow requests from your frontend URL
app.use(cors({
  origin: 'https://bennyqsystemsprojectfrontend.onrender.com', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // To parse incoming requests with JSON payloads

// Use routes
app.use('/api/v1', products); // PC product routes
app.use('/api/v1', orders); // Order routes
app.use('/api/v1', cctvProducts); // CCTV product routes

// Serve static files for frontend in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Backend is running');
//   });
// }

// Start the server on the specified port
const PORT = process.env.PORT || 8000; // Fallback to port 8000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
});
