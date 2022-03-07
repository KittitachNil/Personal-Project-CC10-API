const express = require('express');
const userController = require('../controllers/userController');
const {
    authenticateUser,
    authenticateAdminOrUser,
} = require('../middlewares/authenticate');

const router = express.Router();

router.get('/me', authenticateAdminOrUser, userController.getMe);
router.patch('/edit', authenticateUser, userController.updateUser);

// router.post('/order', authenticateUser, userController.createOrder);
// router.get('/order', authenticateUser, userController.getOrders);
// router.delete('/order/:id', authenticateUser, userController.cancelOrder);

module.exports = router;
