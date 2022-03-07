const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authenticate');
const router = express.Router();

//orders endpoints
router.get('/order', authenticateAdmin, adminController.getOrders);
router.put('/order/:id', authenticateAdmin, adminController.updateOrder);

module.exports = router;
