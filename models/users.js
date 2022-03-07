module.exports = (sequqlize, DataTypes) => {
    const User = sequqlize.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [3, 12],
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 6,
                },
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'CUSTOMER',
                validate: {
                    isIn: [['ADMIN', 'CUSTOMER']],
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
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

    User.associate = (models) => {
        User.hasMany(models.WishList, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
        });

        User.hasOne(models.Cart, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
        });

        User.hasMany(models.Order, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
        });
    };

    return User;
};
