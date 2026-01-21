import { useState } from "react"

const ListRender = () => {
    const [cores1] = useState(['Azul', 'Amarelo', 'Verde', 'Vermelho'])
    const [cores2, setCor] = useState([
        {id: 1, cor: 'Azul'},
        {id: 2, cor: 'Amarelo'},
        {id: 3, cor: 'Verde'},
        {id: 4, cor: 'Vermelho'}
    ])
    const deletarCor = () => {
        const num = Math.floor(Math.random() * 5)
        setCor((corAnterior) => { // Previous State
            return corAnterior.filter((cor) => num !== cor.id)
        })
    }

    return (
        <div>
            <ul>
                {
                    cores1.map((item, i) => (
                        <li key={i}>
                            {item}
                        </li>
                    ))
                }
            </ul>
            <ul>
                {
                    cores2.map(item => (
                        <li key={item.id}>
                            {item.id} - {item.cor}
                        </li>
                    ))
                }
            </ul>
            <button onClick={deletarCor}>Deletar Cor</button>
        </div>
    )
}

export default ListRender