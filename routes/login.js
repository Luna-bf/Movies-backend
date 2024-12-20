import { Router } from 'express'
import { emailVerification, userFieldsVerification } from '../middlewares/userValidation.js'
import {getAllUsers, createUser, getUserByID, updateUserByID, deleteUserByID} from '../controllers/userController.js'

const register = Router()