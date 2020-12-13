import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/////////////////////////////////////////////////////////////////////////////////////
// PART 1

const indiciesExecuted = []
let accumulator = 0

const execute = index => {
  const line = stringArray[index]
  const [command, arg] = line.split(' ')
  if(!indiciesExecuted.includes(index)){
    indiciesExecuted.push(index)
    switch(command) {
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
    console.log(chalk.magenta(`accumulator: ${accumulator}`))
    run = false
  }
}

let currentIndex = 0
let run = true
while(run) {
  execute(currentIndex)
}