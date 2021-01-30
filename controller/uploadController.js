const Profile = require('../model/Profile')
const User = require('../model/User')

exports.uploadProfilePic = async (req, res, next) => {
    if (req.file) {
        try {
            let profile = await Profile.findOne({
                user: req.user._id
            })
            let profilePic = `/uploads/${req.file.filename}`

            if (profile) {
                await Profile.findOneAndUpdate({
                    user: req.user._id
                }, {
                    $set: profilePic
                })

                await User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                    $set: profilePic
                })
            }

        } catch (e) {
            //next(e)
            res.status(500).json({
                profilePic: req.user.profilePic
            })
        }
    } else{
        res.status(500).json({
            profilePic: req.user.profilePic
        })
    }
}

/*

<div class="profile-pics header">
            <img src="<%= user.profilePic %> " width="150px" alt="">
            <br>
            <form action="/uploads/proilePic" method="POST" enctype="multipart/form-data">
                <input type="file" name="proilePic" accept="/*">
                <input type="button" value="Remove Pic" class="btn">
            </form>
        </div>

        */