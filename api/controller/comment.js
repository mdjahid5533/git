const Post = require('../../model/Post')
const Comment = require('../../model/Comment')

exports.postComment = async (req, res, next) => {
    let {
        postId
    } = req.params
    let {
        body
    } = req.body

    if (!req.user) {
        return res.status(403).json({
            error: `You are not an Authenticated user..!`
        })
    }

    let comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try {
        let createComment = await comment.save()
        await Post.findOneAndUpdate({
            _id: postId
        }, {
            $push: {
                'comment': createComment._id
            }
        })

        let commentJson = await Comment.findById(createComment._id).populate({
            path: 'user',
            populate: {
                path: 'profile'
            }
        })
        console.log(commentJson);
        return res.status(201).json(commentJson)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Internal Problem..'
        })
    }
}