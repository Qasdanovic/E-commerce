const Product = require("../Models/Product")

const ProductsController = {

    /**
     * @desc get all products
     * @method GET
     */

    getAllProducts : async (req, res) => {
        const products = await Product.find()

        if(!products) return res.status(400).json({message : 'theres no products in db'});
        
        return res.status(200).json(products) ;
    } ,

    getSingelProduct : async (req, res) => {
        const {id} = req.params ;
        const product = await Product.findOne({_id : id})

        if(!product) return res.status(404).json({message : 'no product found'});

        return res.status(200).json({result : product})
    }
}


module.exports = ProductsController