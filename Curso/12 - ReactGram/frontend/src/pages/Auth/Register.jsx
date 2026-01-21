import './Auth.css'

// Componentes
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useState, useEffect } from 'react'

// Redux
import { register, reset } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        dispatch(register(user))
    }

    // Limpa todos os estados
    useEffect(() => {
        dispatch(reset()) // Faz a limpeza
    }, [dispatch])

    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name || ""} placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                <input type="email" value={email || ""} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password || ""} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" value={confirmPassword || ""} placeholder="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)} />
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </div>
    )
}

export default Register