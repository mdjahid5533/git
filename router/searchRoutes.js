const router = require('express').Router()
const {
    searchResult
} = require('../controller/searchController')

router.get('/', searchResult)

module.exports = router