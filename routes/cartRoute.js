const express = require('express');
const cartController = require('../controllers/cartController');
const { authenticateUser } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/cart/', authenticateUser, cartController.getCart);
router.post('/cart/:productId', authenticateUser, cartController.addCart);
router.put('/cart/:id', authenticateUser, cartController.updateCart);
router.delete('/cart/:id', authenticateUser, cartController.deleteCart);
router.delete('/carts/clear', authenticateUser, cartController.emptyCart);

module.exports = router;
