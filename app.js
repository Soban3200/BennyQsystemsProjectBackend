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

// Connect to the database
connectDatabase();

// CORS configuration for specific frontend URL
app.use(cors({
  origin: 'https://benny-qsystems-project-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the dist directory if you want to serve the frontend
console.log('Serving static files from:', path.join(__dirname,'..','frontend', 'dist'));
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/v1', cctvProducts);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Catch-all route for non-existing endpoints
app.use((req, res) => {
  res.status(404).send('Not Found'); // Send a 404 status for non-existing routes
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
});
