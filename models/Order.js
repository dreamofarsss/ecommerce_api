const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'productID is required!']
    },
    name:{
        type: String,
        required: [true, 'snapshot of product name must be here']
    },
    price:{
        type: Number,
        required: [true, 'snapshot must be here']
    },
    quantity: {
        type: Number,
        required: [true, 'snapshot again']
    }
})

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        req: [true, 'userID is required']
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending','shipped', 'delivered', 'cancelled'],
        default: 'Pending'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)