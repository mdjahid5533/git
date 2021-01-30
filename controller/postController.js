const Profile = require('../model/Profile')
const Post = require('../model/Post')

exports.allPost = async (req, res, next) => {
    try {
        let post = await Post.find({
            author: req.user._id
        })

        res.render('post/allpost', {
            title: 'PS | all posts',
            post
        })

    } catch (e) {
        next(e)
    }
}

exports.getCreatePost = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (profile) {
            return res.render('post/create-post', {
                title: 'PS | create-post'
            })
        }

        res.redirect('/dashboard/create-profile')

    } catch (e) {
        next(e)
    }

}

exports.postCreatePost = async (req, res, next) => {
    let {
        title,
        body,
        tags
    } = req.body

    try {
        let post = new Post({
            title,
            body,
            author: req.user._id,
            tags,
            thumbnail: '',
            likes: [],
            dislikes: [],
            comment: []
        })

        if (req.file) {
            post.thumbnail = `/uploads/${req.file.filename}`
        }

        let createPost = await post.save()
        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $push: {
                'post': createPost._id
            }
        })

        res.redirect('/dashboard')

    } catch (e) {
        next(e)
    }

}

exports.getEditPost = async (req, res, next) => {
    let postId = req.params.postId

    try {
        let post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })

        if (post) {
            return res.render('post/edit-post', {
                title: 'PS | edit-post',
                post
            })
        }
        next(new Error('Something went wrong'))

    } catch (e) {
        next(e)
    }

}

exports.postEditPost = async (req, res, next) => {
    let {
        postId
    } = req.params
    let {
        title,
        body,
        tags
    } = req.body


    try {
        let post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })

        let thumbnail = post.thumbnail
        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`
        }

        if (post) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $set: {
                    title,
                    body,
                    tags,
                    thumbnail
                }
            })
        }

        res.redirect('/posts')

    } catch (e) {
        next(e)
    }
}

exports.postDelete = async (req, res, next) => {
    let {
        postId
    } = req.params

    try{
        let post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })

        if(!post) {
            return next(new Error('Somethinf went wrong.'))
        }

        await Post.findOneAndDelete({
            _id: postId
        })
        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $pull: {
                'post': post._id
            }
        })

        res.redirect('/posts')
    } catch(e) {
        next(e)
    }

}