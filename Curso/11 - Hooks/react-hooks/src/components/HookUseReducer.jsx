import { useReducer, useState } from "react"

const HookUseReducer = () => {
    // 1 - Começando com o useReducer
    const [number, dispatch] = useReducer((state, action) => {
        // dispatch => onde será executada a função para alterar o valor do number
        // state => valor atual de number
        return Math.random(state)
    })

    // 2 - Avançando no useReducer
    const initialTasks = [
        {id: 1, text: 'Fazer alguma coisa'},
        {id: 2, text: 'Fazer outra coisa'}
    ]

    const taskReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                const newTask = {
                    id: Math.random(),
                    text: taskText
                }
                setTaskText('')
                return [...state, newTask]
            case 'DELETE':
                return state.filter((task) => task.id !== action.id)
            default:
                return state
        }
    }

    const [taskText, setTaskText] = useState('')
    const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatchTasks({type: 'ADD'})
    }

    const removeTask = (id) => {
        dispatchTasks({type: 'DELETE', id: id})
    }

    return (
        <div>
            <h2>useReducer</h2>
            <p>Número: {number}</p>
            <button onClick={dispatch}>Alterar número</button>
            <h3>Tarefas:</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
                <input type="submit" value="Enviar" />
            </form>
            {
                tasks.map((task) => (
                    <li key={task.id} onDoubleClick={() => removeTask(task.id)}>{task.text}</li>
                )) 
            }
            <hr />
        </div>
    )
}

export default HookUseReducer