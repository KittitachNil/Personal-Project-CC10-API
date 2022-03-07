const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.register = async (req, res, next) => {
    try {
        const {
            username,
            password,
            confirmPassword,
            firstName,
            lastName,
            role,
            address,
            email,
            phoneNumber,
        } = req.body;

        const isUsername = await User.findOne({ where: { username } });
        if (isUsername) {
            return res
                .status(400)
                .json({ message: 'this username is already in use' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'password and confirm passwoed did not match',
            });
        }
        let isRole;
        if (role !== 'ADMIN' || role === null || role === '') {
            isRole = 'CUSTOMER';
        } else {
            isRole = role;
        }

        const isEmail = emailFormat.test(email);
        if (isEmail) {
            const existEmail = await User.findOne({
                where: { email: email },
            });

            if (existEmail) {
                return res
                    .status(400)
                    .json({ message: 'this email is already in use' });
            }
        }

        const existPhoneNumber = await User.findOne({
            where: { phoneNumber: phoneNumber },
        });

        if (existPhoneNumber) {
            return res
                .status(400)
                .json({ message: 'this phone number is already in use' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            firstName,
            lastName,
            role: isRole,
            address,
            email,
            phoneNumber,
            password: hashPassword,
        });
        res.status(201).json({ message: 'user created' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res
                .status(400)
                .json({ message: 'invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        const { id, firstName, lastName, email, phoneNumber, role, address } =
            user;

        res.status(200).json({
            token,
            user: {
                id,
                username,
                firstName,
                lastName,
                email,
                address,
                phoneNumber,
                role,
            },
        });
    } catch (err) {
        next(err);
    }
};
