const express = require('express')
const { authController } = require('../controllers')
const router = express.Router()


router.route('/signup').post(authController.signUp)
router.route('/signin').post(authController.signIn)

module.exports = router