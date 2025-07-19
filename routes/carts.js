const {Router} = require('express')
const {deleteCart, getCart, addToCart, updateCartItem} = require('../controllers/cartController')
const router = new Router();

router.post('/:userID/add', addToCart)
router.get('/:userID', getCart)
router.put('/:userID/remove', updateCartItem)
router.delete('/:userID',  deleteCart)

module.exports = router;