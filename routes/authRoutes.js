import { Router } from 'express'
import authMethods from '../controllers/authController.js'

const authRouter = Router()

const [ register, login ] = authMethods

// Register a new user
authRouter.post('/register', register)

// Login an existing user
authRouter.post('/login', login)

export default authRouter