import { useState } from "react"

const ExecuteFunction = ({funcao}) => {
    const [retorno, setRetorno] = useState('')
    const clique = () => {
        setRetorno((retorno == '') ? funcao : '')
    }
    return (
        <div>
            <button onClick={clique}>Clique aqui</button>
            <h2>{retorno}</h2>
        </div>
    )
}

export default ExecuteFunction