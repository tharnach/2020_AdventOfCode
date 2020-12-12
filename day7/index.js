import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings
const stringArraySingulars = stringArray.map(item => item.replace('bags', 'bag'))

/////////////////////////////////////////////////////////////////////////////////////
// PART 1
const bags = ['shiny gold bag']
const masterList = []
const getContainers = (arrayOfBags) => {
  const accumulatedContainersForAllBags = [] // this iteration
  arrayOfBags.map(bag => {
    const containersForBag = stringArraySingulars.reduce((acc, curr) => {
      const [container, bags] = curr.split('contain')
      if (!masterList.includes(container.trim()) && bags.includes(bag)) { // if we need this container and we dont have it, add it to the accumulator
        return [...acc, container.trim()]
      } else {
        return acc
      }
    }, [])
    const uniqueContainersForBag = containersForBag.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    if (uniqueContainersForBag.length > 0) { // if resulting accumulator has something to push, then push
      // make bags singular before pushing to lists
      const singularBags = uniqueContainersForBag.map(item => item.replace('bags', 'bag'))
      accumulatedContainersForAllBags.push(...singularBags) // containers found per bag - we'll use this to know when to stop
      masterList.push(...singularBags) // all containers found so far
    }
  })
  // if we get to the point where there are no new items to add to the master list because they're already in there, we're done
  if(accumulatedContainersForAllBags.length === 0) return
  // else keep going with a fresh array
  getContainers([...accumulatedContainersForAllBags]) // pass copy of array
}

getContainers(bags)
// console.log(JSON.stringify(masterList, null, 2))
console.log(chalk.red(masterList.length))

// 257 !!!

/////////////////////////////////////////////////////////////////////////////////////
// PART 2
const cleanBag = (bag) => {
  const trimmedBag = bag.trim()
  const number = trimmedBag.substring(0, 1)
  let description = bag.substring(2)
  let trimmedDescription = description.trim()
  if (number == 1) {
    trimmedDescription = trimmedDescription + 's'
  }
  return [number, trimmedDescription]
}

const masterList2 = []
const numberArray = []
const getBags = (containerName, prevNumber) => {
  const bagsForContainer = stringArray.reduce((acc, curr) => {
    const [jam, ] = curr.split('contain')
    if (jam.includes(containerName)) {
      return curr
    }
    return acc
  }, '')

  const [containerInLine, bags] = bagsForContainer.split('contain')
  if(bags.includes('no other')){
    return
  }
  if (containerInLine.trim().includes(containerName)){
    const bagsTrimmed = bags.trim().replace('.', '')
    const groupedBags = bagsTrimmed.split(',')
    if (groupedBags.length > 0) {
      groupedBags.map((bag) => {
        const [number, description] = cleanBag(bag)
        masterList2.push(description)
        numberArray.push(number * prevNumber)
        getBags(description, number * prevNumber)
      })
    }
    return
  }
}

getBags('shiny gold bags', 1)
// console.log(JSON.stringify(masterList2, null, 2))
// console.log(JSON.stringify(numberArray, null, 2))
const wow = numberArray.reduce((acc, curr) => acc + curr, 0)
console.log(chalk.yellow(wow))
