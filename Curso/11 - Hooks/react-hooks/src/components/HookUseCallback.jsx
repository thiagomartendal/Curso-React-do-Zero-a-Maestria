import { useCallback, useState } from "react"

import List from "./List"

const HookUseCallback = () => {
    const [counter, setCounter] = useState(0)

    // useCallback também possui um array de dependências
    const getItensFromDatabase = useCallback(() => {
        return ['a', 'b', 'c']
    }, [])

    return (
        <div>
            <h2>useCallback</h2>
            <List getItens={getItensFromDatabase} />
            <button onClick={() => setCounter(counter + 1)}>Alterar</button>
            <p>{counter}</p>
            <hr />
        </div>
    )
}

export default HookUseCallback