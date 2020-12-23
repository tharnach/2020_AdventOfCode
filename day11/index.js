import fs from 'fs'
import chalk from 'chalk'
import isEqual from 'lodash.isequal'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

const twoDimensionalArray = stringArray.map(line => line.split(''))
// console.log(chalk.cyan(JSON.stringify(twoDimensionalArray, null, 2)))

const reducer = (acc, curr) => curr == '#' ? acc + 1 : acc

let iterationResults = []
let previousResults = twoDimensionalArray
let noChanges = false

const evaluateSeat = (i, i_length, j, j_length) => {
  // console.log(chalk.bgYellow.black(`i: ${i} - j: ${j}`))
  // console.log(`previousResults[i][j]: ${previousResults[i][j]}`)
  if(previousResults[i][j] === '.') return '.'
  if (
    (i == 0 && j == 0) || // top left
    (i == 0 && j == j_length - 1) || // top right
    (i == i_length - 1 && j == 0) || // bottom left
    (i == i_length - 1 && j == j_length - 1) // bottom right
  ) {
    return '#' // a corner can never have 3 nearby occupied seats
  }

  if (i == 0) { // top edge
    let list = previousResults[i][j - 1] + previousResults[i + 1][j - 1] + previousResults[i + 1][j] + previousResults[i + 1][j + 1] + previousResults[i][j + 1]
    // console.log(chalk.greenBright(list))
    if(list.split('').reduce(reducer, 0) === 0) return '#'
    else if(list.split('').reduce(reducer, 0) > 3) return 'L'
    else return previousResults[i][j]
    // console.log(chalk.magenta(list))
  }

  if (i == i_length - 1) { // bottom edge
    let list = previousResults[i][j - 1] + previousResults[i - 1][j - 1] + previousResults[i - 1][j] + previousResults[i - 1][j + 1] + previousResults[i][j + 1]
    // console.log(chalk.red(list))
    if(list.split('').reduce(reducer, 0) === 0) return '#'
    else if(list.split('').reduce(reducer, 0) > 3) return 'L'
    else return previousResults[i][j]
    // console.log(chalk.magenta(list))
  }

  if (j == 0) { // left edge
    let list = previousResults[i - 1][j] + previousResults[i - 1][j + 1] + previousResults[i][j + 1] + previousResults[i + 1][j + 1] + previousResults[i + 1][j]
    // console.log(chalk.cyan(list))
    if(list.split('').reduce(reducer, 0) === 0) return '#'
    else if(list.split('').reduce(reducer, 0) > 3) return 'L'
    else return previousResults[i][j]
    // console.log(chalk.magenta(list))
  }

  if (j == j_length - 1) { // right edge
    let list = previousResults[i - 1][j] + previousResults[i - 1][j - 1] + previousResults[i][j - 1] + previousResults[i + 1][j - 1] + previousResults[i + 1][j]
    // console.log(chalk.magenta(list))
    if(list.split('').reduce(reducer, 0) === 0) return '#'
    else if(list.split('').reduce(reducer, 0) > 3) return 'L'
    else return previousResults[i][j]
    // console.log(chalk.magenta(list))
  }

  // everything left is a chair on the interior
  // console.log(chalk.bgGray.yellow(`i: ${i} - j: ${j}`))
  let list =
    previousResults[i - 1][j - 1] +
    previousResults[i - 1][j] +
    previousResults[i - 1][j + 1] +
    previousResults[i][j - 1] +
    previousResults[i][j + 1] +
    previousResults[i + 1][j - 1] +
    previousResults[i + 1][j] +
    previousResults[i + 1][j + 1]
  // console.log(chalk.yellow(list))
  if(list.split('').reduce(reducer, 0) === 0) return '#'
  if(list.split('').reduce(reducer, 0) > 3) return 'L'

  return previousResults[i][j]
}

const compare = () => {
  if (isEqual(iterationResults, previousResults)) {
    // console.table(iterationResults)
    let finalCount = iterationResults.reduce((acc, curr) => curr.reduce((acc1, curr2) => curr2 === '#' ? acc1 + 1 : acc1, 0) + acc, 0)
    console.log(chalk.bgMagenta.black(`finalCount: ${finalCount}`))
    noChanges = true
  }
}

const main = () => {
  iterationResults = []
  const i_length = previousResults.length
  for(let i = 0; i < i_length; i = i + 1) {
    iterationResults[i] = []
    const j_length = previousResults[i].length
    for(let j = 0; j < j_length; j = j + 1) {
      // console.log(chalk.blue(`${i}, ${j}`))
      iterationResults[i][j] = evaluateSeat(i, i_length, j, j_length)
    }
  }
  compare()
  previousResults = [...iterationResults]
}

let iter = 0
while(noChanges == false) {
  iter += 1
  // console.log(chalk.bgCyan.white(`boom! - ${iter}`))
  // console.table(previousResults)
  main()
}