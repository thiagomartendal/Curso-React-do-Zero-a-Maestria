import { useEffect, useRef, useDebugValue } from "react"

export const usePrevious = (value) => {
    const ref = useRef()

    // Aula useDebugValue
    useDebugValue('Custom Hook e useDebugValue')
    useDebugValue('O número anterior é: ' + value)

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}