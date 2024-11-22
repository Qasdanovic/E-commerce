const express = require('express');
const Router = express.Router()

const CartController = require('../Controllers/CartController')

Router.route('/createCart')
      .post(CartController.createCart) ;

Router.route("/getCartInfo/:email")
      .get(CartController.getCartInfo) ;

Router.route("/updateCart")
      .put(CartController.UpdateCart)



module.exports = Router