import express from 'express'
// Controller
import { commentPhoto, deletePhoto, getAllPhotos, getPhotoById, getUserPhotos, insertPhoto, likePhoto, searchPhotos, updatePhoto } from '../controllers/PhotoController.js'
// Middlewares
import { commentValidation, photoInsertValidation, photoUpdateValidation } from '../middlewares/photoValidation.js'
import { authGuard } from '../middlewares/authGuard.js'
import { validate } from '../middlewares/handleValidation.js'
import { imageUpload } from '../middlewares/imageUpload.js'

const router = express.Router()

// Rotas
router.post('/', authGuard, imageUpload.single('image'), photoInsertValidation(), validate, insertPhoto)
router.delete('/:id', authGuard, deletePhoto)
router.get('/', authGuard, getAllPhotos)
router.get('/user/:id', authGuard, getUserPhotos)
router.get('/search', authGuard, searchPhotos)
router.get('/:id', authGuard, getPhotoById) // A ordem das rotas importa, /user e /search podem ser confundidos com um id, por isso /:id deve ir abaixo
router.put('/:id', authGuard, photoUpdateValidation(), validate, updatePhoto)
router.put('/like/:id', authGuard, likePhoto)
router.put('/comment/:id', authGuard, commentValidation(), validate, commentPhoto)

export {router as photoRouter}