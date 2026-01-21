import './App.css'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <h2>Formulários</h2>
      <Form usr={{nome: 'usuário 1', email: 'email@email.com', bio: 'Resumo', funcao: 'admin'}} />
    </div>
  )
}

export default App
