const router = require('express').Router()

const {isAuthentic} = require('../middleware/bindUserWithRequest')
const upload = require('../middleware/uoloadMiddleware')
const {uploadProfilePic} = require('../controller/uploadController')


router.post('/proilePic', isAuthentic, upload.single('proilePic'), uploadProfilePic)

module.exports = router