import { useState } from 'react'
import './Form.css'

const Form = ({usr}) => {
    // Gerenciamento de Dados
    const [nome, setNome] = useState(usr ? usr.nome : '')
    const [email, setEmail] = useState(usr ? usr.email : '')
    const [bio, setBio] = useState(usr ? usr.bio : '')
    const [funcao, setFuncao] = useState(usr ? usr.funcao : 'selecione')
    const acaoNome = (e) => {
        setNome(e.target.value)
    }
    const enviar = (e) => {
        e.preventDefault()
        console.log(nome, email, bio, funcao)
        // Limpa o formulário
        setNome('')
        setEmail('')
        setBio('')
        setFuncao('selecione')
    }
    const restaurar = () => {
        setNome(usr.nome)
        setEmail(usr.email)
        setBio(usr.bio)
        setFuncao(usr.funcao)
    }
    // Controlled Input: inputs recebem como valor uma variável ou um estado
    return (
        <div>
            {/* Formulário */}
            {/* Envio do formulário */}
            <form onSubmit={enviar}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" value={nome} placeholder="Digite seu nome" onChange={acaoNome} />
                </div>
                {/* Label envolvendo input */}
                <label>
                    <span>Email</span>
                    {/* Mudança de estado inline */}
                    <input type="email" name="email" value={email} placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                {/* Textarea */}
                <label>
                    <span>Bio</span>
                    <textarea name="bio" placeholder="Descrição do usuário" onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                </label>
                {/* Select */}
                <label>
                    <span>Função no sistema</span>
                    <select name="funcao" onChange={(e) => setFuncao(e.target.value)} value={funcao}>
                        <option value="selecione">Selecione</option>
                        <option value="usuario">Usuário</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                </label>
                <input type="submit" value="Enviar" />
                <input type="button" value="Restaurar" onClick={restaurar} />
            </form>
        </div>
    )
}

export default Form