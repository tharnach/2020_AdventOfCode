import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n") // windows line endings

// const slopes = [{x: 3, y: 1}] // part 1
const slopes = [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}] // part 2

// find the number of trees for each slope ^ and get an array of all tree counts
const treesPerSlope = slopes.map(({x, y}) => {
  let currentIndex = 0
  // the accumulator here is the tree count along the slope
  // the currentValue is an entire line from data.txt
  const totalTrees = stringArray.reduce((accumulator, currentValue, index) => {
    // determine if we'll need to skip the current line (happens when y > 1)
    if (index % y === 0) {
      const cells = currentValue.split('') // break each line into individual characters
      
      // if our currentIndex has been increased to be outside the length of this current line,
      // we'll go as far as we can in the current line, then finish up on the next line.
      if (cells.length - currentIndex <= 0) {
        currentIndex = Math.abs((cells.length - currentIndex))
      }
      
      // // visualization of what's happening (doesn't work when y > 1, it misses the skipped lines)
      // cells.map((cell, index) => {
      //   // console.log(chalk.bgBlue(cell))
      //   if (currentIndex === index) {
      //     // console.log(chalk.bgBlue(cell))
      //     process.stdout.write(chalk.black.bgRed(cell))
      //     // chalk(process.stdout.write(cell))
      //   } else {
      //     process.stdout.write(cell)
      //     // console.log(cell)
      //   }
      // })
      // console.log(' ')

      if (cells[currentIndex] === '#') {
        // tree encountered
        currentIndex = currentIndex + x
        return accumulator + 1
      }
      // no tree
      currentIndex = currentIndex + x
      return accumulator
    }
    // if index % y !== 0, we skip this line and add nothing to the accumulator (tree count)
    return accumulator
  }, 0)
  console.log(` `)
  console.log(`Total # of trees: ${totalTrees}`)
  return totalTrees
})

// get the product of all tree counts in the treesPerSlope array
const allTreeCountsMultiplied = treesPerSlope.reduce((accumulator, currentValue) => (accumulator * currentValue), 1)
console.log(`\nSolution: ${allTreeCountsMultiplied}`)

// Part 1 - 234
// Part 2 - 5813773056