import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync("./data.txt").toString().split("\r\n"); // windows line endings

let heading = 'E'
let coordinates = { x: 0, y: 0 }
const cardinals = ['N', 'E', 'S', 'W']

const degreesToCardinal = (degree) => {
  // console.log(chalk.bgMagenta.black(`degree: ${degree}`))
  switch (degree) {
    case 0:
      return 'N'
    case 90:
      return 'E'
    case 180:
      return 'S'
    case 270:
      return 'W'
    default:
      console.log(chalk.bgRed.black(`not a degree - ${degree}`))
  }
}

const cardinalToDegrees = (heading) => {
  // console.log(chalk.bgYellow.black(`heading: ${heading}`))
  switch (heading) {
    case 'N':
      return 0
    case 'E':
      return 90
    case 'S':
      return 180
    case 'W':
      return 270
    default:
      console.log(chalk.bgRed.black(`not a heading - ${heading}`))
  }
}

const rotate = (direction, degrees) => {
  let headingInDegrees = cardinalToDegrees(heading)
  // console.log(chalk.bgCyan.black(`direction: ${direction} - degrees: ${degrees}`))
  // console.log(chalk.bgCyan.black(`headingInDegrees: ${headingInDegrees}`))
  
  if (direction === 'L') {
    headingInDegrees = headingInDegrees - degrees < 0 ? headingInDegrees - degrees + 360 :  headingInDegrees - degrees
    // console.log(chalk.bgYellowBright.black(`${heading} ${cardinalToDegrees(heading)} rotating by -${degrees} => ${degreesToCardinal(headingInDegrees)} ${headingInDegrees}`))
  }
  if (direction === 'R') {
    headingInDegrees = headingInDegrees + degrees >= 360 ? headingInDegrees + degrees - 360 :  headingInDegrees + degrees
    // console.log(chalk.yellow(`${heading} ${cardinalToDegrees(heading)} rotating by ${degrees} => ${degreesToCardinal(headingInDegrees)} ${headingInDegrees}`))
  }
  
  heading = degreesToCardinal(headingInDegrees)
}

const move = (direction, distance) => {
  switch (direction) {
    case 'N':
      coordinates.y = coordinates.y + distance
      break
    case 'E':
      coordinates.x = coordinates.x + distance
      break
    case 'S':
      coordinates.y = coordinates.y - distance
      break
    case 'W':
      coordinates.x = coordinates.x - distance
      break
    default:
      console.log(chalk(`not a real direction - ${direction}`))
  }
}

for (let i = 0; i < stringArray.length; i = i + 1) {
  if (cardinals.includes(stringArray[i].substring(0, 1))) {
    // console.log(chalk.magenta(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)}`))
    move(stringArray[i].substring(0, 1), Number(stringArray[i].substring(1)))
  }
  if (stringArray[i].includes('F')) {
    // console.log(chalk.cyan(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)} -> ${heading} ${stringArray[i].substring(1)}`))
    move(heading, Number(stringArray[i].substring(1)))
  }
  if (stringArray[i].includes('R') || stringArray[i].includes('L')) {
    // console.log(chalk.red(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)}`))
    rotate(stringArray[i].substring(0, 1), Number(stringArray[i].substring(1)))
  }
}

console.log(chalk.green(`Coordinates: x:${coordinates.x}, y:${coordinates.y}`))
console.log(chalk.green(`Manhattan distance: ${Math.abs(coordinates.x) + Math.abs(coordinates.y)}`))


// 2223 too high