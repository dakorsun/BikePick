import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import appConfig from '../../config/appConfig';
import roles from '../helpers/RolesEnum';

/**
 * @typedef {Object} Settings
 * @property {String} currency
 * @property {String} oddsFormat
 * @property {String} timezone
 */

/**
 * @typedef {Object} User
 * @property {String} email
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} name
 * @property {Date} birthDate
 * @property {String} gender
 * @property {String} country
 * @property {String} address
 * @property {String} postCode
 * @property {String} city
 * @property {String} phoneCode
 * @property {String} phoneNumber
 * @property {String} personalNumber
 * @property {String} password - hash of a password
 * @property {Boolean} confirmed
 * @property {String} confirmationToken
 * @property {Object} settings
 */

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid(),
        },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: {
                notNull: { msg: 'The email is required' },
                isEmail: { msg: 'Must be a valid email' },
            },
        },
        firstName: { type: DataTypes.STRING, allowNull: true },
        firstName1: { type: DataTypes.STRING, allowNull: true },
        firstName2: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        birthDate: {
            type: DataTypes.DATE,
            validate: { notNull: { msg: 'The birth date is required' } },
            allowNull: false,
        },
        gender: { type: DataTypes.STRING, allowNull: true },
        country: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        postCode: { type: DataTypes.STRING, allowNull: true },
        city: { type: DataTypes.STRING, allowNull: true },
        phoneCode: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        confirmed: { type: DataTypes.BOOLEAN, defaultValue: true },
        confirmationToken: { type: DataTypes.STRING, defaultValue: '' },
        settings: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: roles.ROLE_USER,
            validate: {
                notNull: { msg: 'The role is required' },
                isIn: [Object.keys(roles)],
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'users',
    });

    User.prototype.isValidPassword = function isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.prototype.setPassword = function setPassword(password) {
        if (password) {
            this.password = bcrypt.hashSync(password, 10);
        }
    };

    User.prototype.setConfirmationToken = function setConfirmationToken() {
        this.confirmationToken = this.generateJWT();
    };

    User.prototype.generateConfirmationUrl = function generateConfirmationUrl() {
        return `${appConfig.HOST}/api/auth/confirmation/${this.confirmationToken}`;
    };

    User.prototype.generateResetPasswordLink = function generateResetPasswordLink() {
        return `${appConfig.HOST}/reset_password/${this.generateResetPasswordToken()}`;
    };

    User.prototype.generateResetPasswordToken = function generateResetPasswordToken() {
        return jwt.sign(
            {
                id: this.id,
            },
            appConfig.JWT_SECRET,
            { expiresIn: '1h' },
        );
    };

    User.prototype.generateJWT = function generateJWT() {
        return jwt.sign(
            {
                id: this.id.toString(),
                email: this.email,
                confirmed: this.confirmed,
                role: this.role,
            },
            appConfig.JWT_SECRET,
        );
    };

    User.prototype.toAuthJSON = function toAuthJSON() {
        return {
            id: this.id.toString(),
            email: this.email,
            confirmed: this.confirmed,
            token: this.generateJWT(),
            role: this.role,
        };
    };

    User.prototype.toFullJSON = function toAuthJSON() {
        return {
            id: this.id.toString(),
            email: this.email,
            token: this.generateJWT(),
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            birthDate: this.birthDate,
            address: this.address,
            postCode: this.postCode,
            city: this.city,
            phoneCode: this.phoneCode,
            phoneNumber: this.phoneNumber,
            personalNumber: this.personalNumber,
            confirmed: this.confirmed,
            country: this.country,
            settings: this.settings,
            role: this.role,
        };
    };
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
