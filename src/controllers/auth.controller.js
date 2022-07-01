
const { authSevice, roleService, userService } = require("../services")
const { tokenUtils, passwordUtils } = require("../utils");
const { encryptPassword, comparePassword } = passwordUtils;
const { createToken } = tokenUtils

const signUp = async (req, res, next) => {
    try {
        let rolesFound = [];
        const { username, email, password, roles } = req.body
        const passwordHash = await encryptPassword(password)

        if (!rolesFound.length) {
            const role = await roleService.findOneRole({ name: 'user' })
            rolesFound = [role.id]
        }
        rolesFound = await roleService.findAllRoles(roles)
        if (!rolesFound) {
            return res.status(401).json({ success: false, message: 'Roles not found!' })
        }
        const user = await userService.createUser({ username, email, password: passwordHash })

        if (!user) {
            return res.status(500).json({ success: false, message: 'the user cannot be ceated!' })
        }
        user.setRoles(rolesFound)//se crea la relacion en la tabla user_roles entre cada id
        res.status(200).json({ success: true, data: user })
        // res.status(200).json({ success: true, message: 'Registered successfully!' })
        next()
    } catch (error) {
        // throw Error(error);
        console.log(error)
        next()
    }
}
const signIn = async (req, res) => {

    try {
        const { username, password } = req.body
        const userFound = await userService.findOneUser({ username })

        if (!userFound) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        const matchPassword = await comparePassword(password, userFound.password);

        if (!matchPassword) {
            return res.status(401).json({ succes: false, message: 'The password does not match' })
        }
        const expiresIn = 60 * 60 * 24;//expire in 24hrs
        const token = createToken({ id: userFound.id }, expiresIn)

        const rolesFound = await userFound.getRoles()

        userFound.roles = rolesFound.map(ele => `ROLE_${ele.name.toUpperCase()}`)
        console.log(userFound.roles)
        const data = {
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            roles: userFound.roles,
            accessToken: token
        }
        res.status(200).json({ success: true, data })

    } catch (error) {
        throw Error(error)
    }
}

module.exports = { signUp, signIn }