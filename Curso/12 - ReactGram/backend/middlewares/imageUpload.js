import multer from 'multer'
import path from 'path'

// Função para salvar a imagem
const imageStore = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = ''

        if (req.baseUrl.includes('users'))
            folder = 'users'
        else if (req.baseUrl.includes('photos'))
            folder = 'photos'

        // A pasta public está no mesmo nível que backend, e não dentro, por isso deve-se usar ../ para referenciar de forma correta
        callback(null, '../public/uploads/' + folder + '/')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)) // Nome da imagem: data atual + extensão do arquivo
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg)$/)) // Verifica se o arquivo de imagem tem extensão png ou jpg
            // Envia apenas png e jpg
            return callback(new Error('Por favor, envie apenas png ou jpg.'))
        callback(undefined, true)
    }
})

export {imageUpload}