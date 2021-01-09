const Cart = require('../models/Cart')

class CartController {
  static async store (req, res, next) {
    try {
        const CartProduct = []
        req.body.product.map(prod => {
            if (!prod.name || !prod.name.trim().length) {
                return res.status(422).json({
                  message: 'Product is required!'
                })
            }
    
            if (prod.quantity == 0 ) {
                return res.status(422).json({
                    message: 'Product quantity is required!'
                })
            }
            CartProduct.push({name: prod.name, quantity: prod.quantity});
        })

        


      const cart = new Cart({
        product: CartProduct
      })

      await cart.save()

      return res.redirect('/')
    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {
      const cart = await Cart.find({})

      return res.json({ Cart: cart })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async get_home (req, res) {
    return res.json("kaito")
  }
}

module.exports = CartController
