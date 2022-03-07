const express = require('express');
const {
    authenticateAdmin,
    authenticateUser,
} = require('../middlewares/authenticate');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products/:count', productController.getSomeProduct);
router.get('/product/total', productController.getProductNumber);
router.get('/product/:id', productController.getProductById);

router.post('/products', productController.getAllProduct);
router.post('/products/filter', productController.getProductsByFilter);

router.post('/product', authenticateAdmin, productController.createProduct);
router.put(
    '/product/update/:id',
    authenticateAdmin,
    productController.updateProduct
);
router.delete(
    '/product/delete/:id',
    authenticateAdmin,
    productController.deleteProduct
);

module.exports = router;
