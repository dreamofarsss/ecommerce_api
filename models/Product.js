const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    description: {
        type: String,
        default: null,
    },
    price:{
        type: Number,
        required: [true, 'Price is required!']
    },
    category:{
        type: String,
        default: null,
    },
    stock_quantity: {
        type: Number,
        default: 0,
        min: [0, 'Stock quantity cannot be negative']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Product', productSchema)