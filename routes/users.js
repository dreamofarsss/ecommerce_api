const {Router} = require('express');
const {validateUser} = require('../middlewares/validateUser');
const {hashPassword} = require('../middlewares/hashPassword')
const {createUser, getAllUsers, getUserById, deleteUserById, updateUserById} = require('../controllers/userController');

const router = Router()

router.post('/', validateUser, hashPassword ,createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)

module.exports = router