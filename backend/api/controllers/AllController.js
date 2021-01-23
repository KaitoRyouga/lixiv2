const Order = require('../models/Order')
const Product = require('../models/Product')
const Promo = require('../models/Promo')
const Admin = require('../models/Admin')

class AllController {
    static async index (req, res, next) {

        const uid = req.headers.uid;
        const phone = req.headers.phone;
        
        try {
            let order = []
            const product = await Product.find({})
            const promo = await Promo.find({})
            const check = await Admin.findOne({uid: `${req.headers.uid}`})

            if(check !== null){ // if you is admin
                order = await Order.find({})
            }else if( uid !== "" && phone === ""){ // login with fb + gg => search orders with uid
                order = await Order.find({uid: uid})
            }else if(phone !== ""){ // login with phone => search orders with phone
                const phoneNumber = "0" + phone.slice(3, phone.length)
                order = await Order.find({phone: phoneNumber})
            }

            const allInfo = [].concat({Order: order}, {Product: product}, {Promo: promo}, {Admin: check === null ? false : true})

            return res.json({ allInfo: allInfo })
        } catch (error) {
            console.log(error)
            console.log('error')
        }
    }
}

module.exports = AllController
