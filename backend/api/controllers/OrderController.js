const Order = require('../models/Order')
const Admin = require('../models/Admin')

class OrderController {
  static async store (req, res, next) {

    try {
        const OrderCartRaw = req.body

        if (!req.body.name || !req.body.name.trim().length) {
          return res.status(422).json({
            message: 'Name is required!'
          })
        }

        if (!req.body.phone || !req.body.phone.trim().length) {
          return res.status(422).json({
            message: 'Phone is required!'
          })
        }

        if (!req.body.address || !req.body.address.trim().length) {
          return res.status(422).json({
            message: 'Address is required!'
          })
        }

        if (req.body.subtotal == 0 ) {
          return res.status(422).json({
              message: 'Subtotal is required!'
          })
        }

        req.body.cart.stateCart.map(c => {
            if (!c.name || !c.name.trim().length) {
                return res.status(422).json({
                  message: 'Name product is required!'
                })
            }
    
            if (c.quantity == 0 ) {
                return res.status(422).json({
                    message: 'Product quantity is required!'
                })
            }
        })
        // console.log(OrderCartRaw)
        const OrderCart = new Order(OrderCartRaw)

        await OrderCart.save()

        return res.json({ Order: OrderCart })
    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {

      console.log(req.headers)

      const check = await Admin.findOne({uid: `${req.headers.uid}`})
      let OrderCart
      const uid = req.headers.uid;
      const phone = req.headers.phone;

      if(check !== null){ // if you is admin
        OrderCart = await Order.find({})
      }else if( uid !== "" && phone === ""){ // login with fb + gg => search orders with uid
        OrderCart = await Order.find({uid: uid})
      }else if(phone !== ""){ // login with phone => search orders with phone
        
        const phoneNumber = "0" + phone.slice(3, phone.length)
        OrderCart = await Order.find({phone: phoneNumber})
      }

      return res.json({ Order: OrderCart })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async editById (req, res, next) {
    try {
      await Order.updateOne({_id: req.params.orderId}, req.body)
      return res.json({ Order: req.body })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }
}

module.exports = OrderController
