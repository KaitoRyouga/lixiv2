'use strict';
module.exports = function(app) {
    const Product = require('../controllers/ProductController');
    const Cart = require('../controllers/CartController');
    const Promo = require('../controllers/PromoController');
    const Order = require('../controllers/OrderController');
    const User = require('../controllers/UserController');
    const Check = require('../middleware/middlewares');

    // Users Routes

    app.param(['promoId'], function(req, res, next) {
        req.promoId = req.params.promoId;
        next()
    });

    app.param(['productId'], function(req, res, next) {
        req.productId = req.params.productId;
        next()
    });

    app.param(['orderId'], function(req, res, next) {
        req.orderId = req.params.orderId;
        next()
    });
    

    app.route('/')
        .get(Product.welcome)

    app.route('/products')
        .get(Product.index)
        .post(Product.store)

    app.route('/product/:productId')
        .put(Product.editById)
        .delete(Product.deleteById)

    app.route('/cart')
        .get(Cart.index)
        .post(Cart.store)

    app.route('/promotions')
        .get(Check.isAuthAdmin, Promo.index)
        .post(Promo.store)

    app.route('/promotion/:promoId')
        .put(Promo.editById)
        .delete(Promo.deleteById)

    app.route('/orders')
        .get(Order.index)
        .post(Order.store)

    app.route('/order/:orderId')
        .put(Order.editById)

    app.route('/user')
        .get(User.index)
        .post(User.store)

    app.route('/admin')
        .get(Check.isAdmin)
};