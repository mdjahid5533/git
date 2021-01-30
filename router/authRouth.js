const router = require('express').Router()
const {
    getLogin,
    getSignup,
    getLogout,
    postLogin,
    postSignup,
    getChangePassword,
    postChangePassword
} = require('../controller/authController')
const {
    isAuthentic,
    unAuthentic
} = require('../middleware/bindUserWithRequest')

router
    .get('/login', unAuthentic, getLogin)
    .get('/signup', unAuthentic, getSignup)
    .get('/change-password', isAuthentic, getChangePassword)
    .get('/logout', getLogout)

router.post('/login', unAuthentic, postLogin)
    .post('/signup', unAuthentic, postSignup)
    .post('/change-password', isAuthentic, postChangePassword)


module.exports = router