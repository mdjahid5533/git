const validator = require('validator')
const {
    Schema,
    model
} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        maxlength: 100,
        trim: true
    },
    body: {
        type: String,
        required: [true, 'Bio is required!'],
        maxlength: 5000,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required!'],
        validate: {
            validator: function (tags) {
                tags = tags.map(t => t.trim())
                return tags.length <= 5
            },
            message: 'Tags less than 6'
        }
    },
    thumbnail: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

postSchema.index({
    title: 'text',
    body: 'text',
    tags: 'text'
}, {
    weights: {
        title: 5,
        tags: 5,
        body: 2
    }
})

const Post = model('Post', postSchema)
module.exports = Post