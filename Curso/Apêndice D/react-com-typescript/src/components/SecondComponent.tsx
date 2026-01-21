type Props = {
    name: string
}

const SecondComponent = (props: Props) => {
    return (
        <div>
            <p>Meu segundo componente</p>
            <p>Nome: {props.name}</p>
        </div>
    )
}

export default SecondComponent