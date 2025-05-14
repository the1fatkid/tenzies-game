import {v4 as uuid} from 'uuid'

// Method 1:
export function generateAllNewDice1(){
    return Array.from({ length: 10 }).map(() => Math.floor(Math.random()*6) + 1)
}


//Method 2: 
export function generateAllNewDice(){
    // console.log("generateAllNewDice was called!")
    return new Array(10)
        .fill(0)
        .map(() => ({
            id: uuid(), 
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }))
}  


// Method 3:
export function generateAllNewDice3(){
    const newDice = []
      for (let i = 0; i < 10; i++) {
          const rand = Math.ceil(Math.random() * 6)
          newDice.push(rand)
      }
      return newDice
  }