import { useState } from 'react'
import Banco from '../assets/Banco.jpg'

const ConditionalRender = () => {
    const [x] = useState(true)
    return (
        <div>
            <h1>Parágrafo:</h1>
            {x && <p>Parágrafo verdadeiro</p>} {/* Condicional */}
            <h1>Imagem</h1>
            {x ? /* Ternário */
                <img src={Banco} alt="Banco" width="500" height="300" />
            :
                <img src="/Praia.jpg" alt="Praia" width="500" height="300" />
            }
        </div>
    )
}

export default ConditionalRender