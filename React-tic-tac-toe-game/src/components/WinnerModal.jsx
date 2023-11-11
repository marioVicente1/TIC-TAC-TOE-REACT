import { Square } from "./Square"


export const WinnerModal = ({winner, resetGame}) => {
  
   if (winner === null) return null

   const winnerText =   winner === false
                     ? 'Tie'
                     : 'Winner:'

  return (
    
       <section className='winner'> 
        <div className='text'>
          {
           winnerText 
          }
          <header className='win'>
            { <Square> {winner} </Square>}

          </header>

          <footer>
            <button onClick={resetGame}>  Play again </button>
          </footer>

        </div>

       </section>

      
      
    

  )
}
