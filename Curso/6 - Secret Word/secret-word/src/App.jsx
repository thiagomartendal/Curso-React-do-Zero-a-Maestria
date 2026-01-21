// React
import { useCallback, useEffect, useState } from 'react'

// CSS
import './App.css'

// Dados
import { wordsList } from './data/words'

// Componentes
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    // Selecionar categoria aleatoria
    const categories = Object.keys(words)
    let indexC = Math.floor(Math.random() * Object.keys(categories).length)
    const category = categories[indexC]
    // Selecionar palavra aleatoria
    let indexW = Math.floor(Math.random() * Object.keys(words[category]).length)
    const word = words[category][indexW]
    return {word, category}
  }, [words])

  // Inicia o jogo
  const startGame = useCallback(() => {
    // Limpa todas as letras
    clearLetterStates()
    // Selecionar palavra e selecionar categoria
    const {word, category} = pickWordAndCategory()
    // Forma o array de letras
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    // Iniciar estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    // Começa o jogo
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // Processa a entrada de letras
  const verifyLetter = (letter) => {
    // setGameStage(stages[2].name)
    const normalizedLetter = letter.toLowerCase()
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter))
      return
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Checa o total de tentativas
  useEffect(() => {
    if (guesses <= 0) { // Caso as tentativas acabem o jogo é encerrado
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses]) // Definir dependências no fim do useEffect reexecuta o hook quando a dependência é modificada

  // Checa a condição de vitória
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100)
      if (gameStage != 'start')
        startGame() // Reinicia o jogo
    }
  }, [guessedLetters, letters, startGame])

  // Reinicia o jogo
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
