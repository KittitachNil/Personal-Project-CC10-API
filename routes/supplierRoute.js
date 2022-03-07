const express = require('express');
const supplierController = require('../controllers/supplierController');
const { authenticateAdmin } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticateAdmin, supplierController.getSupplier);
router.post('/', authenticateAdmin, supplierController.createSupplier);
router.patch('/:id', authenticateAdmin, supplierController.updateSupplier);
router.delete('/:id', authenticateAdmin, supplierController.deleteSupplier);

module.exports = router;
