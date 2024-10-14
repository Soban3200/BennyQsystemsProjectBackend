const express = require('express');
const {
    getCctvProducts,
    getSingleCctvProduct
} = require('../controllers/cctvProductController');

const router = express.Router();

router.route('/cctv-products').get(getCctvProducts);
router.route('/cctv-products/:id').get(getSingleCctvProduct);

module.exports = router;
