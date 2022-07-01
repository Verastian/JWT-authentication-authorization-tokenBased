const { Op } = require('sequelize')
const models = require('../models')
const role = models.Role

const findAllRoles = async (attr) => {
    console.log('roles: ', attr)
    try {
        const roles = await role.findAll({
            where: {
                name: {
                    [Op.or]: attr
                }
            }
        })
        return roles

    } catch (error) {
        throw Error(error);
    }
}
const findOneRole = async (attr) => {
    try {
        const roleFound = role.findOne({
            where: attr
        })
        return roleFound
    } catch (error) {
        throw Error(error)
    }
}

module.exports = { findAllRoles, findOneRole }