const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    displayName: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    uid: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })

UserSchema.statics.protectedFields = [
  '_id'
]

const User = mongoose.model('User', UserSchema)

module.exports = User
