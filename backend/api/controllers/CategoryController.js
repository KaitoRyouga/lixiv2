const Order = require('../models/Order')
const Product = require('../models/Product')
const Promo = require('../models/Promo')
const Admin = require('../models/Admin')

class CategoryController {
    static async index (req, res, next) {
        
        try {

            const nameCategory= req.params.nameCategory

            const findCategory = await Product.find({category: nameCategory})

            return res.json({ Products: findCategory })
        } catch (error) {
            console.log(error)
            console.log('error')
        }
    }
}

module.exports = CategoryController
