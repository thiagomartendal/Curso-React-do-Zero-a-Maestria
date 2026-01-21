import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
        {/* Links que não recarregam página ao clicar */}
        {/* <Link to="/">Início</Link>
        <Link to="/about">Sobre</Link> */}
        {/* <NavLink to="/" className={({isActive}) => (isActive ? 'ativo' : 'não ativo')}>Início</NavLink> */} {/* Utiliza-se quando não deve-se utilizar a classe .active, mas deve-se aplicar em todos os links */}
        <NavLink to="/">Início</NavLink>
        <NavLink to="/about">Sobre</NavLink>
    </nav>
  )
}

export default Navbar