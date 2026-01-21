import mongoose from 'mongoose'
import { Photo } from '../models/Photo.js'
import { User } from '../models/User.js'

// Insere uma foto com um usuário relacionado
const insertPhoto = async (req, res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    // Criar foto
    const newPhoto = await Photo.create({
        image: image,
        title: title,
        userId: user._id,
        userName: user.name
    })

    // Se a foto foi criada com sucesso, retorna os dados
    if (!newPhoto) { // Mas caso ocorra algum erro, retorna uma mensagem de erro
        res.status(422).json({
            errors: ['Houve um problema, por favor tente novamente mais tarde.']
        })
        return
    }

    res.status(201).json(newPhoto)
}

// Remove a foto do Banco de Dados
const deletePhoto = async (req, res) => {
    const {id} = req.params

    const reqUser = req.user

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Checa se a foto existe
        if (!photo) {
            res.status(404).json({
                errors: ['Foto não encontrada.']
            })
            return
        }

        // Checa se a foto pertence ao usuário para poder remove-la
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
            })
            return
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({
            id: photo._id,
            message: 'Foto excluída com sucesso.'
        })
    } catch (error) {
        res.status(404).json({
            errors: ['Foto não encontrada.']
        })
        return
    }
}

// Retorna todas as fotos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([['createdAt', -1]]).exec()

    return res.status(200).json(photos)
}

// Retorna as fotos do usuário
const getUserPhotos = async (req, res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec()

    return res.status(200).json(photos)
}

// Retorna foto pelo Id
const getPhotoById = async (req, res) => {
    const {id} = req.params

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // Checa se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ['Foto não encontrada.']
        })
        return
    }

    res.status(200).json(photo)
}

// Atualizar uma photo
const updatePhoto = async (req, res) => {
    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // Checa se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ['Foto não encontrada.']
        })
        return
    }

    // Checa se a foto pertence ao usuário
    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        })
        return
    }

    if (title)
        photo.title = title

    await photo.save()

    res.status(200).json({
        photo: photo,
        message: 'Foto atualizada com sucesso.'
    })
}

// Funcionalidade de curtidas em fotos
const likePhoto = async (req, res) => {
    const {id} = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // Checa se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ['Foto não encontrada.']
        })
        return
    }

    // Checa se o usuário já deu like na foto
    if (photo.likes.includes(reqUser._id)) {
        res.status(422).json({
            errors: ['Você já curtiu a foto.']
        })
        return
    }

    // Insere o id do usuário no array de curtidas
    photo.likes.push(reqUser._id)

    await photo.save()

    res.status(200).json({
        photoId: id,
        userId: reqUser._id,
        message: 'A foto foi curtida.'
    })
}

// Funcionalidade de comentários em fotos
const commentPhoto = async (req, res) => {
    const {id} = req.params
    const {comment} = req.body

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const photo = await Photo.findById(id)

    // Checa se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ['Foto não encontrada.']
        })
        return
    }

    // Adiciona o comentário no array de comentários
    const userComment = {
        comment: comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: 'O comentário foi adicionado com sucesso.'
    })
}

// Busca de fotos por título
const searchPhotos = async (req, res) => {
    const {q} = req.query

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()
    // RegExp(q, "i") indica que a query de busca q pode estar em qualquer lugar da string de título

    res.status(200).json(photos)
}

export {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos}