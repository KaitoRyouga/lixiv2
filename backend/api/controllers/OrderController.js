const Order = require('../models/Order')

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

        return res.redirect('/')
    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {
      const OrderCart = await Order.find({})

      return res.json({ Order: OrderCart })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }
}

module.exports = OrderController
