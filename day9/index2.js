import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

/////////////////////////////////////////////////////////////////////////////////////
// PART 2
// find series of #'s that add to 41682220 (value at index [539])
/////////////////////////////////////////////////////////////////////////////////////

let seriesStart = 0
let run = true
const target = 41682220

const executeLoop = (initialIndex) => {
  // console.log(chalk.green(`[${initialIndex}] - ${stringArray[initialIndex]}`))
  let total = []
  loop1:
  for (let i = initialIndex; i < stringArray.length; i = i + 1) {
    const num = Number(stringArray[i])
    const totalSum = total.reduce((acc, curr) => acc + curr, 0)
    // console.log(chalk.cyan(`[${initialIndex}] - ${totalSum} + ${num} = ${totalSum + num}`))
    if (i === stringArray.length - 1) {
      run = false
      break loop1
    }
    if (totalSum + num < target) {
      total.push(num)
    }
    if (totalSum + num > target) {
      seriesStart = seriesStart + 1
      total = []
      break loop1
    }
    if (totalSum + num === target && initialIndex != 539) {
      total.push(num)
      total.sort()
      console.log(chalk.red(`Found: ${JSON.stringify(total, null, 2)}`))
      console.log(`totalSum: ${JSON.stringify(totalSum, null, 2)}`)
      console.log(`From [${initialIndex}] to [${initialIndex + total.length}]`)
      console.log(`First: ${total[0]}, Last: ${total[total.length - 1]}`)
      console.log(`Answer: ${total[0] + total[total.length - 1]}`)
      run = false
      break loop1
    }
  }
}

while(run) {
  executeLoop(seriesStart)
}

// 5388976 
