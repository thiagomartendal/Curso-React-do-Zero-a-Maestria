const Chellenge = () => {
    const n1 = 10
    const n2 = 20
    const soma = () => {
        console.log(n1+n2)
    }
    return (
        <div>
            <div>
                <h2>Valor 1: {n1}</h2>
                <h2>Valor 2: {n2}</h2>
            </div>
            <div>
                <button onClick={soma}>
                    Somar valores
                </button>
            </div>
        </div>
    )
}

export default Chellenge