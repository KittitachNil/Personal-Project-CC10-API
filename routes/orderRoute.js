const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/order/', authenticateUser, orderController.getOrder);
router.post('/order/', authenticateUser, orderController.createOrder);
router.delete('/order/:id', authenticateUser, orderController.deleteOrder);

module.exports = router;
