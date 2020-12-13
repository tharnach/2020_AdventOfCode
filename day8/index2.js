import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

let indicesExecuted = []
const indicesOfOperationsFlipped = []
let flipped = false
let accumulator = 0

const execute = index => {
  if (index  < stringArray.length) {
    const line = stringArray[index]
    const [command, arg] = line.split(' ')
    let newCommand = command
    if (!flipped && !indicesOfOperationsFlipped.includes(index)) {
      indicesOfOperationsFlipped.push(index)
      flipped = true
      // console.log(`flipping at ${index}`)
      if (command.includes('nop')) {
        newCommand = 'jmp'
      } else if (command.includes('jmp')) {
        newCommand = 'nop'
      }
    }
    if (!indicesExecuted.includes(index)) {
      indicesExecuted.push(index)
      switch (newCommand) {
        case 'nop':
          return currentIndex = currentIndex + 1
        case 'acc':
          accumulator = accumulator + Number(arg)
          return currentIndex = currentIndex + 1
        case 'jmp':
          return currentIndex = currentIndex + Number(arg)
        default:
          console.log('broke')
          return
      }
    } else {
      // console.log(chalk.red(`INFINITE LOOP ENCOUNTERED @ ${index}`))
      // console.log(chalk.cyan(`${JSON.stringify(indicesOfOperationsFlipped, null, 2)}`))
      // reset program to initial values
      flipped = false
      indicesExecuted = []
      accumulator = 0
      currentIndex = 0
    }
  } else {
    console.log(chalk.green(`PROGRAM FINISHED`))
    console.log(chalk.magenta(`accumulator: ${accumulator}`))
    run = false
  }  
}

let currentIndex = 0
let run = true
while(run) {
  execute(currentIndex)
}