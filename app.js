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
  origin: 'https://benny-qsystems-project-backend.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Serve static files from the frontend's dist directory

// API routes
app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/v1', cctvProducts);
app.use('/', (req, res) => {
  res.send('Backend is running');
});

// Serve index.html for any other route (ensure this is last)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
