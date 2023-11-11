import React, { Children } from 'react'
import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS} from './constant'
import { checkWinner, checKEndGame } from './assets/logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './assets/logic/storage'


 

export const App = () => {

  const [board, setboard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

 

  const resetGame = ()=> {
    setboard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()


  }
  
// dont overwrite
  const updateBoard = (index) => {
    // dont update this position if already  is t yped or if already a winner
    if (board[index] || winner) return
    // update board
    const newBoard = [... board]
    newBoard[index] = turn
    setboard(newBoard)
    // chance turn
    const newTurn = turn === TURNS.X ? TURNS.O :TURNS.X
    setTurn(newTurn) 
    //save the game
   
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // review if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner) 
    } else if (checKEndGame (newBoard)) {
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame} >Reset Game</button>
      <section className='game'> 
        {
          board.map((_, index) => {
            return (
              <Square
                key= {index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
                
              </Square>
            )
          })
        }
       </section>

       <section className='turn'>
        <Square   isSelected={ turn === TURNS.X }> {TURNS.X} </Square>
        <Square isSelected={ turn === TURNS.O }> {TURNS.O} </Square>
       </section>

       <WinnerModal winner={winner} resetGame={resetGame}/>

      
    </main>

  )
}
