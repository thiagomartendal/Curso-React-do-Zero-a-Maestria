import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Componentes
import Navbar from './components/Navbar'
import SearchForm from './components/SearchForm'

// Páginas
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Info from './pages/Info'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

// Css
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
        <Navbar /> {/* Deve estar dentro da tag BrowserRouter pois é um componente da lógica de rotas */}
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/:id/info" element={<Info />} />
          <Route path="/search" element={<Search />} />
          <Route path="/company" element={<Navigate to="/about" />} /> {/* Redirecionamento */}
          <Route path="*" element={<NotFound />} /> {/* Página de Erro */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
