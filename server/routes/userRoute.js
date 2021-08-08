const { Router } = require('express')
const route = Router()

// Get Controllers
const { register, login, getUsers, getUser, deleteUser } = require('../controllers/userController')

// Get Auth
const auth = require('../middlewares/auth')

route.post('/register', register)
route.post('/login', login)

route.get('/', auth, getUsers)
route.get('/:id', auth, getUser)
// route.put('/:id', auth, editUser)
route.delete('/:id', auth, deleteUser)


module.exports = route