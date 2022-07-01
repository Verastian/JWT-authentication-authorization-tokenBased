const { Sequelize } = require('sequelize')

const options = {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT
}

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    options
)

module.exports = sequelize;