'use strict';
module.exports = function(app) {
    // const API = require('../controllers/appController');
    const Product = require('../controllers/ProductController');
    // const authMiddleware = require('../middleware/middlewares');
    // const isAuth = authMiddleware.isAuth;

    // Users Routes
    app.route('/')
        .get(Product.get_home)

    app.route('/products')
        .get(Product.index)
        .post(Product.store)
};