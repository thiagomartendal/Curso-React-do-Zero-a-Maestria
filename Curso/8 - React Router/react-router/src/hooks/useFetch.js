import { useState, useEffect } from 'react'

// Hook para requisições HTTP
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    // Refatorando o POST
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // Loading
    const [loading, setLoading] = useState(false)

    // Tratando erros
    const [error, setError] = useState(null)

    // Envia os dados
    const httpConfig = (data, method) => {
        if (method === 'POST') {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod('POST')
        } else if (method === 'DELETE') {
            setConfig({
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            setMethod('DELETE')
            setItemId(data)
        }
    }

    // Recupera os dados
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
                setMethod(null)
                setError(null)
            } catch(error) {
                setError('Houve um erro ao carregar os dados.')
            }
            setLoading(false)
        }
        fetchData()
    }, [url, callFetch]) // Definir dependências no fim do useEffect reexecuta o hook quando a dependência é modificada
    
    // Refatorando o POST
    useEffect(() => {
        const httpRequest = async () => {
            if (method === 'POST') {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
            } else if (method === 'DELETE') {
                const deleteUrl = `${url}/${itemId}`
                const res = await fetch(deleteUrl, config)
                const json = await res.json()
                setCallFetch(json)
            }
        }
        httpRequest()
    }, [config, method, url])
    
    return {data, httpConfig, loading, error}
}