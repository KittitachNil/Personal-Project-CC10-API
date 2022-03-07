'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    username: 'ADMIN_GUN',
                    password: bcrypt.hashSync('123456', 10),
                    first_name: 'Kittitach',
                    last_name: 'Nilsawad',
                    role: 'ADMIN',
                    address: '61/36 Royal Park Ville',
                    email: 'admin_gun@gmail.com',
                    phone_number: '0899123456',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'John',
                    password: bcrypt.hashSync('123456', 10),
                    first_name: 'John',
                    last_name: 'Doe',
                    role: 'CUSTOMER',
                    address: 'Bangkok',
                    email: 'john@gmail.com',
                    phone_number: '0831234567',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Joke',
                    password: bcrypt.hashSync('123456', 10),
                    first_name: 'Joke',
                    last_name: 'Kai',
                    role: 'CUSTOMER',
                    address: 'Bangkok',
                    email: 'joke@gmail.com',
                    phone_number: '0832345678',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Ann',
                    password: bcrypt.hashSync('123456', 10),
                    first_name: 'Ann',
                    last_name: 'Olive',
                    role: 'CUSTOMER',
                    address: 'Bangkok',
                    email: 'ann@gmail.com',
                    phone_number: '0810234875',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Emma',
                    password: bcrypt.hashSync('123456', 10),
                    first_name: 'Emma',
                    last_name: 'Kings',
                    role: 'CUSTOMER',
                    address: 'Chonburi',
                    email: 'emma@gmail.com',
                    phone_number: '0818889123',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
