const express = require('express')
const { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } = require('../middlewares/auth')

const router = express.Router()


router.route('/all').get([verifyToken], (req, res) => {
    res.send('<h1>All Access</h1>')

})
router.route('/user').get([verifyToken], (req, res) => {
    res.send('<h1>Users Access</h1>')

})
router.route('/mod').get([verifyToken, isModerator], (req, res) => {
    res.send('<h1>Moderator Access</h1>')

})
router.route('/admin').get([verifyToken, isAdmin], (req, res) => {
    res.send('<h1>Admin Access</h1>')

})
router.route('/adminormod').get([verifyToken, isModeratorOrAdmin], (req, res) => {
    res.send('<h1>Admin or Moderator Access</h1>')

})

module.exports = router

