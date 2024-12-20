import { Router } from 'express'
import { loginUser, registerNewUser } from '../controllers/authController.js'
import { emailVerification, userFieldsVerification } from '../middlewares/userValidation.js'

const authRouter = Router()

authRouter.post('/register', userFieldsVerification, emailVerification, registerNewUser)
authRouter.get('/login', loginUser)

export default authRouter