const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'product required!']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!'],
        min: [1, 'at least 1 one item']
    }
})

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'UserID is required!'],
    },
    items: [cartItemSchema]
})

//cartSchema.index({ userID: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema)