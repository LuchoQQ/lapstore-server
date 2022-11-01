const express = require('express')
const { getAllUsers, createUser, getUserById, deleteUserById, validateUser, validateToken } = require('../controllers/users.controllers')

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/validate', validateUser)

router.post('/me', validateToken)

router.post('/', createUser)

router.delete('/:id', deleteUserById)




module.exports = router