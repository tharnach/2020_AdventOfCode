import fs from 'fs'
import chalk from 'chalk'

// const stringArray = [fs.readFileSync('./data2.txt').toString().split("\r\n")[0]]; // single line debug
const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/* takes an array of instructions and an array of the range and finds
* the row or column of a seat using "binary space partitioning" (or, what I call, boundary-squashing)
* returns a range (two element array) where the numbers should be equal
*
* instructions is an array like ['F','B','B','F','F','F','B'] or ['R', 'R', 'L']
* range is a two dimensional array like [0-127] or [0-7]
*/
const myReducer = (instructions, range) => {
  return instructions.reduce((accumulator, currentValue) => {
    if (currentValue === 'F' || currentValue === 'L') {
      return [accumulator[0], accumulator[1] - Math.ceil((accumulator[1] - accumulator[0]) / 2)]
    }
    if (currentValue === 'B' || currentValue === 'R') {
      return [Math.ceil((accumulator[1] - accumulator[0]) / 2) + accumulator[0], accumulator[1]]
    }
  }, range)
}

const arrayOfSeatIds = stringArray.map(seat => {
  const rowInstruction = (seat.substring(0, 7)).split('') // grabs the first 7 characters off of the instruction string
  const columnInstruction = (seat.substring(7)).split('') // grabs the last 3 characters off of the instruction string
  const row = myReducer(rowInstruction, [0, 127])[0] // the return value is an array of two elements that are both the row position, just need one
  const column = myReducer(columnInstruction, [0, 7])[0] // the return value is an array of two elements that are both the column position, just need one
  const seatId = (row * 8) + column // finds the seat ID
  
  // console.log(`Row: ${row}`)
  // console.log(`Column: ${column}`)
  // console.log(`Seat ID: ${seatId}`)
  return Number(seatId)
})

// console.log(`arrayOfSeatIds: ${arrayOfSeatIds.sort((a, b) => a - b)}`)
// PART 1: highest seat id is last item in this sorted array
console.log(`Highest Seat ID in my list: ${chalk.magenta(arrayOfSeatIds.sort((a, b) => a - b)[arrayOfSeatIds.length - 1])}`)

// creates array of all possible IDs
const arrayOfAllSeatIds = []
for( let i = 0; i < 128; i++) {
  for (let j = 0; j < 8; j++) {
    arrayOfAllSeatIds.push((i*8)+j)
  }
}

// creates array of IDs that are missing from my given list
const missingIds = []
for( let i = 0; i < arrayOfAllSeatIds.length; i++) {
  if(!arrayOfSeatIds.includes(arrayOfAllSeatIds[i])) {
    missingIds.push(arrayOfAllSeatIds[i])
  }
}

// finds the first non-consecutive number
const trimAtIndexMinusOne = missingIds.reduce((acc, curr) => {
  if(acc === curr - 1) {
    return curr
  } else {
    return acc
  }
}, 0)

// the first missing number was 20, at index 21, so we know the next number is ours.
// now we just slice it out of the missing ids list
const mine = missingIds.slice(trimAtIndexMinusOne + 1, trimAtIndexMinusOne + 2)
console.log(`My Seat ID: ${chalk.cyan(mine)}`) // my seat id is 671