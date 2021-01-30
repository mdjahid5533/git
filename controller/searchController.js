const Post = require('../model/Post')

exports.searchResult = async (req, res, next) => {
    let term = req.query.term
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 3

    try {
        let post = await Post.find({
            $text: {
                $search: term
            }
        }).skip((currentPage * itemPerPage) - itemPerPage)
        .limit(itemPerPage)

        let totalPost = await Post.countDocuments({
            $text: {
                $search: term
            }
        })

        let totalPage = Math.ceil(totalPost / itemPerPage)

        res.render('explorer/searchResult', {
            title: `result for ${term}`,
            searchTerm: term,
            itemPerPage,
            currentPage,
            totalPage,
            post
        })

    } catch (e) {
        next(e)
    }
}