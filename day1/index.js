import fs from 'fs'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings
const numberArray = stringArray.map(item => Number(item)) // convert array to Numbers

for(let i = 0; i < numberArray.length; i++){
  for(let j = 0; j < numberArray.length; j++){
    if(numberArray[i] + numberArray[j] === 2020) {
      // two solutions are found, i * j, and j * i where they both equal 2020
      console.log(`Found: ${numberArray[i]} + ${numberArray[j]} = ${numberArray[i] * numberArray[j]}`)
    }
  }
}