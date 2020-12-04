import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

// takes a string like 'key1:value1 key2:value2'
// and turns it into { key1:value1, key2: value2 }
const convertStringToObject = singlePassportString => {
  const singlePassportItems = singlePassportString.split(' ')
  return singlePassportItems.reduce((accumulator, currentItem) => {
    const [key, value] = currentItem.split(':')
    return { ...accumulator, [key]: value }
  }, {})
}

let arrayOfPassportObjects = []
let singlePassportString = ''
for (let i = 0; i < stringArray.length; i++) {
  if (stringArray[i] !== '') {
    if(singlePassportString.length === 0) {
      // begining of new passport value string
      singlePassportString = singlePassportString + stringArray[i]
    } else {
      // append to existing passport value string
      singlePassportString = singlePassportString + ' ' + stringArray[i]
    }

    // if this is the very last item of data, make sure this last object gets added.
    if( i === stringArray.length - 1) {
      // Let's convert the string we've gathered up to this point,
      // and break it down into objects that we can push into arrayOfPassportObjects
      const passportObject = convertStringToObject(singlePassportString)
    
      arrayOfPassportObjects.push(passportObject)
    }
  } else {
    // we've hit a blank line. Let's convert the string we've gathered up to this point,
    // and break it down into objects that we can push into arrayOfPassportObjects
    const passportObject = convertStringToObject(singlePassportString)
    
    arrayOfPassportObjects.push(passportObject)

    // reset the passport string when we hit a blank line
    singlePassportString = ''
  }
}

// ignoring 'cid'
const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']

const result = arrayOfPassportObjects.reduce((accumulator, currentPassport) => {
  // the passport is valid if all of the required fields exist in the passport
  const passportIsValid = requiredFields.reduce((truthyAccumulator, currentRequiredField) => {
    // this bit here makes sure all required fields (keys) are in the current passport object
    // the ternary makes sure that two missing fields (keys) in a row don't return true (since false && false === true) 
    return truthyAccumulator ? truthyAccumulator && Object.keys(currentPassport).includes(currentRequiredField) : false
  }, true)

  // helpful visualization
  console.log(chalk.red('\n - - - - - - - - -'))
  console.log('currentPassport: ', currentPassport)
  console.log('passportIsValid: ', passportIsValid)
  console.log(chalk.red(' - - - - - - - - -\n'))

  if(passportIsValid) {
    return accumulator + 1
  } else {
    return accumulator
  }
}, 0)

console.log('result: ', result)
// Part 1 result is 250

