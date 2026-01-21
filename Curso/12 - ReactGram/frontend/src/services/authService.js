import {api, requestConfig} from '../utils/config'

// Registrar usuário

const register = async (data) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/users/register', config)
            .then((res) => res.json())
            .catch((err) => err)
        
        if (res)
            // Salva os dados na localStorage para se extrair no futuro
            localStorage.setItem('user', JSON.stringify(res))
        
        return res
    } catch (error) {
        console.log(error)
    }
}

// Logout
const logout = () => {
    localStorage.removeItem('user')
}

// Login
const login = async (data) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/users/login', config)
                            .then((res) => res.json())
                            .catch((err) => err)
        
        if (res._id) // Caso recebe uma resposta com _id do usuário, salva o token do usuário no armazenamento local do navegador
            localStorage.setItem('user', JSON.stringify(res)) // Salva o usuário no armazenamento local do navegador

        return res
    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService
