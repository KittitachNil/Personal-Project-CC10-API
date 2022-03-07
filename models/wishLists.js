module.exports = (sequqlize, DataTypes) => {
  const WishList = sequqlize.define('WishList');

  WishList.associate = (models) => {
    WishList.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });

    WishList.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return WishList;
};
