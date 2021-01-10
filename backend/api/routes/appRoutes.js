'use strict';
module.exports = function(app) {
    const Product = require('../controllers/ProductController');
    const Cart = require('../controllers/CartController');
    const Promo = require('../controllers/PromoController');

    // Users Routes

    app.route('/products')
        .get(Product.index)
        .post(Product.store)

    app.route('/cart')
        .get(Cart.index)
        .post(Cart.store)

    app.route('/promos')
        .get(Promo.index)
        .post(Promo.store)
};