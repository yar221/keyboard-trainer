const Router = require('express')
const router = new Router()
const {body} = require('express-validator');
const authController = require('../controllers/authController')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    body('username').isLength({min: 3, max:16}),
    authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/new-image', authController.uploadImage)
router.get('/activate/:link', authController.activate)


module.exports = router