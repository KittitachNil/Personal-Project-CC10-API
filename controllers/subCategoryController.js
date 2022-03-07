const { SubCategory, MainCategory } = require('../models');

exports.getAllSubCategory = async (req, res, next) => {
    try {
        const subCategories = await SubCategory.findAll({
            order: [['createdAt']],
        });
        res.status(200).json(subCategories);
    } catch (error) {
        next(error);
    }
};
exports.getOneSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findOne({ where: { id } });
        if (!subCategory) {
            return res.status(400).json({ message: 'Sub-category not found.' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        next(error);
    }
};
exports.createSubCategory = async (req, res, next) => {
    try {
        const { name, mainCategoryId } = req.body;
        if (!mainCategoryId) {
            return res
                .status(400)
                .json({ message: 'Please select a category.' });
        }
        let mainCategory = await MainCategory.findOne({
            where: { id: mainCategoryId },
        });
        if (!mainCategory) {
            return res.status(400).json({
                message: 'Main category with this id does not exist.',
            });
        }
        let subCategory = await SubCategory.findOne({ where: { name } });
        if (subCategory) {
            return res.status(400).json({
                message: 'Sub category with this name already exists.',
            });
        }
        subCategory = await SubCategory.create({
            name,
            mainCategoryId,
        });
        res.status(201).json(subCategory);
    } catch (error) {
        next(error);
    }
};
exports.updateSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, mainCategoryId } = req.body;
        if (!mainCategoryId) {
            return res
                .status(400)
                .json({ message: 'Please select a category.' });
        }
        let mainCategory = await MainCategory.findOne({
            where: { id: mainCategoryId },
        });
        if (!mainCategory) {
            return res.status(400).json({
                message: 'Main category with this id does not exist.',
            });
        }
        const subCategory = await SubCategory.findOne({ where: { id } });
        if (!subCategory) {
            return res.status(400).json({ message: 'Sub category not found.' });
        }
        newCategory = await subCategory.update({
            name,
            mainCategoryId,
        });
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
};
exports.deleteSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findOne({ where: { id } });
        if (!subCategory) {
            return res.status(400).json({ message: 'Sub category not found.' });
        }
        await subCategory.destroy();
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
