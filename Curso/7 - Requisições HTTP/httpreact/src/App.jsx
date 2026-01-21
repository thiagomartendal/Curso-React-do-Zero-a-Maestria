import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import './App.css'

const url = 'http://localhost:3000/products'

function App() {
  const {data: items, httpConfig, loading, error} = useFetch(url) // Pode ser apenas data também, e então usar data no lugar de items na renderização
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // Cadastro de Produtos
  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = {
      name: name,
      price: price
    }
    httpConfig(product, 'POST') // Envia o objeto json do produto
    setName('')
    setPrice('')
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* Loading - Renderiza os dados quando a requisição termina */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {
        !loading && <ul>
        {
          items && items.map((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}
            </li>
          ))
        }
      </ul>
      }
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome: <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço: <input type="number" value={price} name="price" step="0.01" onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* State de loading no post */}
          {/* Impede que o botão possa ser clicado para enviar os dados enquando os dados não são carregados */}
          {loading && <input type="submit" value="Aguarde" disabled />}
          {!loading && <input type="submit" value="Cadastrar Produto" />}
          {/* Isso impede o duplo envio e a duplicação de dados */}
        </form>
      </div>
    </div>
  )
}

export default App
