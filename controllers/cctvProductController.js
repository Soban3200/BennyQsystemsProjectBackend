const  CctvProductModel= require('../models/cctvProductModel');



// GET CCTV Products API - URL - /api/v1/cctv-products
exports.getCctvProducts = async (req, res, next) => {
    const query = req.query.keyword?{ name : { 
        $regex: req.query.keyword,
        $options: 'i'
     }}:{}
    const products = await CctvProductModel.find(query);
    res.json({
        success: true,
        products
    })
};

// GET Single CCTV Product API - /api/v1/cctv-products/:id
exports.getSingleCctvProduct = async (req, res, next) => {
    try {
        const product = await CctvProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get cctv Product with that ID'
        })
    }
};
