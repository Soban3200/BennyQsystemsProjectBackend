const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,  // Use the new URL parser
        useUnifiedTopology: true, // Use the new topology engine
        // No need to specify poolSize here; instead, set it on the mongoose global
    })
    .then((con) => {
        console.log('MongoDB connected to host: ' + con.connection.host);
    })
    .catch((error) => {
        console.error('MongoDB connection error: ', error);
        process.exit(1); // Exit the process if there's a connection error
    });
};

// Set the connection pool size globally for Mongoose
mongoose.set('poolSize', 10);

module.exports = connectDatabase;
