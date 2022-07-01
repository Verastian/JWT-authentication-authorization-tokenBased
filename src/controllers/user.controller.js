const { userService } = require('../services')

const getUsers = async (req, res) => {

    try {
        const users = await userService.getAllUsers()
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userService.findOneUser({ id })
        if (!user) {
            return res.status(401).json({ success: false, message: 'user not Found!' })
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

module.exports = { getUsers, getUser }