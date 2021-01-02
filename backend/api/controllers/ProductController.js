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
        image: req.body.image
        // image: req.file ? req.file.path : undefined,
        // userCreated: req.user._id
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

  static async get_home (req, res) {
    return res.json("kaito")
  }
}

module.exports = ProductController
