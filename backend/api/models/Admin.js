const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
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
})

AdminSchema.statics.protectedFields = [
  '_id'
]

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
