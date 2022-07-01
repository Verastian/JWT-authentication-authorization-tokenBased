const models = require("../models");
const user = models.User;
const role = models.Role;

const getUserAuth = async (attr) => {
    try {
        console.log(attr);
        const userFound = await user.findOne({
            where: attr,
            include: role,
        });
        // userFound ? userFound : false;
        return userFound;

    } catch (error) {
        next(error)
    }
};



module.exports = { getUserAuth };