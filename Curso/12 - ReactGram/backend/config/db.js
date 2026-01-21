import mongoose from 'mongoose'

// Conexão
export const conexao = async () => {
    try {
        const conexao = await mongoose.connect('mongodb://localhost:27017/ReactGram')
        return conexao
    } catch (error) {
        console.log(error)
    }
}