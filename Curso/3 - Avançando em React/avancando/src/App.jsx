import { useState } from 'react'
import './App.css'
import Banco from './assets/Banco.jpg'
import CarDetails from './components/CarDetails'
import ConditionalRender from './components/ConditionalRender'
import Container from './components/Container'
import ExecuteFunction from './components/ExecuteFunction'
import Fragment from './components/Fragment'
import ListRender from './components/ListRender'
import ManageData from './components/ManageData'
import ShowUserName from './components/ShowUserName'
import Message from './components/Message'
import ChangeMessageState from './components/ChangeMessageState'

function mensagem() {
  return 'Mensagem de função'
}

function App() {
  const carros = [
    {id: 1, marca: 'Wolkswagen', km: 0, cor: 'Azul'},
    {id: 2, marca: 'Chevrolet', km: 50, cor: 'Verde'},
    {id: 3, marca: 'Peugeot', km: 100, cor: 'Preto'}
  ]
  const [msg, setMsg] = useState('')
  const setMensagem = (msg) => {
    setMsg(msg)
  }
  return (
    <div className="App">
      <h1>Avançando em React</h1>
      {/* Imagem Pública */}
      <div>
        <img src="/Praia.jpg" alt="Praia" />
      </div>
      {/* Imagem em assets */}
      <div>
        <img src={Banco} alt="Banco" />
      </div>
      {/* useState */}
      <ManageData />
      {/* Renderização de Lista */}
      <ListRender />
      {/* Renderização Condicional */}
      <ConditionalRender />
      {/* Props */}
      <ShowUserName nome="Usuário 1" />
      {/* Desetruturando Props */}
      <CarDetails marca="Fiat" km={500} cor="Cinza Strato" />
      {/* Reaproveitando Componentes (No caso CarDetails) */}
      <CarDetails marca="Kia" km={200} cor="Branco" />
      <CarDetails marca="Mitsubishi" km={300} cor="Prata" />
      {/* Renderização de Lista em Componentes */}
      {
        carros.map((carro) => (
          <div key={carro.id}>
            <CarDetails marca={carro.marca} km={carro.km} cor={carro.cor} />
          </div>
        ))
      }
      {/* Fragmentos em React */}
      <Fragment />
      {/* Conteúdo interno (prop children) */}
      <Container prg="Outro parágrafo">
        <p>Parágrafo do container</p>
      </Container>
      {/* Função como prop */}
      <ExecuteFunction funcao={mensagem} />
      {/* Elevação de Estado - State Lift */}
      {/* Alteração e exibição de estados em outros componentes */}
      <Message msg={msg} />
      <ChangeMessageState setMensagem={setMensagem} />
    </div>
  )
}

export default App
