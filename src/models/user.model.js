const DataTypes = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false, //* if true get date create and update
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] },
            }
        }
    }
)

module.exports = User;
