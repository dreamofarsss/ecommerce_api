const {Router} = require('express')
const validateProduct = require('../middlewares/validateProduct')
const {createProduct, getAllProducts, getProductById, deleteProductById, updateProductByID} = require('../controllers/productController')

const router = new Router()

router.post('/', validateProduct, createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProductByID)
router.delete('/:id', deleteProductById)

module.exports = router;