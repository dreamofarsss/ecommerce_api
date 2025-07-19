const validateProduct = (req, res, next) => {
    if(
        !req.body.name ||
        !req.body.price||
        req.body.price < 0 ||
        req.body.stock_quantity < 0
    ){
        return res.status(400).json({message:'Not valid product!'}) 
    }
    next();
}

module.exports = validateProduct;