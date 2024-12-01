const UserController = require('../Controllers/UserController')
const express = require('express')

const Router = express.Router()



Router.route('/add')
      .post(UserController.addUser)

Router.route('/login')
      .post(UserController.logingIn)

Router.route('/changePass')
      .put(UserController.changePassword)



module.exports = Router