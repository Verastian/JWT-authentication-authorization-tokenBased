const { authUtils, tokenUtils } = require('../utils')
const { decode } = tokenUtils;
const { findUserByRoleMatching } = authUtils;


const verifyToken = async (req, res, next) => {
    try {
        // obtenemos desde el header el token
        const token = req.headers['x-access-token'];
        // verificamos si NO existe el token en el header, de ser así enviamos un mensaje
        if (!token) {
            return res.status(403)//Forbidden
                .json({ success: false, message: 'No token Provided!' })
        }
        // decodificamos el token para obtener del contenido el usuario por medio de su ID
        const decodedToken = await decode(token)
        // console.log('console', decodedToken)
        req.userId = decodedToken
        next();

    } catch (error) {
        next()
        throw Error(error)
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const id = req.userId
        const matching = ['admin']
        rolesMatching = await findUserByRoleMatching(id, matching)
        console.log('roles matching: ', rolesMatching)
        if (!rolesMatching.length) {
            return res.status(403).send({ success: false, message: "Require Admin Role!" });
        }
        next()
    } catch (error) {
        console.log('console: ', error)
        next()
    }
}

const isModerator = async (req, res, next) => {
    try {
        const id = req.userId
        const matching = ['moderator']
        rolesMatching = await findUserByRoleMatching(id, matching)
        console.log('roles matching: ', rolesMatching)
        if (!rolesMatching.length) {
            return res.status(403).send({ success: false, message: "Require moderator Role!" });
        }
        next()
    } catch (error) {
        console.log('console: ', error)
        next()
    }
}
const isModeratorOrAdmin = async (req, res, next) => {
    try {
        const id = req.userId
        const matching = ['moderator', 'admin']
        rolesMatching = await findUserByRoleMatching(id, matching)
        if (!rolesMatching.length) {
            return res.status(403).send({ success: false, message: "Require moderator Role!" });
        }
        next()
    } catch (error) {
        console.log('console: ', error)
        next()
    }
}





module.exports = { verifyToken, isAdmin, isModerator, isModeratorOrAdmin }