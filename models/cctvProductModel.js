// models/cctvProductModel.js

const mongoose = require('mongoose');

const cctvProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            image: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model
const CctvProductModel = mongoose.model('CCTVProduct', cctvProductSchema);

// Export the model
module.exports = CctvProductModel;
