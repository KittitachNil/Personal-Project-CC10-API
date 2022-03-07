const { User, Cart, Product, ProductImage } = require('../models');

exports.getCart = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const cart = await Cart.findAll({
            where: { userId: user.id },
            attibutes: ['id', 'amount', 'productId', 'userId'],
            include: {
                model: Product,
                attributes: [
                    'modelName',
                    'codeName',
                    'desc',
                    'price',
                    'quantity',
                    'discount',
                ],
                include: {
                    model: ProductImage,
                    attributes: ['image'],
                },
            },
        });
        res.status(200).json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.addCart = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { productId } = req.params;
        const cartItem = await Cart.findOne({
            where: { productId, userId: user.id },
        });
        if (!cartItem) {
            await Cart.create({
                userId: user.id,
                productId,
                amount: 1,
            });
        } else {
            await cartItem.update({
                amount: cartItem.amount + 1,
            });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { id } = req.params;
        const { amount } = req.body;
        console.log(amount);
        const cartItem = await Cart.findOne({
            where: { userId: user.id, id },
        });
        if (!cartItem) {
            return res
                .status(400)
                .json({ message: 'cartItem does not exist.' });
        }

        await cartItem.update({ amount });
        if (cartItem.amount < 1) {
            cartItem.destroy();
        }
        res.status(204).json(cartItem);
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { id } = req.params;
        const cartItem = await Cart.findOne({
            where: { id },
        });
        if (!cartItem) {
            res.status(400).json({ message: 'cartItem does not exist.' });
        }

        await cartItem.destroy();
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

exports.emptyCart = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        await Cart.destroy({ where: { userId: user.id } });
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
