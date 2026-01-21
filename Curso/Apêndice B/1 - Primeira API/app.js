import express from 'express'

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Rotas
app.get('/', (req, res) => {
    // 200 - Status de sucesso
    res.status(200).json({message: 'Primeira rota criada com sucesso.'})
})

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    if(!name) {
        // 422 - Status de erro
        res.status(422).json({message: 'O campo nome é obrigatório.'})
        return
    }

    console.log(name, price)

    // 201 - Status de sucesso para criação de recurso
    res.status(201).json({message: `O produto ${name} - \$${price} foi cadastrado.`})
})

app.listen(3000)