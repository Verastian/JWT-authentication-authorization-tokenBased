const jwt = require("jsonwebtoken");

const createToken = (id, expires) => {
    const token = jwt.sign({ _id: id }, process.env.SECRET, {
        expiresIn: expires,
    });
    return token;
};

const decode = async (token) => {

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        const id = _id.id;
        return id ? id : false;

    } catch (error) {
        throw Error(error)
    }
}



module.exports = { createToken, decode };
