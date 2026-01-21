import { useRef, useEffect, useState } from "react"

const HookUseRef = () => {
    // 1 - useRef
    const numberRef = useRef(0)
    const [counter, setCounter] = useState(0)
    const [counterB, setCounterB] = useState(0)

    useEffect(() => {
        numberRef.current = numberRef.current + 1
    })

    // 2 - useRef e DOM
    const inputRef = useRef()
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setText('')
        let valor = inputRef.current.value
        inputRef.current.focus()
        console.log(valor)
    }

    return (
        <div>
            <h2>useRef</h2>
            {/* 1 - useRef */}
            <p>O componente renderizou: {numberRef.current} vezes.</p>
            <p>Contador 1: {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>Contador A</button>
            <p>Contador 2: {counterB}</p>
            <button onClick={() => setCounterB(counterB + 1)}>Contador B</button>
            {/* 2 - useRef e DOM */}
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} ref={inputRef}  />
                <input type="submit" value="Enviar" />
            </form>
            <hr />
        </div>
    )
}

export default HookUseRef