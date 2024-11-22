const Cart = require('../Models/Cart') ;

const CartController = {
    createCart : async (req, res) => {
        const { userEmail, items, totalPrice } = req.body;

        const newCart = new Cart({
            userEmail,
            items,
            totalPrice
        })

        await newCart.save(); 
        return res.status(200).json({message : "cart created successfully"})
    } ,

    getCartInfo : async (req, res) => {
        const { email } = req.params;

        const CartInfo = await Cart.findOne({ userEmail : email});

        if(!CartInfo) return res.status(404).json({ message : "cart not found" });

        return res.status(200).json(CartInfo);
    } ,

    UpdateCart : async (req, res) => {
        const {CartId, userEmail, items, totalPrice} = req.body;

        const updateCart = await Cart.findByIdAndUpdate(CartId, {
            userEmail,
            items,
            totalPrice
        })
        // console.log(updateCart)
        if (!updateCart) return res.status(400).json({ message : "somthing went wrong"})

        return res.status(200).json({ message : "updated successfully"})
    }
}

module.exports = CartController