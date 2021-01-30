const router = require('express').Router()
const {
    getDashboard,
    getCreateprofile,
    getEditProfile,
    postCreateProfile,
    postEditProfile
} = require('../controller/dashboardController')
const {
    isAuthentic
} = require('../middleware/bindUserWithRequest')

const upload = require('../middleware/uoloadMiddleware')


router
    .get('/', isAuthentic, getDashboard)
    .get('/create-profile', isAuthentic, getCreateprofile)
    .get('/edit-profile', isAuthentic, getEditProfile)

router
    .post('/create-profile', isAuthentic, upload.single('profilePic'), postCreateProfile)
    .post('/edit-profile', isAuthentic, upload.single('profilePic'), postEditProfile)

module.exports = router