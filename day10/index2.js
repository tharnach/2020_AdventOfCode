import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n").map(item => Number(item))
const sortedArray = stringArray.sort((a, b) => a - b)
const fullArray = [0, ...sortedArray, sortedArray[sortedArray.length - 1] + 3]

/////////////////////////////////////////////////////////////////////////////////////
// PART 2
/////////////////////////////////////////////////////////////////////////////////////

// Make a ternary search tree. It's like a binary search tree in that I have
// no idea how to implement one of those either.

// TIL about 
// 1. ternary search trees
// 2. dynamic programming
//    2.1. fantastic comment from Derk-Jan Karrenbeld here: https://dev.to/sleeplessbyte/comment/194fe

// this beautiful solution was copied from coderinblack at https://dev.to/coderinblack08/comment/19393

const cache = {}

const determinePaths = (number) => {
  if (number === fullArray.length - 1) {
    return 1
  }
  // this is the time saver here, if we already know how many paths this branch has, 
  // just use the pre-calculated answer in the cache
  if (number in cache) {
    return cache[number]
  }
  let answer = 0

  /*
  * this will recursively go to the end of the array, then work
  * backwards adding up paths as you come back out 
  */
  for (let i = number + 1; i < fullArray.length; i++) {
    if (fullArray[i] - fullArray[number] <= 3) {
      answer += determinePaths(i)
    }
  }
  cache[number] = answer
  return answer
}

// this should help visualize what's happening I think
console.log(chalk.bgRed.black(`${JSON.stringify(cache, null, 2)}`))
console.log(`answer: ${determinePaths(0)}`)