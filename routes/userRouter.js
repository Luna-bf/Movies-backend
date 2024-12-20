import { Router } from 'express'
import { emailVerification, userFieldsVerification } from '../middlewares/userValidation.js'
import {getAllUsers, createUser, getUserByID, updateUserByID, deleteUserByID} from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/users', getAllUsers)

userRouter.post('/user', userFieldsVerification, emailVerification, createUser)

userRouter.get('/user/:id', getUserByID)

userRouter.put('/user/:id', updateUserByID)

userRouter.delete('/user/:id', deleteUserByID)

export default userRouter