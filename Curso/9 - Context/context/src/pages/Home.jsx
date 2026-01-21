import { Link } from "react-router-dom"
import { useCounterContext } from "../hooks/useCounterContext"
import { useTitleColorContext } from "../hooks/useTitleColorContext"
import ChangeCounter from "../components/ChangeCounter"
import './Home.css'

const Home = () => {
    const {counter} = useCounterContext()
    const {color, dispatch} = useTitleColorContext()
    const setTitleColor = (color) => {
        dispatch({type: color})
    }

    return (
        <div>
            <h1 style={{color: color}}>Home</h1>
            <p>Valor do contador: {counter}</p>
            <ChangeCounter />
            <br />
            <div>
                <button onClick={() => setTitleColor('RED')}>Vermelho</button>
                <span className="espaco"></span>
                <button onClick={() => setTitleColor('BLUE')}>Azul</button>
                <span className="espaco"></span>
                <button onClick={() => setTitleColor('')}>Roxo</button>
            </div>
        </div>
    )
}

export default Home