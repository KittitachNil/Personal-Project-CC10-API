const {
    User,
    Cart,
    Product,
    ProductImage,
    OrderItem,
    Order,
} = require('../models');

exports.getOrder = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const order = await Order.findAll({
            where: { userId: user.id, status: 'Wait payment' },
            order: [['createdAt', 'DESC']],
            limit: 1,
            include: {
                model: OrderItem,
                attributes: ['id', 'amount', 'price', 'discount'],
                include: {
                    model: Product,
                    attributes: ['modelName'],
                    include: {
                        model: ProductImage,
                        attributes: ['image'],
                    },
                },
            },
        });
        res.status(200).json(order[0]);
    } catch (err) {
        next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const cartItems = await Cart.findAll({
            where: {
                userId: req.user.id,
            },
            include: {
                model: Product,
            },
        });
        const order = await Order.create({
            userId: req.user.id,
            date: new Date(),
        });
        await cartItems.map((item) =>
            OrderItem.create({
                amount: item.amount,
                price: item.Product.price,
                discount: 0,
                productId: item.productId,
                orderId: order.id,
            })
        );

        const result = await Order.findOne(
            { where: { id: order.id } },
            { include: { model: OrderItem } }
        );
        await Cart.destroy({ where: { userId: user.id } });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id },
        });
        if (!order) {
            res.status(400).json({ message: 'This order does not exist.' });
        }

        await order.destroy();
        await OrderItem.destroy({ where: { orderId: id } });
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
