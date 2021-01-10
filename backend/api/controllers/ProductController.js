const Product = require('../models/Product')

class ProductController {
  static async store (req, res, next) {
    try {
      if (!req.body.name || !req.body.name.trim().length) {
        return res.status(422).json({
          message: 'Product name is required!'
        })
      }

      if (!req.body.quantity || !req.body.quantity.trim().length) {
        return res.status(422).json({
          message: 'Product quantity is required!'
        })
      }

      const product = new Product({
        name: req.body.name,
        quantity: parseInt(req.body.quantity, 10),
        price: parseInt(req.body.price, 10),
        image: req.body.image
      })

      await product.save()

      return res.redirect('/')
    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {
      const products = await Product.find({})

      return res.json({ Products: products })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

}

module.exports = ProductController
