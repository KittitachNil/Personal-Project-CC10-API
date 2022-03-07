module.exports = (sequqlize, DataTypes) => {
    const Order = sequqlize.define(
        'Order',
        {
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    isDate: true,
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Wait payment',
                validate: {
                    isIn: [
                        [
                            'Wait payment',
                            'Packing',
                            'Already delivery',
                            'Cancelled',
                        ],
                    ],
                },
            },
        },
        {
            underscored: true,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
        });

        Order.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'orderId',
                allowNull: false,
            },
        });
    };

    return Order;
};
