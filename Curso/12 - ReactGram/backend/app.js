// Módulo de definição do arquivo .env
// Usar em todos os arquivos que usarem as variáveis definidas em .env
import dotenv from 'dotenv'
dotenv.config() // Utiliza o arquivo .env para definir configurações gerais do projeto

// Módulos do Node
import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

// Módulos Definidos
import router from './routes/Router.js'
import { conexao } from './config/db.js'

// Definição de __dirname em ecmascript
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT

// Configura respostas JSON e dados de formulário
app.use(express.json()) // Configura o uso de JSON
app.use(express.urlencoded({extended: false})) // Configura o recebimento de dados de formulários

// Configurar o compartilhamento de recursos de origem cruzada - CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// Diretório de upload
const previousDir = __dirname.replace('/backend', '')
app.use('/uploads', express.static(path.join(previousDir, '/public/uploads')))

// Conexão BD
const con = conexao()

// Configura as rotas
app.use(router)

app.listen(port, () => {
    console.log('Aplicação executando na porta', port)
})