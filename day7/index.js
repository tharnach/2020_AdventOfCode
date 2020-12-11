import fs from 'fs'
import chalk from 'chalk'

const color = ['red', 'green', 'blue', 'magenta', 'cyan', 'gray'];

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

const bags = ['shiny gold bag']
const masterList = []
const getContainers = (arrayOfBags) => {
  const accumulatedContainersForAllBags = [] // this iteration
  arrayOfBags.map(bag => {
    const containersForBag = stringArray.reduce((acc, curr) => {
      const [container, bags] = curr.split('contain')
      if (!masterList.includes(container.trim()) && bags.includes(bag)) { // if we need this container and we dont have it, add it to the accumulator
        return [...acc, container.trim()]
      } else {
        return acc
      }
    }, [])
    if (containersForBag.length > 0) { // if resulting accumulator has something to push, then push
      accumulatedContainersForAllBags.push(...containersForBag) // containers found per bag - we'll use this to know when to stop
      masterList.push(...containersForBag) // all containers found so far
      // console.log(`${bag}: ${chalk[color[Math.floor(Math.random() * color.length)]](JSON.stringify(containersForBag, null, 2))}`)
    }
  })
  // if we get to the point where there are no new items to add to the master list because they're already in there, we're done
  if(accumulatedContainersForAllBags.length === 0) return
  // else keep going with a fresh array
  getContainers([...accumulatedContainersForAllBags]) // pass copy of array
}

getContainers(bags)
// console.log(JSON.stringify(masterList, null, 2))
console.log(masterList.length)

// 178 is too low...

// data2.txt is the example list given, which works here
// data3.txt is just an alphabetized list of the rules
