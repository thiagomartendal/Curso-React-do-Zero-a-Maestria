// CSS
import styles from './App.module.css'

// Componentes
import Footer from './components/Footer'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Modal from './components/Modal'

// Hooks
import { useState } from 'react'

// Interfaces
import { ITask } from './interfaces/Task'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const showOrHideModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display)
      modal!.classList.remove('hide')
    else
      modal!.classList.add('hide')
  }

  const editTask = (task: ITask): void => {
    showOrHideModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updatedItems)

    showOrHideModal(false)
  }

  return (
    <div>
      <Modal children={<TaskForm btnText="Editar Tarefa" task={taskToUpdate} taskList={taskList} handleUpdate={updateTask} />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
