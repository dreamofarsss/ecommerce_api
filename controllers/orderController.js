const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const createOrder = async(req, res, next) => {
    const {userID} = req.params;
    if(!userID){
        return next(new Error('User with that ID not found!'))
    }
    console.log(userID)
    try{
        const cart = await Cart.findOne({userID: userID});
        console.log(cart)
        if(!cart || cart.items.length === 0){
            return next(new Error('Cart is empty!'))
        }

        let orderItems = [];
        let totalAmount = 0;

        for(const item of cart.items){
            console.log(item)

            const product = await Product.findById(item.productID);
            if(!product){
                return next(new Error(`product with ID ${item.productID} not found`))
            }
            if(product.stock_quantity < item.quantity){
                return next(new Error(`Insufficient stock for product ${product.name}`))
            }

            const orderItem = {
                productID: item.productID,
                name: product.name,
                price: product.price,
                quantity: Number(item.quantity),
            }

            orderItems.push(orderItem);
            totalAmount += product.price * item.quantity;
            product.stock_quantity -= Number(item.quantity);
            await product.save()
        }

        const order = new Order({
            userID,
            items: orderItems,
            totalAmount
        })
        await order.save();

        //await Cart.findOneAndDelete({userID});

        res.status(200).json({
            message: 'your order created succesfully!',
            oreder: order,
        })

    } catch(err){
        return next(err)
    }
}

const getOrdersByUserId = async (req, res, next) => {
    const { userID } = req.params;

    if (!userID) {
        return next(new Error('userID is required!'));
    }

    try {
        const orders = await Order.find({ userID: userID }).populate('items.productID');
        if (!orders || orders.length === 0) {
            return next(new Error('No orders found for this user'));
        }

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders,
        });
    } catch (err) {
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    const { orderID } = req.params;

    if (!orderID) {
        return next(new Error('orderID is required!'));
    }

    try {
        const order = await Order.findById(orderID).populate('items.productID');
        if (!order) {
            return next(new Error('Order not found'));
        }

        res.status(200).json({
            message: 'Order retrieved successfully',
            order,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new Error('Invalid orderID'));
        }
        next(err);
    }
};


module.exports = {createOrder, getOrdersByUserId, getOrderById };