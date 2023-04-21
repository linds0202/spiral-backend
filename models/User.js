const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Enrolled: {
            type: Number
        },
        Admin: {
            type: Number
        }
    },
    favResources: {
        type: [String],
        default: []
    },
    password: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        default: ''
      },
    imageUrl: {
        type: String,
        default: ''
      },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)