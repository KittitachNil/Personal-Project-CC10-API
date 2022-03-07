const express = require('express');
const mainCategoryController = require('../controllers/mainCategoryController');
const { authenticateAdmin } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', mainCategoryController.getAllMainCategory);
router.get('/:id', mainCategoryController.getOneMainCategory);
router.get('/sub/:id', mainCategoryController.getSubCategory);
router.post('/', authenticateAdmin, mainCategoryController.createMainCategory);
router.patch(
    '/:id',
    authenticateAdmin,
    mainCategoryController.updateMainCategory
);
router.delete(
    '/:id',
    authenticateAdmin,
    mainCategoryController.deleteMainCategory
);

module.exports = router;
