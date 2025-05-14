import {useState, useEffect} from 'react'
import Die from './components/Die'
import { generateAllNewDice } from './utils'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';

function App() {


  const [dice, setDice]= useState(()=> generateAllNewDice())

  const isGameWon= dice.every(die => die.isHeld && die.value === dice[0].value)

  const diceElements= dice.map(die=>{
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={()=> hold(die.id)}  isGameWon={isGameWon}/>
  })

  const { width, height } = useWindowSize(); 

  //-------  Logic to stop confetti after some seconds
  
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (isGameWon) {
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7500); // Stop after 7.5 seconds
  
      return () => clearTimeout(timer); // Clean up on unmount or rerun
    }
  }, [isGameWon]);

  // console.log(dice)
  // console.log(showConfetti)
  // console.log(isGameWon)
  
  //-----------------------------------------------------

  function rollDie(){
    if(isGameWon){
      setDice(generateAllNewDice())
    }
    else{
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld? die : {...die, value: Math.ceil(Math.random()*6)}
        })
      })
    }
  }

  function hold(id){
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id?  
              {...die, isHeld: !die.isHeld} : 
              die 

        // if(die.id === id){
        //   return {...die, isHeld: !die.isHeld}
        // }
        // else{
        //   return die
        // }
      })
    })
  }

  return (
    <>
    <div 
      className={`status-container ${isGameWon? "win-status": ""}`}
      style={{
        visibility: showConfetti? "visible": "hidden"
      }}
    >
        Tenzies!!! You Won!!
    </div>

    <main className="tenzies-main">
      {showConfetti &&  <Confetti width={width} height={height} />}

      <header>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header> 
     
      <div className="dice-container">
        {diceElements}
      </div>

      <button className='roll-dice' onClick={rollDie}> {isGameWon ? "New Game" : "Roll"}</button>
    </main>
    </>
    
  )
}

export default App
