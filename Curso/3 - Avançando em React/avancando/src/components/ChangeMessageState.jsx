const ChangeMessageState = ({setMensagem}) => {
    const mensagem = ['Oi', 'Olá', 'Oi, tudo bem?']
    return (
        <div>
            <button onClick={() => setMensagem(mensagem[0])}>1</button>
            <button onClick={() => setMensagem(mensagem[1])}>2</button>
            <button onClick={() => setMensagem(mensagem[2])}>3</button>
        </div>
    )
}

export default ChangeMessageState