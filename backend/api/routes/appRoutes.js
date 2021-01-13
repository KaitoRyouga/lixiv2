'use strict';
module.exports = function(app) {
    const Product = require('../controllers/ProductController');
    const Cart = require('../controllers/CartController');
    const Promo = require('../controllers/PromoController');
    const Order = require('../controllers/OrderController');

    // Users Routes

    app.route('/products')
        .get(Product.index)
        .post(Product.store)

    app.route('/product/:productId')
        .get(Product.productById)
        .post(Product.edit)

    app.route('/cart')
        .get(Cart.index)
        .post(Cart.store)

    app.route('/promos')
        .get(Promo.index)
        .post(Promo.store)

    app.route('/order')
        .get(Order.index)
        .post(Order.store)

    app.param('productId', Product.productById)
};