
const { userService, roleService } = require('../services')


const findUserByRoleMatching = async (id, matching) => {
    try {
        const userFound = await userService.findOneUser({ id })
        const roles = await userFound.getRoles()

        return roles.filter(role => matching.some(item => role.name === item));
    } catch (error) {
        console.log('console: ', error)
        next()
    }
}

module.exports = { findUserByRoleMatching }