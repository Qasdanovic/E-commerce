const mongoose = require('../Config/connect')

const ProductSchema = new mongoose.Schema({
    title : {
        type : String
    } ,
    price : {
        type : Number
    } ,
    images : {
        type : Array
    }
})

const Product = mongoose.model("products", ProductSchema)

module.exports = Product