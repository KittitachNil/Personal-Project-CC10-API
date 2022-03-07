module.exports = (sequqlize, DataTypes) => {
    const ProductImage = sequqlize.define(
        'ProductImage',
        {
            image: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    );

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
                allowNull: false,
            },
        });
    };

    return ProductImage;
};
