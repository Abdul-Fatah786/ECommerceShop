const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const { productValidation } = require('../middlewares/product.middleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;