'use strict';
module.exports = function(app) {
    // const API = require('../controllers/appController');
    const Product = require('../controllers/ProductController');
    const Cart = require('../controllers/CartController');
    // const authMiddleware = require('../middleware/middlewares');
    // const isAuth = authMiddleware.isAuth;

    // Users Routes
    app.route('/')
        .get(Product.get_home)

    app.route('/products')
        .get(Product.index)
        .post(Product.store)

    app.route('/cart')
        .get(Cart.index)
        .post(Cart.store)
};