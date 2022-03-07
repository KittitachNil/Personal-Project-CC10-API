const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');
const { authenticateAdmin } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', subCategoryController.getAllSubCategory);
router.get('/:id', subCategoryController.getOneSubCategory);

router.post('/', authenticateAdmin, subCategoryController.createSubCategory);
router.put('/:id', authenticateAdmin, subCategoryController.updateSubCategory);
router.delete(
    '/:id',
    authenticateAdmin,
    subCategoryController.deleteSubCategory
);

module.exports = router;
