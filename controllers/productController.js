const { Op } = require('sequelize');
const {
    MainCategory,
    SubCategory,
    Product,
    Supplier,
    Cart,
    ProductImage,
    User,
} = require('../models');

exports.getProductNumber = async (req, res, next) => {
    try {
        const total = await Product.count();
        res.status(200).json({ total });
    } catch (error) {
        next(error);
    }
};

exports.getSomeProduct = async (req, res, next) => {
    try {
        const { count } = req.params;
        let products = await Product.findAll({
            limit: Number(count),
            attributes: [
                'id',
                'modelName',
                'codeName',
                'price',
                'quantity',
                'desc',
                'discount',
                'createdAt',
                'updatedAt',
            ],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: SubCategory,
                    attributes: ['id', 'name', 'mainCategoryId'],
                    include: [
                        { model: MainCategory, attributes: ['id', 'name'] },
                    ],
                },
                {
                    model: ProductImage,
                    attributes: ['image'],
                },
            ],
        });

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

exports.getAllProduct = async (req, res, next) => {
    try {
        const { order, ascOrDesc, page } = req.body;
        const currentPage = page || 1;
        const perPage = 3;
        const offset = (currentPage - 1) * perPage;
        let products = await Product.findAll({
            limit: Number(perPage),
            offset: Number(offset),
            attributes: [
                'id',
                'modelName',
                'codeName',
                'price',
                'quantity',
                'desc',
                'discount',
                'createdAt',
                'updatedAt',
            ],
            order: [[order, ascOrDesc]],
            include: [
                {
                    model: SubCategory,
                    attributes: ['id', 'name', 'mainCategoryId'],
                    include: [
                        { model: MainCategory, attributes: ['id', 'name'] },
                    ],
                },
                {
                    model: ProductImage,
                    attributes: ['image'],
                },
            ],
        });

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            attributes: [
                'id',
                'modelName',
                'codeName',
                'price',
                'quantity',
                'desc',
                'discount',
                'createdAt',
                'updatedAt',
            ],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: SubCategory,
                    attributes: ['id', 'name', 'mainCategoryId'],
                    include: [
                        { model: MainCategory, attributes: ['id', 'name'] },
                    ],
                },
                {
                    model: ProductImage,
                    attributes: ['image'],
                },
            ],
        });
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const {
            modelName,
            codeName,
            desc,
            price,
            quantity,
            discount,
            supplierId,
            subCategoryId,
            images,
            supplierName,
        } = req.body;

        if (
            !(
                modelName &&
                subCategoryId &&
                price &&
                quantity &&
                desc &&
                supplierId &&
                images &&
                supplierName
            )
        ) {
            return res
                .status(400)
                .json({ message: 'Please complete the form' });
        }

        const supplier = await Supplier.findOne({ where: { id: supplierId } });
        let subCategory = await SubCategory.findOne({
            where: { id: subCategoryId },
        });

        if (!supplier) {
            return res.status(400).json({ message: 'supplier not found.' });
        }
        if (!subCategory) {
            return res.status(400).json({ message: 'sub category not found.' });
        }

        let product = await Product.findOne({ where: { modelName } });
        if (product) {
            return res
                .status(400)
                .json({ message: 'Product with model name already exists.' });
        }

        product = await Product.create({
            modelName,
            codeName,
            desc,
            price,
            quantity,
            discount,
            supplierId,
            subCategoryId,
        });

        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                await ProductImage.create({
                    productId: product.id,
                    image: images[i].image,
                });
            }
            const uploadedImages = await ProductImage.findAll({
                where: { productId: product.id },
            });
            product = { ...product, images: uploadedImages };
        }
        res.status(201).json({ product, message: 'Product created.' });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            modelName,
            codeName,
            desc,
            price,
            quantity,
            discount,
            supplierId,
            subCategoryId,
            images,
        } = req.body;
        let product = await Product.findOne({
            where: { id },
        });
        if (!product) {
            res.status(400).json({ message: 'this product does not exist' });
        }
        product.update({
            modelName,
            codeName,
            desc,
            price,
            quantity,
            discount,
            supplierId,
            subCategoryId,
            images,
        });
        await ProductImage.destroy({ where: { productId: product.id } });
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                await ProductImage.create({
                    productId: product.id,
                    image: images[i].image,
                });
            }
            const uploadedImages = await ProductImage.findAll({
                where: { productId: product.id },
            });

            product = { ...product, images: uploadedImages };
        }
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(400).json({ message: 'This product not found' });
        }
        await ProductImage.destroy({ where: { productId: product.id } });
        await Cart.destroy({ where: { productId: product.id } });
        await product.destroy();
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

exports.getProductsByFilter = async (req, res, next) => {
    try {
        const {
            text,
            subCategoryId,
            supplierName,
            min = 0,
            max = 99999,
        } = req.body;
        console.log(req.body);

        // const sub = await SubCategory.findAll({
        //     where: {
        //         mainCategoryId,
        //     },
        // });

        const filtered = await Product.findAll({
            where: {
                price: { [Op.gte]: min, [Op.lte]: max },
                subCategoryId,
            },
            include: [
                // {
                //     model: MainCategory,
                //     where: { name: supplierName },
                //     attributes: ['name'],
                // },
                {
                    model: ProductImage,
                    attributes: ['image'],
                },
            ],
        });

        res.status(200).json(filtered);
    } catch (error) {
        next(error);
    }
};
