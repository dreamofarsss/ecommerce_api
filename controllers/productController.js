const Product = require('../models/Product')
const createProduct = async(req, res) => {
    try{
        const {name, description, price, category, stock_quantity} = req.body;
        const product = await new Product({name, description, price, category, stock_quantity})
        console.log("Product created! ", product)
        product.save()
        res.status(200).json({
            message: "product created succesfully",
            product: product
        })
    } catch(err){
        return res.status(500).json({
            message: "can't create product",
            err_msg: err.message
        })
    }
}

const getAllProducts = async(req, res, next) => {
    try{
        const products = await Product.find({});
        if(!products || products.length === 0){
            next(new Error("no products found"))
        }
        return res.status(200).json({
            message: "All products:",
            products: products
        })
    }catch(err){
        next(err)
    }
}
const getProductById = async(req, res, next) => {
    try{
        const {id} = req.params;
        if(!id){
            next(new Error('id not found'))
        }

        const product = await Product.findById(id);
        if(!product){
            next(new Error('no such product'))
        }

        res.status(200).json({
            product: product
        })

    } catch(err){
        next(err)
    }
}

const updateProductByID = async(req, res, next) => {
    try{
        const {id} = req.params;
        if(!id){
            next(new Error('id not found'))
        }
        const {name, description, price, category, stock_quantity} = req.body;

        const result = await Product.findByIdAndUpdate(
            id, 
            { name, description, price, category, stock_quantity},
            {new: true, runValidators: true}
        )

        res.status(200).json({
            message: 'updated succesfully',
            new_product: result
        })

    }catch(err){
        next(err)
    }
}

const deleteProductById = async(req, res, next) => {
    try{
        const {id} = req.params;
        if(!id){
            next(new Error('id not found'))
        }
        const result = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: 'deleted succesfully',
            result: result
        })
    }catch(err){
        next(err)
    }
}

module.exports = {createProduct, getAllProducts, getProductById, deleteProductById, updateProductByID};