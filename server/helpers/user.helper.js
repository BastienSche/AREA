const uuid = require('uuid').v4;
const { Op } = require("sequelize");
const { Sequelize } = require('../models/index')
const AreaError = require('../helpers/error.helper');
const userModel = require('../models').User;

module.exports = {
    get: async function(param) {
        return await userModel.findOne({
            where: { [Op.or]: [
                {
                    email: { [Op.eq]: param }
                },
                {
                    discordData: {
                        id: { [Op.eq]: param }
                    }
                },
                {
                    facebookData: {
                        id: {
                            [Op.eq]: param
                        }
                    }
                },
                Sequelize.where(Sequelize.cast(Sequelize.col('User.id'), 'varchar'), {
                    [Op.iLike]: param
                })
            ]},
            attributes: ['id', 'role', 'email', 'firstName', 'lastName', 'password', 'discordData', 'facebookData']
        });
    },

    getAll: async function() {
        return await userModel.findAll({
            attributes: ['id', 'role', 'email', 'firstName', 'lastName', 'discordData', 'facebookData']
        });
    },

    create: async function(firstName, lastName, email, password) {
        return await userModel.create({
            id: uuid(),
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            email: email,
            password: password,
            role: 'Member'
        });
    },

    update: async function(param, data) {
        var user = await this.get(param);
        if (!user)
            throw new AreaError('NOT_FOUND', `User ${param} not found.`);
        await user.update(data);
        await user.save();
        return user.dataValues;
    },

    remove: async function() {

    },

    setupAdmin: async function() {
        if (!(await this.get('admin@master'))) {
            await userModel.create({
                id: uuid(),
                firstName: 'Admin',
                lastName: '',
                email: 'admin@master',
                password: process.env.ADMIN_PSSW,
                role: 'Admin'
            });
            console.log('Default Admin Created !');
        }
    }
}