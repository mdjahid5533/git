const router = require('express').Router()
const {
    getLike,
    getDislkie
} = require('../controller/likeDislike')
const {
    postComment
} = require('../controller/comment')
const {
    isAuthentic
} = require('../../middleware/bindUserWithRequest')


router.get('/likes/:postId', isAuthentic, getLike)
router.get('/dislikes/:postId', isAuthentic, getDislkie)

router.post('/comments/:postId', isAuthentic, postComment)


module.exports = router