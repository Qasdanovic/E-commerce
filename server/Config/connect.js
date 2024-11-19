const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Ecommerce")
        .then(() => console.log("connected to db successfully"))
        .catch(err => console.log(err))

module.exports = mongoose