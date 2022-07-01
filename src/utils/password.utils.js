const bcrypt = require('bcryptjs')

const encryptPassword = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(pass, salt)
    } catch (error) {
        // throw Error(error);
        console.log(error)
    }
}
const comparePassword = async (pass, recivedPass) => {
    try {
        console.log(pass, recivedPass);
        return await bcrypt.compare(pass, recivedPass);
    } catch (error) {
        throw Error(error);
    }
};

module.exports = { encryptPassword, comparePassword }