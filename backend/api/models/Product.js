const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String
}, { timestamps: true })

ProductSchema.statics.protectedFields = [
  '_id'
]

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
