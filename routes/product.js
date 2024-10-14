const express = require('express');
const {
    getPcProducts,
    getSingleProduct
} = require('../controllers/productController');

const router = express.Router();

router.route('/pc-products').get(getPcProducts);
router.route('/pc-products/:id').get(getSingleProduct);

module.exports = router;
