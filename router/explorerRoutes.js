const router = require('express').Router()
const {
    getExplorer,
    singlePost
} = require('../controller/explorerController')


router
    .get('/:postId', singlePost)
    .get('/', getExplorer)



module.exports = router