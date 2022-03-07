module.exports = (sequqlize, DataTypes) => {
  const Supplier = sequqlize.define(
    'Supplier',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, {
      foreignKey: {
        name: 'supplierId',
        allowNull: false,
      },
    });
  };

  return Supplier;
};
