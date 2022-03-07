module.exports = (sequqlize, DataTypes) => {
    const SubCategory = sequqlize.define(
        'SubCategory',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    SubCategory.associate = (models) => {
        SubCategory.hasMany(models.Product, {
            foreignKey: {
                name: 'subCategoryId',
                allowNull: false,
            },
        });

        SubCategory.belongsTo(models.MainCategory, {
            foreignKey: {
                name: 'mainCategoryId',
                allowNull: false,
            },
        });
    };

    return SubCategory;
};
