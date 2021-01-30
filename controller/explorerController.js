const moment = require('moment')
const Post = require('../model/Post')
const Comment = require('../model/Comment')

function getDate(days) {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function genaretFilter(filter) {
    let filterObj = {}
    let order = 1

    switch (filter) {
        case 'week': {
            filterObj = {
                createdAt: {
                    $gt: getDate(7)
                }
            }
            order = -1
            break
        }
        case 'month': {
            filterObj = {
                createdAt: {
                    $gt: getDate(30)
                }
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }
    return {
        filterObj,
        order
    }
}

exports.getExplorer = async (req, res, next) => {
    let filter = req.query.filter || 'latest'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 5
    let {
        filterObj,
        order
    } = genaretFilter(filter.toLowerCase())


    try {
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((currentPage * itemPerPage) - itemPerPage)
            .limit(itemPerPage)

        let totalPost = await Post.countDocuments()
        let totalPage = Math.ceil(totalPost / itemPerPage)

        res.render('explorer/explorer', {
            title: 'Public Service',
            filter,
            posts,
            currentPage,
            itemPerPage,
            totalPage
        })
    } catch (e) {
        next(e)
    }
}

exports.singlePost = async (req, res, next) => {
    let {
        postId
    } = req.params

    try {
        const post = await Post.findById(postId).populate({
            path: 'comment',
            populate: {
                path: 'user',
                populate: {
                    path: 'profile',
                    select: 'profilePic'
                }
            }
        }).populate({
            path: 'comment',
            populate: {
                path: 'replies.user',
                select: 'username profilePic'
            }
        })

        if(!post) {
            let error = new Error('404 page not found')
            error.status = 404
            throw error
        }

        res.render('explorer/singlePage', {
            title: 'PS | single Post',
            post
        })

    } catch (e) {
        next(e)
    }

}