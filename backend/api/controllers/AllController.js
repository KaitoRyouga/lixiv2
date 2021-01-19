const Order = require('../models/Order')
const Product = require('../models/Product')
const Promo = require('../models/Promo')
const Admin = require('../models/Admin')

class AllController {
    static async index (req, res, next) {
        try {
            const order = await Order.find({})
            const product = await Product.find({})
            const promo = await Promo.find({})
            const check = await Admin.findOne({uid: `${req.headers.uid}`})

            const allInfo = [].concat({Order: order}, {Product: product}, {Promo: promo}, {Admin: check === null ? false : true})

            return res.json({ allInfo: allInfo })
        } catch (error) {
            console.log(error)
            console.log('error')
        }
    }
}

module.exports = AllController
