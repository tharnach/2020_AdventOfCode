import fs from 'fs'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/* takes an array of instructions and an array of the range and finds
* the row or column of a seat using "binary space partitioning"
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

const highestSeatId = stringArray.reduce((acc, curr) => {
  const rowInstruction = (curr.substring(0, 7)).split('') // grabs the first 7 characters off of the instruction string
  const columnInstruction = (curr.substring(7)).split('') // grabs the last 3 characters off of the instruction string
  const row = myReducer(rowInstruction, [0, 127])[0] // the return value is an array of two elements that are both the row position, just need one
  const column = myReducer(columnInstruction, [0, 7])[0] // the return value is an array of two elements that are both the column position, just need one
  const seatId = (row * 8) + column // finds the seat ID
  
  // console.log(`Row: ${row}`)
  // console.log(`Column: ${column}`)
  // console.log(`Seat ID: ${seatId}`)
  return acc > seatId ? acc : seatId // return the higher of the two values
}, 0)

console.log(`Highest Seat ID in my list: ${highestSeatId}`)