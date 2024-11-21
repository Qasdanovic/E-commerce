const express = require('express');
const Router = express.Router()

const CartController = require('../Controllers/CartController')

Router.route('/createCart')
      .post(CartController.createCart) ;

Router.route("/getCartInfo/:email")
      .get(CartController.getCartInfo) ;



module.exports = Router