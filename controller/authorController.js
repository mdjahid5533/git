const User = require('../model/User')
const Post = require('../model/Post')

exports.authorProfile = async (req, res, next) => {
    let userId = req.params.userId

    try {
        let author = await User.findById(userId).populate('profile').populate({
            path: 'profile',
            selet: 'post'
        })

        let posts = await Post.find({
            author: userId
        })

        res.render('explorer/author', {
            title: 'PS | author',
            author,
            posts
        })

    } catch (e) {
        next(e)
    }
}