const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromoSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  code: String
}, { timestamps: true })

PromoSchema.statics.protectedFields = [
  '_id'
]

const Promo = mongoose.model('Promo', PromoSchema)

module.exports = Promo
