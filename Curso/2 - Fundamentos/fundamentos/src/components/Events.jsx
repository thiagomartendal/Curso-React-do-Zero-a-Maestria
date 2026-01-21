const Events = () => {
    const handleEvent = () => {
        alert('Ativou o evento!')
    }

    const renderizar = (x) => {
        if (x) {
            return <h1>Bloco 1</h1>
        } else {
            return <h1>Bloco 2</h1>
        }
    }

    return (
        <div>
            <div>
                <button onClick={handleEvent}>
                    Clique aqui!
                </button>
            </div>
            <br />
            <div>
                <button onClick={() => alert('Ativou o evento!')}>
                    Clique aqui!
                </button>
            </div>
            <br />
            <div>
                <button onClick={() => {
                    if (true)
                        alert('Bloco de função inline excessivo.')
                }}>
                    Clique aqui!
                </button>
            </div>
            {renderizar(true)}
        </div>
    )
}

export default Events