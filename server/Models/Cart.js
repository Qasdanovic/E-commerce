const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userEmail: {
    type: String
    },
  items: [
    {
      productId: { type: String},
      quantity: { type: Number},
      finalPrice : { type : Number}
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart
