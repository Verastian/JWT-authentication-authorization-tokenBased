
const Role = require("./role.model");
const User = require("./user.model");
Role.belongsToMany(User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});
User.belongsToMany(Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
})
const ROLES = ['user', 'admin', 'moderator']

module.exports = { Role, User, ROLES }