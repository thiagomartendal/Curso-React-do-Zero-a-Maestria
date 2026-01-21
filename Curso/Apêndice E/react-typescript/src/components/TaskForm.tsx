// CSS
import styles from './TaskForm.module.css'

// Hooks
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

// Interfaces
import { ITask } from '../interfaces/Task'

type Props = {
    btnText: string
    task?: ITask | null
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>> // ? indica que a propriedade pode ser enviada ou não para o componente
    handleUpdate?(id: number, title: string, difficulty: number): void
}

const TaskForm = ({btnText, task, taskList, setTaskList, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [difficulty, setDifficulty] = useState<number>(0)

    useEffect(() => {
        if(task) {
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    }, [task])

    const addTaskHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (handleUpdate)
            handleUpdate(id, title, difficulty)
        else {
            const id = Math.floor(Math.random() * 1000)

            const newTask:ITask = {id, title, difficulty}

            setTaskList!([...taskList, newTask]) // ! indica que a propriedade setTaskList estará disponível para uso

            setTitle('')
            setDifficulty(0)
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value:string = e.target.value
        if (e.target.name === 'title')
            setTitle(value)
        else
            setDifficulty(parseInt(value))
    }

    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input type="text" name="title" value={title} placeholder="Título da tarefa" onChange={handleChange} />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficult">Dificuldade:</label>
                <input type="text" name="difficult" value={difficulty} placeholder="Dificuldade da tarefa" onChange={handleChange} />
            </div>
            <input type="submit" value={btnText} />
        </form>
    )
}

export default TaskForm