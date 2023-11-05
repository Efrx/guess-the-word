/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Children, useEffect, useState } from 'react'
import './App.css'

const WORDS_LIST = [
  {
    word: 'Andar',
    clue: ['🚶‍♂️', '🚶‍♀️', '🏃‍♂️'],
  },
  {
    word: 'Cerca',
    clue: ['🏡', '🌳', '🚧'],
  },
  {
    word: 'Mal',
    clue: ['😞', '🤕', '👎'],
  },
  {
    word: 'Casco',
    clue: ['⛑️', '🚴', '🏍️'],
  },
  {
    word: 'Aceite',
    clue: ['🍶', '🍳', '🍟'],
  },
  {
    word: 'Gusto',
    clue: ['😋', '🍦', '🍔'],
  },
  {
    word: 'Sur',
    clue: ['⬇', '🗺', '🏄‍♀️'],
  },
  {
    word: 'Cuba',
    clue: ['CU', '🌴', '🎶'],
  },
  {
    word: 'Tejer',
    clue: ['🧶', '🕸', '👚'],
  },
  {
    word: 'Sonrisa',
    clue: ['😃', '🌞', '🎉'],
  },
  {
    word: 'Musica',
    clue: ['🎵', '🎶', '🎸'],
  },
  {
    word: 'Viajar',
    clue: ['✈️', '🌍', '🌴'],
  },
  {
    word: 'Pizza',
    clue: ['🍕', '🍽️', '🇮🇹'],
  },
  {
    word: 'Futbol',
    clue: ['⚽', '🥅', '🏆'],
  },
  {
    word: 'Libro',
    clue: ['📚', '📖', '🤓'],
  },
  {
    word: 'Amor',
    clue: ['❤️', '😍', '💑'],
  },
  {
    word: 'Playa',
    clue: ['🏖️', '🌊', '☀️'],
  },
  {
    word: 'Fiesta',
    clue: ['🎉', '🥳', '🍾'],
  },
]

const Input = ({ word, updateWordBoard, updateFailList, failTries}) => {
  const checkIsFail = (array,inValue) => {
    const upperArray = [...array]
    const upperInValue = inValue.toUpperCase()

    upperArray.map((char,index)=>{
      upperArray[index] = char.toUpperCase()
    })
    // console.log(upperArray)
    // console.log(inValue.toUpperCase())
    if(upperArray.includes(upperInValue)){
      return false
    }
    return true
  }
  const handleKeyPress = (character) => {
    const indexes = []
    const arrayWord = word.split('')

    console.log(character)
    console.log(word)
    
    arrayWord.map((char, index)=>{
      if(char.toUpperCase() === character.toUpperCase()) {
        indexes.push(index)
      }
    })
    if(checkIsFail(arrayWord,character)) {
      console.log('mal en component',arrayWord)
      console.log(character)
      updateFailList(character)
    }
    updateWordBoard(indexes)
  }

  return(
    <input type="text" onKeyUp={(event) => {
      handleKeyPress(event.target.value)
      event.target.value = ''
      event.preventDefault()
    }} />
  )
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

function App() {
  const [indexWord, setIndexWord]=useState(null)
  const [wordBoard, setWordBoard]=useState([])
  const [word, setWord]=useState('')
  const[failTries, setFailTries]=useState([])
  // useState TriesCount(word.length)
  const[triesCount, setTriesCount]=useState(null)
  /* useState checkIsOver() 
      ↪ puede ser true(ganaste)
        puede ser false(perdiste) */
  const[checkIsOver, setCheckIsOver]=useState(null)
  
  const checkWinnerLoser = (boardToCheck) => {
    if (!boardToCheck.includes(false)) {
      // ganaste
      return true
    }
    if (triesCount !== null && 
        failTries.length === triesCount) {
      // perdiste
      return false
    }
    return null
  }

  const updateFailList = (characterToAdd) =>{
    const newTries = [...failTries]
    newTries.push(characterToAdd)
    setFailTries(newTries)
  }

  const getRandom = () => {
    setIndexWord(getRandomInt(WORDS_LIST.length))
    const newRandomIndex = getRandomInt(WORDS_LIST.length)

    setIndexWord(newRandomIndex)
    setWordBoard(Array((WORDS_LIST[newRandomIndex].word).length).fill(false))
    setWord(WORDS_LIST[newRandomIndex].word)
    setFailTries([])
    setTriesCount(WORDS_LIST[newRandomIndex].word.length)
    setCheckIsOver(null)

    console.log('rand i ->', newRandomIndex)
    console.log('index word ->',indexWord)
    console.log('palabra -> ',word)
  }

  const updateWordBoard = (indexFounded) => {
    if(checkIsOver != null) return

    const newWordBoard = [...wordBoard]
    indexFounded.map((_, index)=>{
      newWordBoard[indexFounded[index]] = true
    })
    setWordBoard(newWordBoard)

    let count = triesCount
    if(count != null) {
      count = count-failTries.length
    }
    console.log(newWordBoard)
    const gameStatus = checkWinnerLoser(newWordBoard)
    if (gameStatus != null){
      setCheckIsOver(gameStatus)
      if(gameStatus === true){
        // alert('you won')
        setCheckIsOver(true)
      }
      if(gameStatus === false){
        // alert('you lose')
        setCheckIsOver(false)

      }
    }
  }
  // TODO: CheckWinner(wordBoard)
  return(
    <main>  
      <section className='board-game-section'>
        <h1>Guess the Word</h1>
        <span>{indexWord ? WORDS_LIST[indexWord].clue :   indexWord}</span>
        <section className='game-answer'>
        {
          wordBoard.map((_, index) => {
            return(
              <span 
                key={index} >
                  {wordBoard[index] ? word.split('')[index] : '➖' }
              </span>
            )
          })
        }
        </section>
        
        <section className='game-status'>
          <p><strong> FAILS ➡ </strong>{failTries}</p>
        </section>

        <section className='game-word-input-container' >
          {
            indexWord ? 
            <Input
              word={word}
              updateWordBoard={updateWordBoard}
              updateFailList={updateFailList}
              failTries={failTries}
            /> 
            : ''
          }
        </section>

        <section className='game-options'>
          <button onClick={getRandom} >{ indexWord ? 'Restart' :  'Start Game'}</button>
        </section>
      </section>
      {
        checkIsOver !== null && (
          <section className='game-over'>
            <div className="text">
              <h2>
                {
                  checkIsOver === false
                    ? 'you spend your tries 😥'
                    : 'you are right 😎'
                }
              </h2>

              <footer>
                <button onClick={getRandom} >
                  Play Again{' ▶'}
                  </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
