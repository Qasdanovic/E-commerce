const express = require('express')
const ProductsController = require('../Controllers/ProductsController')

const Router = express.Router()

Router.route('/')
      .get(ProductsController.getAllProducts)

Router.route('/:id')
      .get(ProductsController.getSingelProduct)


module.exports = Router