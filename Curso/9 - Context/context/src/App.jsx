import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Componentes
import Navbar from './components/Navbar'

// Páginas
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

// Css
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
        <Navbar /> {/* Deve estar dentro da tag BrowserRouter pois é um componente da lógica de rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* Página de Erro */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
