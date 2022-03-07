module.exports = (sequqlize, DataTypes) => {
    const MainCategory = sequqlize.define(
        'MainCategory',
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

    MainCategory.associate = (models) => {
        MainCategory.hasMany(models.SubCategory, {
            foreignKey: {
                name: 'mainCategoryId',
                allowNull: false,
            },
        });
    };

    return MainCategory;
};
