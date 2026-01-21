// Aqui são feitas as configurações dos estados do redux

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../services/authService'

const user = JSON.parse(localStorage.getItem('user')) // Resgata o usuário salvo no armazenamento local do navegador

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
}

// Cadastrar usuário e fazer login
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    const data = await authService.register(user)

    // Checagem de erros
    if (data.errors)
        return thunkApi.rejectWithValue(data.errors[0])
    
    return data
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Login
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    const data = await authService.login(user)

    // Checagem de erros
    if (data.errors)
        return thunkApi.rejectWithValue(data.errors[0])
    
    return data
})

// Utiliza o redux para controlar os estados da aplicação
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => { // Requisição ainda não chegou
                state.loading = true
                state.error = false
            })
            .addCase(register.fulfilled, (state, action) => { // Operação concluída
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => { // Envia um erro que tenha ocorrido
                state.loading = false
                state.error = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => { // Operação concluída
                state.loading = false
                state.success = true
                state.error = null
                state.user = null
            })
            .addCase(login.pending, (state) => { // Requisição ainda não chegou
                state.loading = true
                state.error = false
            })
            .addCase(login.fulfilled, (state, action) => { // Operação concluída
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => { // Envia um erro que tenha ocorrido
                state.loading = false
                state.error = action.payload
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
