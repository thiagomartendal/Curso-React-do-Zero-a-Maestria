import './App.css'
import Component from './components/Component'
import Title from './components/Title'

function App() {
  const n = 15
  const titulo = true
  return (
    <div className="App">
      {/* CSS Global */}
      <h1>React com CSS</h1>
      {/* CSS de Componente */}
      <Component />
      {/* CSS Global */}
      <p>Parágrafo</p>
      {/* CSS Inline */}
      <p style={{
        color: "blue",
        padding: "25px",
        borderTop: "2px solid red"
      }}>
        Parágrafo Inline
      </p>
      {/* CSS Inline Dinâmico */}
      <p style={n < 10 ? {color: "purple"} : {color: "pink"}}>
        Parágrafo Inline Dinâmico
      </p>
      <p style={n > 10 ? {color: "purple"} : {color: "pink"}}>
        Parágrafo Inline Dinâmico
      </p>
      {/* Classe Dinâmica */}
      <h2 className={titulo ? 'titulo1' : 'titulo2'}>Classe Dinâmica</h2>
      <h2 className={!titulo ? 'titulo1' : 'titulo2'}>Classe Dinâmica</h2>
      {/* CSS Module */}
      <Title />
    </div>
  )
}

export default App
