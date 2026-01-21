// 4 - Importação de componente
import FirstComponent from './components/FirstComponent'

// 5 - Desestruturando Props
import SecondComponent from './components/SecondComponent'
import Destructuring, {Category} from './components/Destructuring'

// 6 - useState
import State from './components/State'

// 9 - Contexto
import { createContext } from 'react'

// 10 - Consumindo Contexto
import Context from './components/Context'

// 8 - type
type textOrNull = string | null
type fixed = 'Isso' | 'Ou' | 'Aquilo'

// 9 - Contexto
interface IAppContext { // I maiúsculo a frente para definir o nome da interface
  language: string,
  framework: string,
  projects: number
}

export const AppContext = createContext<IAppContext | null>(null)

function App() {
  // 1 - Variáveis
  const name: string = 'Tony'
  const age: number = 28
  const isWorking: boolean = true

  // 2 - Funções
  const userGreeting = (name: string): string => {
    return `Olá, ${name}.`
  }

  // 8 - type
  const myText:textOrNull = 'Tem algum texto aqui'
  let mySecondText:textOrNull = null

  mySecondText = 'Texto 2'

  // const testFixed:fixed = 'abc' // Não permite valores fora dos fixados na atribuição de fixed acima
  const testFixed:fixed = 'Isso'

  // 9 - Context
  const contextValue:IAppContext = {
    language: 'JavaScript',
    framework: 'Express',
    projects: 5
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <h1>TypeScript com React</h1>
        <h2>Nome: {name}</h2>
        <p>Idade: {age}</p>
        {isWorking ? (
          <p>Está trabalhando.</p>
        ) : (
          <p>Não está trabalhando.</p>
        )}
        <h3>{userGreeting(name)}</h3>
        <FirstComponent />
        <SecondComponent name={name} />
        <Destructuring title="Primeiro post" content="Algum conteúdo" commentsQty={10} tags={['ts', 'js']} category={Category.TS} />
        <Destructuring title="Segundo post" content="Mais outro conteúdo" commentsQty={5} tags={['c++']} category={Category.C} />
        <State />
        {myText && <p>{myText}</p>}
        {mySecondText && <p>{mySecondText}</p>}
        {testFixed}
        <Context />
      </div>
    </AppContext.Provider>
  )
}

export default App
