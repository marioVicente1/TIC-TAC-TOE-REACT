import { WinnerCombos } from "../../constant"

export const checkWinner = (boardToCheck)=> {
   // review all combinations winners  to show the winner
   for (const combo of WinnerCombos ) {
     const [a, b, c] = combo
     if (
       boardToCheck[a] && 
       boardToCheck[a] === boardToCheck[b] &&
       boardToCheck[a] === boardToCheck[c]
     ) {
       return  boardToCheck[a]
     }
     
   }
   // if there isn't winner
   return null
 }
 

 export const checKEndGame = (newBoard) => {
   /* review if there is a tie 
   if there isn't more empty space in the board */
   return newBoard.every((Square) => Square !== null)
 }