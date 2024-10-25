const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,  // Use the new URL parser
        useUnifiedTopology: true, // Use the new topology engine
        poolSize: 10 // Set the connection pool size
    })
    .then((con) => {
        console.log('MongoDB connected to host: ' + con.connection.host);
    })
    .catch((error) => {
        console.error('MongoDB connection error: ', error);
        process.exit(1); // Exit the process if there's a connection error
    });
};

module.exports = connectDatabase;
