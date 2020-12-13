import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/////////////////////////////////////////////////////////////////////////////////////
// PART 1

let currentEvalIndex = 25
let run = true

const executeLoop = (evalIndex) => {
  // console.log(chalk.green(`[${evalIndex}] - ${stringArray[evalIndex]}`))
  loop1:
  for (let i = (evalIndex - 25); i < evalIndex; i = i + 1) {
    loop2:
    for (let j = (evalIndex - 25); j < evalIndex; j = j + 1) {
      if (i != j) {
        const num1 = Number(stringArray[i])
        const num2 = Number(stringArray[j])
        // console.log(chalk.magenta(`${num1} + ${num2} = ${num1 + num2} --- [${evalIndex}] - ${stringArray[evalIndex]}`))
        if ((num1 + num2) == stringArray[evalIndex]) {
          // console.log(chalk.white.bgCyan('~~~~POP~~~~'))
          currentEvalIndex = currentEvalIndex + 1
          break loop1
        }
        if (i == (evalIndex - 1) && j == (evalIndex - 2)) {
          run = false
          const theTwentyFive = stringArray.slice(evalIndex - 25, evalIndex)
          console.log(chalk.cyan(`theTwentyFive: ${JSON.stringify(theTwentyFive, null, 2)}`))
          console.log(chalk.red(`Found: [${evalIndex}] - ${stringArray[evalIndex]}`))
          break loop1
        }
      }
    }
  }
}

while(run) {
  executeLoop(currentEvalIndex)
}