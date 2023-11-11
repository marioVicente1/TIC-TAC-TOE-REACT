

export const resertGame = ()=> {
   setboard(Array(9).fill(null))
   setTurn(TURNS.X)
   setWinner(null)
 }
