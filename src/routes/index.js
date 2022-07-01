const express = require('express')
const authRoute = require('./auth.routes')
const usersRoute = require('./user.routes')
const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/user',
        route: usersRoute
    },
]

for (const r of defaultRoutes) {
    router.use(r.path, r.route)
}

module.exports = router