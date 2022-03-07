module.exports = (sequqlize, DataTypes) => {
  const OrderItem = sequqlize.define(
    'OrderItem',
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          isNumeric: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
    });
  };

  return OrderItem;
};
