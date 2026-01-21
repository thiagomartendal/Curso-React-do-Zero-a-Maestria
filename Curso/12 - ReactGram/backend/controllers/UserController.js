// Módulo de definição do arquivo .env
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

const jwtSecret = process.env.JWT_SECRET

// Gerar token de usuário
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '7d'
    })
}

// Registrar usuário e logar
const register = async (req, res) => {
    const {name, email, password} = req.body

    // Checa se o usuário existe
    const user = await User.findOne({email})

    if (user) { // Caso existe, impede a criação da conta retornando erro
        res.status(422).json({
            erros: ['Por favor, utilize outro email.']
        })
        return
    }

    // Gerar o hash de senha
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Criar usuário
    const newUser = await User.create({
        name: name,
        email: email,
        password: passwordHash
    })

    // Se o usuário foi criado com sucesso, retorna o token
    if (!newUser) {
        res.send(422).json({
            erros: ['Houve um erro, por favor tente novamente mais tarde.']
        })
        return
    }

    // Caso as operações ocorram de forma correta, retorna o token do usuário
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// Login do usuário
const login = async (req, res) => {
    const {email, password} = req.body

    // Checa se o usuário existe
    const user = await User.findOne({email})

    if (!user) { // Caso não exista, o login é impedido retornando erro
        res.status(404).json({
            errors: ['Usuário não encontrado.']
        })
        return
    }

    // Checa se a senha é correta
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({
            errors: ['Senha incorreta.']
        })
        return
    }

    // Caso as credenciais estejam corretas, retorna o token do usuário
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

// Regata o usuário atual autenticado
const getCurrentUser = async (req, res) => {
    const user = req.user

    // Envia o usuário
    res.status(200).json(user)
}

// Atualizar dados do usuário
const update = async (req, res) => {
    const {name, password, bio} = req.body

    // Recupera a imagem caso tenha sido enviada
    let profileImage = ((req.file) ? req.file.filename : null)

    // Resgata os dados do usuário atual
    const reqUser = req.user
    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password')
    
    // Atualiza o nome caso tenha sido preenchido o campo de nome
    if (name)
        user.name = name

    // Atualiza a senha caso tenha sido preenchido o campo de senha
    if (password) {
        // Gerar o hash de senha
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    // Atualiza a imagem do perfil caso tenha sido enviada uma nova imagem
    if (profileImage) 
        user.profileImage = profileImage

    // Atualiza a biografia caso tenha sido preenchido o campo de biografia 
    if (bio)
        user.bio = bio

    // Salva as alterações feitas em user no banco de dados
    await user.save()

    // Envia o usuário
    res.status(200).json(user)
}

// Retorna usuário pelo id
const getUserById = async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select('-password')

        // Checa se o usuário existe
        if (!user) {
            res.status(404).json({
                errors: ['Usuário não encontrado.']
            })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
            errors: ['Usuário não encontrado.']
        })
        return
    }
}

export {register, login, getCurrentUser, update, getUserById}