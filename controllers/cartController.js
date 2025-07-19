const Cart = require('../models/Cart')
const Product = require('../models/Product')

const addToCart = async(req, res, next) => {
    try{
        const {userID} = req.params;
        const {productID, quantity} = req.body;
    
        if(!userID || !productID || !quantity || quantity < 1){
            return next(new Error('userID, productID and qunatity is required!'))
        }
    
        const product = await Product.findById(productID);
        if(!product){
            next(new Error('Product not found'))
        }
        console.log('product here:', product)
    
        if(product.stock_quantity < quantity){
            return next(new Error('not enough quantity for your order'))
        }
    
        let cart = await Cart.findOne({userID: userID});
        if(cart){
            const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID)
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += Number(quantity);
            }else{
                cart.items.push({productID, quantity})
            }
        }else{
            cart = new Cart({userID, items: [{productID, quantity}] });
        }
    
        await cart.save()
        res.status(200).json({
            message: "succesfuly added to cart",
            your_cart: cart
        })
    }catch(err){
        return next(err)
    }   
}

const updateCartItem = async(req, res, next) => {
    const {userID} = req.params;
    const {productID, quantity} = req.body;

    if(!userID || !productID || !quantity || quantity < 1){
        return next(new Error('userID, productID and qunatity is required!'))
    }

    const product = await Product.findById(productID);
    if(!product){
        next(new Error('Product not found'))
    }
    if (product.stock_quantity < quantity) {
        const error = new Error(`Insufficient stock for product ${product.name}`);
        return next(error);
    }

    try{
        let cart = await Cart.findOne({userID: userID});
        const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID)
        if(itemIndex > -1){
            cart.items[itemIndex].quantity = quantity;
            await cart.save()
            return res.status(200).json({
                messge: 'updated succesfully',
                new_cart: cart
            })
        }
    }catch(err){
        return next(err)
    }
}

const getCart = async(req, res, next) => {
    const {userID} = req.params;
    if(!userID){
        return next(new Error('cant get your userID'))
    }
    try{
        const cart = await Cart.findOne({userID: userID})
        return res.status(200).json({
            message: 'here is your cart',
            cart: cart
        })
    }catch(err){
        return next(err)
    }
}

const deleteCart = async(req, res, next) => {
    const {userID} = req.params;
    if(!userID){
        return next(new Error('cant get your userID'))
    }
    try{
        const result = await Cart.findOneAndDelete({userID: userID});
        return res.status(200).json({
            message: "deleted succesfully",
            result: result
        })
    }catch(err){
        return next(err)
    }
}

module.exports = {deleteCart, getCart, addToCart, updateCartItem}