import { useEffect, useState } from "react"

const HookUseEffect = () => {
    // 1 - useEffect sem dependências
    useEffect(() => {
        // useEffect sem dependências executa sempre que o componente é renderizado
        console.log('Estou sendo executado')
    })

    const [number, setNumber] = useState(1)

    const changeSomething = () => {
        setNumber(number + 1)
    }

    // 2 - Array de dependências vazio
    useEffect(() => {
        // useEffect com o array de dependências vazio executa uma única vez
        console.log('Serei executado apenas uma vez')
    }, [])

    // 3 - Item no array de dependências
    const [anotherNumber, setAnotherNumber] = useState(0)
    useEffect(() => {
        // useEffect com o array de dependências preenchido executa sempre que uma das variáveis da dependência é modificada
        if (anotherNumber > 0)
            console.log('Sou executado apenas quando o anotherNumber muda')
    }, [anotherNumber])

    // 4 - Limpeza do useEffec
    useEffect(() => {
        // const timer = setTimeout(() => {
        //     console.log('Olá Mundo!')
        // }, 2000)

        // return () => clearTimeout(timer) // A limpeza ocorre aqui
    }, [anotherNumber])

    return (
        <div>
            <h2>useEffect</h2>
            <p>Número: {number}</p>
            <button onClick={changeSomething}>Executar</button>
            <p>Outro número: {anotherNumber}</p>
            <button onClick={() => setAnotherNumber(anotherNumber + 1)}>Mudar o outro número</button>
            <hr />
        </div>
    )
}

export default HookUseEffect