const Container = ({children, prg}) => {
    return (
        <div>
            <h2>Container</h2>
            {children} {/* Exibe HTML interno da tag <Container></Container> */}
            <p>{prg}</p>
        </div>
    )
}

export default Container