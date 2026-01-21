import { useStat, useState } from 'react'

const ManageData = () => {
    const [valor, setValor] = useState(10)
    const alterarValor = () => {
        setValor((valor == 10) ? 15 : 10)
    }
    return (
        <div>
            <div>
                <p>Valor: {valor}</p>
                <button onClick={alterarValor}>
                    Mudar valor
                </button>
            </div>
        </div>
    )
}

export default ManageData