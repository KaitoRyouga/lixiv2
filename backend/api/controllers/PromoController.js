const Promo = require('../models/Promo')

class PromoController {
  static async store (req, res, next) {
    try {

      if (!req.body.name || !req.body.name.trim().length) {
        return res.status(422).json({
          message: 'Promo name is required!'
        })
      }

      if (!req.body.quantity || !req.body.quantity.trim().length) {
        return res.status(422).json({
          message: 'Promo quantity is required!'
        })
      }

      if (!req.body.price || !req.body.price.trim().length) {
        return res.status(422).json({
          message: 'Promo price is required!'
        })
      }

      if (!req.body.code || !req.body.code.trim().length) {
        return res.status(422).json({
          message: 'Promo code is required!'
        })
      }

      const promo = new Promo({
        name: req.body.name,
        quantity: parseInt(req.body.quantity, 10),
        price: parseInt(req.body.price, 10),
        code: req.body.code
      })

      await promo.save()

      return res.json({ Promo: promo })
    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {
      const promos = await Promo.find({})

      return res.json({ Promos: promos })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async editById (req, res, next) {

    try {
      await Promo.updateOne({_id: req.params.promoId}, req.body)
      return res.json({ Promo: req.body })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

  static async deleteById (req, res, next) {
    try {
      await Promo.deleteOne({_id: req.params.promoId})

      return res.json({ messenge: req.params.promoId}) 
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }

}

module.exports = PromoController
