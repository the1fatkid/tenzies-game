
export default function Die({value, isHeld, hold, isGameWon}) {
  return (
   <button 
        className="dice" 
        disabled= {isGameWon}
        onClick={hold}
        style={{
            backgroundColor: isHeld? "#59E391":"white"
        }}
    >
        {value}
    </button>
  )
}
