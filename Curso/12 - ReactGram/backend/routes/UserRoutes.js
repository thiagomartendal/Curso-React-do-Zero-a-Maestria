import express from 'express'
// Controller
import { register, login, getCurrentUser, update, getUserById } from '../controllers/UserController.js'
// Middlewares
import { validate } from '../middlewares/handleValidation.js'
import { userCreateValidation, loginValidation, userUpdateValidation } from '../middlewares/userValidations.js'
import { authGuard } from '../middlewares/authGuard.js'
import { imageUpload } from '../middlewares/imageUpload.js'

const router = express.Router()

// Rotas
router.post('/register', userCreateValidation(), validate, register) // O validate resgata os erros da requisição, que são disparados por userCreateValidation caso ocorram
router.get('/profile', authGuard, getCurrentUser)
router.post('/login', loginValidation(), validate, login)
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update)
router.get('/:id', getUserById)

export {router as userRouter}