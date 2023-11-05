/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// // import { useState } from 'react'
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
  const handleKeyPress = (character) => {
    const indexes = []
    const arrayWord = word.split('')
    toString()
    arrayWord.map((char, index)=>{
      if(char.toUpperCase() === character.toUpperCase()) {
        indexes.push(index)
      }
    })
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
  
  

  const updateFailList = (characterToAdd) =>{
    const newTries = [...failTries]
    newTries.push(characterToAdd)
    setFailTries(newTries)
    // console.log('first',newTries)
  }

  const getRandom = () => {
    setIndexWord(getRandomInt(WORDS_LIST.length))
    const newRandomIndex = getRandomInt(WORDS_LIST.length)

    setIndexWord(newRandomIndex)
    setWordBoard(Array((WORDS_LIST[newRandomIndex].word).length).fill(false))
    setWord(WORDS_LIST[newRandomIndex].word)
    setFailTries([])

    console.log('rand i ->', newRandomIndex)
    console.log('index word ->',indexWord)
    console.log('palabra -> ',word)
  }

  const updateWordBoard = (indexFounded) => {
    const newWordBoard = [...wordBoard]
    indexFounded.map((_, index)=>{
      newWordBoard[indexFounded[index]] = true
    })
    setWordBoard(newWordBoard)
  }

  return(
    <section className='board-game-section'>
      <h1>Guess the Word</h1>
      <span>{indexWord ? WORDS_LIST[indexWord].clue : indexWord}</span>
      {/* <span>{ WORDS_LIST[indexWord].clue }</span> */}
      <section className='game-answer'>
        {
          wordBoard.map((character, index) => {
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
        {/* {
          failTries.length > 0 ?
          failTries.map((char,index)=>{
            <p key={index} >{char}</p>
          }) : <p>you are doing well 🧐</p> 
        } */}
        <p><strong>FAILS ➡ </strong>{
          failTries
        }</p>
       {/* tries   -   mistakes */}
      </section>

      <section className='game-word-inputs-container' >
        {/* character inputs */}
        {
          indexWord ? 
          <Input
            word={word}
            updateWordBoard={updateWordBoard}
            updateFailList={updateFailList}
            failTries={failTries}
            // addMistake={checkMistake}
            // {...console.log(wordBoard)}
          /> 
          : ''
        }
      </section>

      <section className='game-options'>
        <button onClick={getRandom} >{ indexWord ? 'Restart' : 'Start Game'}</button>
        {/* random   -   reset */}
        
      </section>
    </section>
  )
}

export default App

// const [mapa, setMapa] = useState([])
//   const [palabra, setPalabra] = useState('')
//   const [estado,setEstado] = useState(false)

//   const getRandomInt = (max) => {
//     return Math.floor(Math.random() * max)
//   }

//   const newRandom = () => {
//     setPalabra(WORDS_LIST[getRandomInt(WORDS_LIST.length)].word)
//     setMapa(Array(palabra.length).fill(false))
//     console.log(mapa)
//     console.log(palabra)
//     console.log(estado)
//   }

//   const updateMapa = (index) => {
//     const newMapa = [...mapa]
//     newMapa[index] = estado
//     setMapa(newMapa)
//   }

//   const comparar = (value) => {
//     const palabraArray = palabra.split('')
//     for (let index = 0; index < palabraArray.length; index++) {
//       const element = palabraArray[index];
//       console.log(value)
//       console.log(element)
//       if (element == value) {
//         setEstado(true)
//         updateMapa(index)
//         console.log(mapa)
//         console.log(index)
//       }else{
//         setEstado(false)
//         console.log(mapa)
//       }
//     }
//   }



// mandar mapa como estado y palabra[index] como valor

// palabra.split('').map((char,index) => {
//   return(
//     <Letra key={index} estadoLetra={mapa[index]} valor={char} >
//     </Letra>
//   )
// })


{/* <input type="text" onKeyUp={(event)=>comparar(event.target.value)} /> */}


// const [newRandom, setNewRandom] = useState('')
//   const [isFilled, setIsFilled] = useState(false)
//   const [inputsArray, setInputsArray] = useState([''])

//   const getRandomInt = (max) => {
//     return Math.floor(Math.random() * max)
//   }

//   const handleKeyPress = (event,index) => {
//     console.log(isFilled)
//     console.log(newRandom[index])
//   }

//   const randomWord = () => {

//     setNewRandom(WORDS_LIST[getRandomInt(WORDS_LIST.length)].word)
//     // console.log(newRandom)
//     // console.log(getRandomInt(WORDS_LIST.length))

//     const inputsList = newRandom.split('')
//     inputsList.map((character, index) => {
//       inputsList[index] = character
//     })
//     setInputsArray(inputsList)
//     console.log(inputsList)
//   }

//   return (
//     <section className='board-game-section'>
//       <h1>Word Scramble</h1>
//       <section className="game-answer">
//       
//       {

//       }
//       </section>
//       <section className='game-status'>
//         <p><strong>tries</strong></p>
//         <p><strong>mistakes</strong></p>
//       {/* tries   -   mistakes */}
//       </section>
//       <section className='game-word-inputs-container' >
//         {/* character inputs */}
//         {
//           inputsArray.map((character, index) => (
//             <input /*className={isGuessed?'true':'false'}*/ 
//             key={index} 
//             type='text' 
//             onKeyUp={(event) => handleKeyPress(event,index)} >
//               {/* onKeyDownCapture */}
//             </input>
//           ))
//         }
//       </section>

//       <section className='game-options'>
//         <button onClick={randomWord} >Random</button>
//         <button>Restart</button>
//       {/* random   -   reset */}
//       </section>
//     </section>
//   )