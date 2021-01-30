const validator = require('validator')
const bcrypt = require('bcrypt')
const {
    Schema,
    model
} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please tell us your username!'],
        unique: true,
        maxlength: 15,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address!'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email!']
    },
    password: {
        type: String,
        required: [true, 'please provide a password!'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm password!'],
        minlength: 8,
        validate: {
            validator: function (cp) {
                return cp === this.password
            },
            message: 'password does not match'
        }
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePic: {
        type: String,
        default: '/uploads/person.png'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.comparePassword = async function(currentPassword, userPassword) {
    return await bcrypt.compare(currentPassword, userPassword)
}

const User = model('User', userSchema)
module.exports = User