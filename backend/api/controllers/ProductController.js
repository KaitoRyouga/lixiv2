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

      // console.log(req.body)
      const size = req.body.size.split("-")
      const arrSize = []

      if (Number.isInteger(size[0] - 0)) {
        for (let index = size[0]; index <= size[size.length - 1]; index++) {
          arrSize.push(Number(index)) 
        }
      } else {
        const sizeLess = req.body.size.split(",")
        sizeLess.forEach(element => {
          arrSize.push(Number(element))
        });
      }

      const product = new Product({
        name: req.body.name,
        size: arrSize,
        quantity: parseInt(req.body.quantity, 10),
        price: parseInt(req.body.price, 10),
        image: req.body.image
      })

      await product.save()

      return res.json({ Product: product })
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

  static async welcome (req, res, next) {
    try {
      // const products = await Product.find({})

      return res.json({ messenge: "welcome to lixiv2" })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async editById (req, res, next) {
    
    try {
      await Product.updateOne({_id: req.params.productId}, req.body)
      // const resultProduct = 
      req.body._id = req.params.productId
      return res.json({ Product: req.body })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async deleteById (req, res, next) {
    try {
      await Product.deleteOne({_id: req.params.productId})

      return res.json({ messenge: req.params.productId}) 
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

}

module.exports = ProductController
