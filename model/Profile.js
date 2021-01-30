const validator = require('validator')
const {
    Schema,
    model
} = require('mongoose')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        maxlength: 50,
        trim: true
    },
    bio: {
        type: String,
        required: [true, 'Bio is required!'],
        maxlength: 5000,
        trim: true
    },
    profilePic: String,
    link: {
        website: {
            type: String,
            unique: true,
            validate: {
                validator: function (URL) {
                    if (URL) {
                        return validator.isURL(URL)
                    }
                },
                message: 'please provide a valid URL'
            }
        },
        facebook: String,
        instagram: String,
        github: String
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema)
module.exports = Profile