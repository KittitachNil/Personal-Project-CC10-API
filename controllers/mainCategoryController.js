const {
    MainCategory,
    SubCategory,
    Product,
    ProductImage,
} = require('../models');

exports.getAllMainCategory = async (req, res, next) => {
    try {
        const mainCategories = await MainCategory.findAll({
            order: [['createdAt']],
        });
        res.status(200).json({ mainCategories });
    } catch (err) {
        next(err);
    }
};

exports.getOneMainCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mainCategory = await MainCategory.findOne({
            where: { id },
            include: [
                {
                    model: SubCategory,
                    attributes: {
                        exclude: ['categoryId', 'CategoryId'],
                    },
                    include: [
                        {
                            model: Product,
                            attributes: [
                                'modelName',
                                'desc',
                                'id',
                                'quantity',
                                'price',
                                'discount',
                            ],
                            include: [
                                { model: ProductImage, attributes: ['image'] },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!mainCategory) {
            return res
                .status(400)
                .json({ message: 'Main category not found.' });
        }
        res.status(200).json(mainCategory);
    } catch (error) {
        next(error);
    }
};
exports.getSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        te;
        const mainCategory = await MainCategory.findOne({ where: { id } });
        if (!mainCategory) {
            return res
                .status(400)
                .json({ message: 'Main category not found.' });
        }
        const subs = await SubCategory.findAll({
            where: { mainCategoryId: mainCategory.id },
        });

        res.status(200).json(subs);
    } catch (error) {
        next(error);
    }
};

exports.createMainCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const mainCategory = await MainCategory.findOne({ where: { name } });
        if (mainCategory) {
            return res
                .status(400)
                .json({ message: 'This main category already register.' });
        }
        mainCategory = await MainCategory.create({ name });
        res.status(201).json({ mainCategory });
    } catch (err) {
        next(err);
    }
};

exports.updateMainCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const mainCategory = await MainCategory.findOne({ where: { id } });
        if (!mainCategory) {
            return res.status(400).json({ message: 'Main category not found' });
        }

        const newMainCategory = await mainCategory.update({ name });
        res.status(200).json({ newMainCategory });
    } catch (err) {
        next(err);
    }
};

exports.deleteMainCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mainCategory = await MainCategory.findOne({ where: { id } });
        if (!mainCategory) {
            return res.status(400).json({ message: 'Main category not found' });
        }
        await mainCategory.destroy();
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
