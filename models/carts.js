module.exports = (sequqlize, DataTypes) => {
  const Cart = sequqlize.define(
    'Cart',
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isNumeric: true,
          isInt: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });

    Cart.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return Cart;
};
