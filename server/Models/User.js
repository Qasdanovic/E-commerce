const mongoose = require('../Config/connect') ;


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User