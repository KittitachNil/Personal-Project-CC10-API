const { Op } = require('sequelize');
const { User, Order, OrderItem, Cart, Product } = require('../models');

exports.getMe = async (req, res, next) => {
    try {
        const {
            id,
            firstName,
            lastName,
            address,
            email,
            phoneNumber,
            username,
            role,
        } = req.user;
        res.status(200).json({
            user: {
                id,
                firstName,
                lastName,
                address,
                email,
                phoneNumber,
                username,
                role,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { firstName, lastName, address, email, phoneNumber } = req.body;

        await user.update({ firstName, lastName, address, email, phoneNumber });

        // const updatedUser = await User.findOne({
        //     where: { id },
        //     attributes: { exclude: ['createdAt', 'updatedAt'] },
        // });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

// exports.createOrder = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ where: { id: req.user.id } });
//         if (!user) {
//             return res
//                 .status(400)
//                 .json({ message: 'This user does not exist' });
//         }
//         const { address } = req.body;

//         let items = await Cart.findAll({
//             where: { userId: user.id },

//             include: {
//                 model: Product,

//                 attributes: ['modelName', 'price', 'id'],
//             },
//             raw: true,
//             nest: true,
//         });

//         if (!items) {
//             return (
//                 res.status(400),
//                 json({ message: 'Your Cart is empty, cannot create order.' })
//             );
//         }

//         const order = await Order.create({
//             userId: user.id,
//             address: user.address ? user.address : address,
//         });

//         await Cart.destroy({ where: { userId: user.id } });

//         for (let x = 0; x < items.length; x++) {
//             await OrderItem.create({
//                 orderId: order.id,
//                 amount: items[x].amount,
//                 price: items[x].Product.price,
//                 discount: items[x].Product.discount,
//                 productId: items[x].Product.id,
//             });
//         }
//         res.status(200).json({ message: 'Order has been created.' });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.getOrders = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ where: { id: req.user.id } });
//         if (!user) {
//             return res
//                 .status(400)
//                 .json({ message: 'This user does not exist' });
//         }
//         const orders = await Order.findAll({
//             where: { userId: user.id },
//             include: { model: OrderItem },
//             order: [['createdAt', 'DESC']],
//         });
//         res.status(200).json(orders);
//     } catch (error) {
//         next(error);
//     }
// };

// exports.cancelOrder = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findOne({ where: { id } });
//         const user = await User.findOne({ where: { id: req.user.id } });
//         if (!user) {
//             return res
//                 .status(400)
//                 .json({ message: 'This user does not exist' });
//         }
//         if (order.userId !== user.id) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }
//         await order.update({ status: 'Cancelled' });
//         res.status(204).json();
//     } catch (error) {
//         next(error);
//     }
// };
