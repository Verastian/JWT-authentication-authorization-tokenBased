const DataTypes = require('sequelize')
const sequelize = require('../config/database')

const Role = sequelize.define(
    'roles',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,

        }
    },
    {
        timestamps: false, //* if true get date create and update
    }
)

module.exports = Role;