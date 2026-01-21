import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
    const {user} = useSelector((state) => state.auth)

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setAuth(user ? true : false) // Caso o usuário esteja definido, a autenticação é válida
        setLoading(false)
    }, [user])

    return {auth, loading}
}