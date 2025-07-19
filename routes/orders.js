const {Router} = require('express')
const  {createOrder, getOrdersByUserId, getOrderById } = require('../controllers/orderController')

const router = new Router()

router.post('/:userID', createOrder)
router.get('/:userID', getOrdersByUserId)
router.get('/:orderID', getOrderById )
module.exports = router;