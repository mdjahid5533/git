const Post = require('../../model/Post')

exports.getLike = async (req, res, next) => {
    let postId = req.params.postId
    let userId = req.user._id
    let liked = null

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not authenticated user.!'
        })
    }

    try {
        let post = await Post.findById(postId)

        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislikes': userId
                }
            })
        }

        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'likes': userId
                }
            })
            liked = false
        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'likes': userId
                }
            })
            liked = true
        }

        const updatePost = await Post.findById(postId)
        res.status(200).json({
            liked,
            totalLikes: updatePost.likes.length,
            totalDislikes: updatePost.dislikes.length
        })

    } catch (e) {
        return res.status(403).json({
            error: 'You are not authenticated user.!'
        })
    }
}

exports.getDislkie = async (req, res, next) => {
    let postId = req.params.postId
    let userId = req.user._id
    let disliked = null

    if(!req.user) {
        return res.status(403).json({
            error: 'You are not authenticated user.!'
        })
    }

    try{
        let post = await Post.findById(postId)

        if(post.likes.includes(userId)){
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'likes': userId
                }
            })
        }

        if(post.dislikes.includes(userId)){
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislikes': userId
                }
            })
            disliked = false
        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'dislikes': userId
                }
            })
            disliked = true
        }
        
        let updatePost = await Post.findById(postId)
        res.status(200).json({
            disliked,
            totalLikes: updatePost.likes.length,
            totalLDisikes: updatePost.dislikes.length
        })


    } catch(e) {

    }
}