const bcrypt = require('bcrypt')
const User = require('../model/User')

exports.getLogin = (req, res, next) => {
    res.render('authentication/login', {
        title: 'PS | login page'
    })
}

exports.postLogin = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res.json({
            message: 'please provide email and password'
        })
    }

    try {
        let user = await User.findOne({
            email
        }).select('+password')

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.json({
                message: 'Incorrect email or password'
            })
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(function (err) {
            if (err) {
                return next(err)
            }
            res.redirect('/dashboard')
        })

    } catch (err) {
        next(err)
    }

}

exports.getSignup = (req, res, next) => {
    res.render('authentication/signup', {
        title: 'PS | signup page'
    })
}

exports.postSignup = async (req, res, next) => {
    let {
        username,
        email,
        password,
        passwordConfirm
    } = req.body

    let user = new User({
        username,
        email,
        password,
        passwordConfirm
    })

    try {
        await user.save()
        res.redirect('/auth/login')

    } catch (err) {
        next(err)
    }
}

exports.getChangePassword = (req, res, next) => {
    res.render('authentication/changePassword', {
        title: 'PS | change-password'
    })
}

exports.postChangePassword = async (req, res, next) => {
    let {
        oldPassword,
        newPassword,
        confirmPassword
    } = req.body

    if (newPassword != confirmPassword) {
        return res.json({
            message: `password doesn't match`
        })
    }

    try {
        let match = await bcrypt.compare(oldPassword, req.user.password)
        if (!match) {
            return res.json({
                message: `Invalid Old Password`
            })
        }

        let latestPass = await bcrypt.hash(newPassword, 12)
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                password: latestPass
            }
        })

        res.redirect('/auth/change-password')

    } catch (e) {
        next(e)
    }
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/login')
    })
}