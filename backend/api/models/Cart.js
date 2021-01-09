const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  product: {
    type: JSON
  }
}, { timestamps: true })

CartSchema.statics.protectedFields = [
  '_id'
]

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
