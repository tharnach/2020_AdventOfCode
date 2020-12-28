import fs from 'fs'
import chalk from 'chalk'
import isEqual from 'lodash.isequal'

// const stringArray = fs.readFileSync("./data2.txt").toString().split("\r\n"); // windows line endings
const stringArray = fs.readFileSync('./data.txt').toString().split('\n') // mac line endings

const twoDimensionalArray = stringArray.map((line) => line.split(''))
// console.log(chalk.cyan(JSON.stringify(twoDimensionalArray, null, 2)))

const reducer = (acc, curr) => (curr == '#' ? acc + 1 : acc)

let iterationResults = []
let previousResults = twoDimensionalArray
let noChanges = false

const getNorth = (i, i_length, j, j_length) => {
  // console.log(`getNorth() - i: ${i}, j: ${j}`)
  if (i === 0) return '.'
  if (previousResults[i - 1][j] !== '.') {
    return previousResults[i - 1][j]
  } else {
    return getNorth(i - 1, i_length, j, j_length)
  }
}

const getNorthEast = (i, i_length, j, j_length) => {
  if (i === 0 || j === j_length - 1) return '.'
  if (previousResults[i - 1][j + 1] !== '.') {
    return previousResults[i - 1][j + 1]
  } else {
    return getNorthEast(i - 1, i_length, j + 1, j_length)
  }
}

const getEast = (i, i_length, j, j_length) => {
  if (j === j_length - 1) return '.'
  if (previousResults[i][j + 1] !== '.') {
    return previousResults[i][j + 1]
  } else {
    return getEast(i, i_length, j + 1, j_length)
  }
}

const getSouthEast = (i, i_length, j, j_length) => {
  if (i === i_length - 1 || j === j_length - 1) return '.'
  if (previousResults[i + 1][j + 1] !== '.') {
    return previousResults[i + 1][j + 1]
  } else {
    return getSouthEast(i + 1, i_length, j + 1, j_length)
  }
}

const getSouth = (i, i_length, j, j_length) => {
  if (i === i_length - 1) return '.'
  if (previousResults[i + 1][j] !== '.') {
    return previousResults[i + 1][j]
  } else {
    return getSouth(i + 1, i_length, j, j_length)
  }
}

const getSouthWest = (i, i_length, j, j_length) => {
  if (i === i_length - 1 || j === 0) return '.'
  if (previousResults[i + 1][j - 1] !== '.') {
    return previousResults[i + 1][j - 1]
  } else {
    return getSouthWest(i + 1, i_length, j - 1, j_length)
  }
}

const getWest = (i, i_length, j, j_length) => {
  if (j === 0) return '.'
  if (previousResults[i][j - 1] !== '.') {
    return `${previousResults[i][j - 1]}`
  } else {
    return getWest(i, i_length, j - 1, j_length)
  }
}

const getNorthWest = (i, i_length, j, j_length) => {
  if (i === 0 || j === 0) return '.'
  if (previousResults[i - 1][j - 1] !== '.') {
    return previousResults[i - 1][j - 1]
  } else {
    return getNorthWest(i - 1, i_length, j - 1, j_length)
  }
}

const evaluateSeat = (i, i_length, j, j_length) => {
  // console.log(chalk.bgYellow.black(`i: ${i} - j: ${j}`))
  // console.log(`previousResults[i][j]: ${previousResults[i][j]}`)
  if (previousResults[i][j] === '.') return '.'
  if (
    (i == 0 && j == 0) || // top left
    (i == 0 && j == j_length - 1) || // top right
    (i == i_length - 1 && j == 0) || // bottom left
    (i == i_length - 1 && j == j_length - 1) // bottom right
  ) {
    return '#' // a corner can never have 4 nearby occupied seats
  }

  if (i == 0) {
    // top edge
    let list = `
      ${getWest(i, i_length, j, j_length)}
      ${getSouthWest(i, i_length, j, j_length)}
      ${getSouth(i, i_length, j, j_length)}
      ${getSouthEast(i, i_length, j, j_length)}
      ${getEast(i, i_length, j, j_length)}
    `
    // console.log(chalk.greenBright(list))
    if (list.split('').reduce(reducer, 0) === 0) return '#'
    else if (list.split('').reduce(reducer, 0) > 4) return 'L'
    else return previousResults[i][j]
  }

  if (i == i_length - 1) {
    // bottom edge
    let list = `
      ${getWest(i, i_length, j, j_length)}
      ${getNorthWest(i, i_length, j, j_length)}
      ${getNorth(i, i_length, j, j_length)}
      ${getNorthEast(i, i_length, j, j_length)}
      ${getEast(i, i_length, j, j_length)}
    `
    // console.log(chalk.red(list))
    if (list.split('').reduce(reducer, 0) === 0) return '#'
    else if (list.split('').reduce(reducer, 0) > 4) return 'L'
    else return previousResults[i][j]
  }

  if (j == 0) {
    // left edge
    let list = `
      ${getNorth(i, i_length, j, j_length)}
      ${getNorthEast(i, i_length, j, j_length)}
      ${getEast(i, i_length, j, j_length)}
      ${getSouthEast(i, i_length, j, j_length)}
      ${getSouth(i, i_length, j, j_length)}
    `
    // console.log(chalk.cyan(list))
    if (list.split('').reduce(reducer, 0) === 0) return '#'
    else if (list.split('').reduce(reducer, 0) > 4) return 'L'
    else return previousResults[i][j]
  }

  if (j == j_length - 1) {
    // right edge
    let list = `
      ${getNorth(i, i_length, j, j_length)}
      ${getNorthWest(i, i_length, j, j_length)}
      ${getWest(i, i_length, j, j_length)}
      ${getSouthWest(i, i_length, j, j_length)}
      ${getSouth(i, i_length, j, j_length)}
    `
    // console.log(chalk.magenta(list))
    if (list.split('').reduce(reducer, 0) === 0) return '#'
    else if (list.split('').reduce(reducer, 0) > 4) return 'L'
    else return previousResults[i][j]
  }

  // everything left is a chair on the interior
  let list = `
    ${getNorthEast(i, i_length, j, j_length)}
    ${getNorth(i, i_length, j, j_length)}
    ${getNorthWest(i, i_length, j, j_length)}
    ${getWest(i, i_length, j, j_length)}
    ${getEast(i, i_length, j, j_length)}
    ${getSouthWest(i, i_length, j, j_length)}
    ${getSouth(i, i_length, j, j_length)}
    ${getSouthEast(i, i_length, j, j_length)}
  `
  // console.log(chalk.yellow(list))
  if (list.split('').reduce(reducer, 0) === 0) return '#'
  if (list.split('').reduce(reducer, 0) > 4) return 'L'

  return previousResults[i][j]
}

const compare = () => {
  if (isEqual(iterationResults, previousResults)) {
    // console.table(iterationResults)
    let finalCount = iterationResults.reduce(
      (acc, curr) => curr.reduce((acc1, curr2) => (curr2 === '#' ? acc1 + 1 : acc1), 0) + acc,
      0,
    )
    console.log(chalk.bgMagenta.black(`finalCount: ${finalCount}`))
    noChanges = true
  }
}

const main = () => {
  iterationResults = []
  const i_length = previousResults.length
  for (let i = 0; i < i_length; i = i + 1) {
    iterationResults[i] = []
    const j_length = previousResults[i].length
    for (let j = 0; j < j_length; j = j + 1) {
      // console.log(chalk.blue(`${i}, ${j}`))
      iterationResults[i][j] = evaluateSeat(i, i_length, j, j_length)
    }
  }
  compare()
  previousResults = [...iterationResults]
}

let iter = 0
while (noChanges == false) {
  iter += 1
  // console.log(chalk.bgCyan.white(`boom! - ${iter}`))
  // console.table(previousResults)
  main()
}
