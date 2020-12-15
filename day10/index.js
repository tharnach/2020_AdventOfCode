import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/////////////////////////////////////////////////////////////////////////////////////
// PART 1
/////////////////////////////////////////////////////////////////////////////////////


const numberArray = stringArray.map(item => Number(item))
numberArray.push(0)
// console.log(chalk.yellow(JSON.stringify(numberArray.sort(), null, 2)))
const sortedData = numberArray.sort((a, b) => a - b)
console.log(chalk.cyan(JSON.stringify(sortedData, null, 2)))

const oneJolt = []
const threeJolt = []
let oneJoltCount = 0
let threeJoltCount = 0

for (let i = 1; i < sortedData.length; i = i + 1) {
  if(sortedData[i] - sortedData[i - 1] === 3) {
    threeJolt.push(sortedData[i])
    threeJoltCount = threeJoltCount + 1
  } else if (sortedData[i] - sortedData[i - 1] === 1) {
    oneJolt.push(sortedData[i])
    oneJoltCount = oneJoltCount + 1
  // } else if (i === sortedData.length - 1) {
  //   console.log(chalk.red(`Hello?!`))
  //   threeJolt.push(sortedData[i] + 3)
  //   threeJoltCount = threeJoltCount + 1
  } else {
    console.log(chalk.red(`something went wrong...`))
    console.log(chalk.red(`${sortedData[i]} -- ${sortedData[i - 1]}`))
  }
}

threeJolt.push((sortedData[sortedData.length - 1]) + 3)
threeJoltCount = threeJoltCount + 1

console.log(chalk.green(`${oneJoltCount}`))
console.log(chalk.green(`${threeJoltCount}`))

console.log(chalk.yellow(`${JSON.stringify(oneJolt, null, 2)}`))
console.log(chalk.yellow(`${JSON.stringify(threeJolt, null, 2)}`))
console.log(chalk.magenta(`${oneJolt.length} * ${threeJolt.length}`))
console.log(chalk.magenta(oneJolt.length * threeJolt.length))


// 2700 too low