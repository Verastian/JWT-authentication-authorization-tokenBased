const models = require("../models")
const user = models.User
const role = models.Role
const getAllUsers = async () => {
    try {
        const users = await user.findAll({ include: role })
        return users
    } catch (error) {
        next(error)
    }
}
const findOneUser = async (attr) => {
    try {
        const userFound = await user.findOne({
            where: attr,
            include: role
        })
        return userFound
    } catch (error) {

    }
}
const findByIdUser = async (attr) => {
    try {
        console.log(attr)
        const userFound = await user.scope('withoutPassword').findByPk(
            attr
        )
        return userFound
    } catch (error) {

    }
}
const createUser = async (attr) => {
    try {
        const userFound = await user.create(attr);

        return userFound;
    } catch (error) {
        throw Error(error)
    }
};
const updateUser = () => { }
const deleteUser = () => { }


module.exports = { getAllUsers, findOneUser, createUser, findByIdUser }