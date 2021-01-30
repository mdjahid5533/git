const router = require('express').Router()
const {
    allPost,
    getCreatePost,
    getEditPost,
    postCreatePost,
    postEditPost,
    postDelete
} = require('../controller/postController')
const {
    isAuthentic
} = require('../middleware/bindUserWithRequest')
const upload = require('../middleware/uoloadMiddleware')

router
    .get('/', isAuthentic, allPost)
    .get('/create', isAuthentic, getCreatePost)
    .get('/edit/:postId', isAuthentic, getEditPost)

router
    .post('/create', isAuthentic, upload.single('thumbnail'), postCreatePost)
    .post('/edit/:postId', isAuthentic, upload.single('thumbnail'), postEditPost)
    .post('/delete/:postId', postDelete)


module.exports = router