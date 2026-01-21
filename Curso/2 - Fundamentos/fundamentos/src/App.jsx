// Componentes
import FirstComponent from './components/FirstComponent'
import TemplateExpression from './components/TemplateExpression'
import Component from './components/Component'
import Events from './components/Events'
import Chellenge from './components/Chellenge'

// Estilos
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Fundamentos React</h1>
      {/* Criando Componentes */}
      <FirstComponent />
      {/* Template de Expressões */}
      <TemplateExpression />
      {/* Criando Componentes */}
      <Component />
      {/* Eventos */}
      <Events />
      {/* Desafio */}
      <Chellenge />
    </div>
  )
}

export default App
