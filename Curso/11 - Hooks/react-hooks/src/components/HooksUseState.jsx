import { useState } from "react"

const HooksUseState = () => {
    // 1 - useState
    let userName = 'Tony'
    const [name, setName] = useState('Tony')

    const changeNames = () => {
        userName = 'Tony Mário'
        setName('Tony Mário')
    }

    // 2 - useState e input
    const [age, setAge] = useState(18)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Envio de dados
        console.log(age)
    }

    return (
        <div>
            {/* 1 - useState */}
            <h2>useState</h2>
            <p>Variável: {userName}</p>
            <p>useState: {name}</p>
            <button onClick={changeNames}>Mudar nomes</button>
            {/* 2 - useState e input */}
            <p>Digite a sua idade:</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="submit" value="Enviar" />
            </form>
            <p>Você tem {age} anos.</p>
            <hr />
        </div>
    )
}

export default HooksUseState