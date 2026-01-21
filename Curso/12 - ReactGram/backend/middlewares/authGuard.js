import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const authGuard = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Pega o token, que está na segunda parte da string

    // Checa se o cabeçalho possui o token
    if (!token)
        return res.status(401).json({
            errors: ['Acesso negado!']
        })
    
    // Checa se o token é válido
    try {
        const verified = jwt.verify(token, jwtSecret) // Verifica o token com o segredo atribuído
        req.user = await User.findById(verified.id).select('-password') // Atribui o usuário autenticado na requisição
        next() // Prossegue a requisição
    } catch (error) {
        res.status(401).json({
            errors: ['Token inválido.']
        })
    }
}