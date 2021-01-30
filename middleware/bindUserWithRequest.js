const User = require('../model/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn){
            return next()
        }

        try{
            let user = await User.findOne(req.session.user._id)
            req.user = user

            next()

        } catch(err) {
            next(err)
        }
    }
}

exports.isAuthentic = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    next()
}

exports.unAuthentic = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }
    next()
}