import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync("./data.txt").toString().split("\r\n"); // windows line endings

const buses = stringArray[1].split(',').filter(item => { if (item != 'x') return item })
console.log(chalk.magenta(`${buses}`))

let found = false
let n = Number(stringArray[0])

while(!found) {
  // console.log(`n: ${n}`)
  for (let i = 0; i < buses.length; i = i + 1) {
    if (n % Number(buses[i]) === 0) {
      console.log(chalk.red(`n: ${n} - bus: ${buses[i]} - wait: ${n - Number(stringArray[0])} - answer: ${buses[i] * (n - Number(stringArray[0]))}`))
      found = true
    }
  }
  n = n + 1
}