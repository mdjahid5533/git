const Profile = require('../model/Profile')
const User = require('../model/User')

exports.getDashboard = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if (profile) {
            return res.render('dashboard/dashboard', {
                title: 'PS | Dashboard'
            })
        }

        res.redirect('/dashboard/create-profile')

    } catch (e) {
        next(e)
    }
}

exports.getCreateprofile = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (profile) {
            return res.redirect('/dashboard/edit-profile')
        }
        res.render('profile/create-profile', {
            title: 'PS | create-profile'
        })
    } catch (e) {
        next(e)
    }
}

exports.postCreateProfile = async (req, res, next) => {
    let {
        title,
        bio,
        website,
        facebook,
        instagram,
        github
    } = req.body



    try {
        let profile = new Profile({
            user: req.user._id,
            title,
            bio,
            profilePic: '',
            link: {
                website,
                facebook,
                instagram,
                github
            },
            post: []
        })

        if(req.file) {
            profile.profilePic = `/uploads/${req.file.filename}`
        }

        let createProfile = await profile.save()
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                profile: createProfile._id
            }
        })
        res.redirect('/dashboard')
    } catch (e) {
        next(e)
    }
}

exports.getEditProfile = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (profile) {
            return res.render('profile/edit-profile', {
                title: 'PS | edit-profile',
                profile
            })
        }

        res.redirect('/dashboard/create-profile')

    } catch (e) {
        next(e)
    }
}

exports.postEditProfile = async (req, res, next) => {
    let {
        title,
        bio,
        website,
        facebook,
        instagram,
        github
    } = req.body

    try {
        let oldProfile = await Profile.findOne({
            user: req.user._id
        })

        let profile = {
            user: req.user._id,
            title,
            bio,
            profilePic: oldProfile.profilePic,
            link: {
                website,
                facebook,
                instagram,
                github
            }
        }

        if(req.file) {
            profile.profilePic = `/uploads/${req.file.filename}`
        }

        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $set: profile
        }, {
            new: true
        })
        res.render('profile/edit-profile', {
            title: 'PS | edit-profile',
            profile
        })

    } catch (e) {
        next(e)
    }
}