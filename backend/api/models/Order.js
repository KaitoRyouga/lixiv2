const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  product: {
    type: JSON
  },
  subtotal: {
    type: Number,
    required: true
  }
}, { timestamps: true })

OrderSchema.statics.protectedFields = [
  '_id'
]

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
