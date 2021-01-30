const router = require('express').Router()
const {
    authorProfile
} = require('../controller/authorController')

router.get('/:userId', authorProfile)

module.exports = router