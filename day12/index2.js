import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync("./data.txt").toString().split("\r\n"); // windows line endings

let waypoint = { x: 10, y: 1}
let coordinates = { x: 0, y: 0 }
const cardinals = ['N', 'E', 'S', 'W']

const rotate = (direction, degrees) => {
  /*
    if radians are needed use a = X * pi / 180

    y' = y*cos(a) - x*sin(a)
    x' = y*sin(a) + x*cos(a)
  */
 // always rotate clockwise
  if(direction === 'L') {
    return rotate('R',  Math.abs(360 - degrees))
  }
  // console.log(chalk.yellow(`Direction: ${direction} - Degrees: ${degrees}`))
  const radians = degrees * Math.PI / 180
  const newCoord = Object.assign({}, {
    x: (waypoint.y * Math.sin(radians) + waypoint.x * Math.cos(radians)).toFixed(0),
    y: (waypoint.y * Math.cos(radians) - waypoint.x * Math.sin(radians)).toFixed(0)
  })
  // console.log(chalk.cyan(`old: x:${waypoint.x}, y:${waypoint.y} - new: x:${newCoord.x}, y:${newCoord.y}`))
  return newCoord
}

const move = (direction, distance) => {
  let newWaypoint = Object.assign({}, waypoint)
  // console.log(chalk.blue(`direction: ${direction}, distance:${distance}`))
  switch (direction) {
    case 'N':
      newWaypoint.y = Number(waypoint.y) + distance
      break
    case 'E':
      newWaypoint.x = Number(waypoint.x) + distance
      break
    case 'S':
      newWaypoint.y = Number(waypoint.y) - distance
      break
    case 'W':
      newWaypoint.x = Number(waypoint.x) - distance
      break
    default:
      console.log(chalk.red(`not a real direction - ${direction}`))
  }
  waypoint = Object.assign({}, newWaypoint)
  // console.log(chalk.blue(`waypoint: ${JSON.stringify(waypoint, null, 2)}`))
}

const moveShip = (multiplier) => {
  let newCoords = Object.assign({}, coordinates)
  if (waypoint.x < 0) {
    newCoords.x = coordinates.x + Math.abs(waypoint.x) * multiplier * -1
  } else if (waypoint.x >= 0){
    newCoords.x = coordinates.x + waypoint.x * multiplier
  }
  if (waypoint.y < 0) {
    newCoords.y = coordinates.y + Math.abs(waypoint.y) * multiplier * -1
  } else if (waypoint.y >= 0) {
    newCoords.y = coordinates.y + waypoint.y * multiplier
  }
  coordinates = Object.assign({}, newCoords)
}

for (let i = 0; i < stringArray.length; i = i + 1) {
  if (cardinals.includes(stringArray[i].substring(0, 1))) {
    // console.log(chalk.magenta(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)}`))
    move(stringArray[i].substring(0, 1), Number(stringArray[i].substring(1)))
  }
  if (stringArray[i].includes('F')) {
    // console.log(chalk.cyan(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)} -> ${heading} ${stringArray[i].substring(1)}`))
    // move(heading, Number(stringArray[i].substring(1)))
    moveShip(Number(stringArray[i].substring(1)))
  }
  if (stringArray[i].includes('R') || stringArray[i].includes('L')) {
    // console.log(chalk.red(`${stringArray[i].substring(0, 1)} ${stringArray[i].substring(1)}`))
    waypoint = rotate(stringArray[i].substring(0, 1), Number(stringArray[i].substring(1)))
  }
}

console.log(chalk.green(`Coordinates: x:${coordinates.x}, y:${coordinates.y}`))
console.log(chalk.green(`Manhattan distance: ${Math.abs(coordinates.x) + Math.abs(coordinates.y)}`))
