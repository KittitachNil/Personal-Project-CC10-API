module.exports = (sequqlize, DataTypes) => {
    const Product = sequqlize.define(
        'Product',
        {
            modelName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            codeName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            desc: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: true,
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    isInt: true,
                },
            },
            discount: {
                type: DataTypes.DECIMAL(5, 2),
                defaultValue: 0.0,
                validate: {
                    isDecimal: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Product.associate = (models) => {
        Product.hasMany(models.ProductImage, {
            foreignKey: {
                name: 'productId',
                allowNull: false,
            },
        });

        Product.hasMany(models.Cart, {
            foreignKey: {
                name: 'productId',
                allowNull: false,
            },
        });

        Product.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'productId',
                allowNull: false,
            },
        });

        Product.hasMany(models.WishList, {
            foreignKey: {
                name: 'productId',
                allowNull: false,
            },
        });

        Product.belongsTo(models.Supplier, {
            foreignKey: {
                name: 'supplierId',
                allowNull: false,
            },
        });

        Product.belongsTo(models.SubCategory, {
            foreignKey: {
                name: 'subCategoryId',
                allowNull: false,
            },
        });
    };

    return Product;
};
