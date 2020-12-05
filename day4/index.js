import fs from 'fs'
import chalk from 'chalk'

// CONSTANTS

const REQUIRED_FIELDS = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']
const FIELD_RULES = {
  ecl: (ecl) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl),
  pid: (pid) => pid.length === 9,
  eyr: (eyr) => eyr.length === 4 && eyr >= 2020 && eyr <= 2030,
  hcl: (hcl) => /#([\da-f]{6})/.test(hcl),
  byr: (byr) => byr.length === 4 && byr >= 1920 && byr <= 2002,
  iyr: (iyr) => iyr.length === 4 && iyr >= 2010 && iyr <= 2020,
  hgt: (hgt) => {
    const results = hgt.match(/(\d+)(cm|in)/)
    if (results?.[2] === 'cm') {
      return Number(results[1]) >= 150 && Number(results[1]) <= 193
    } else if (results?.[2] === 'in') {
      return Number(results[1]) >= 59 && Number(results[1]) <= 76
    }
    return false
  }
}

// FUNCTIONS

// takes a string like 'key1:value1 key2:value2'
// and turns it into { key1:value1, key2: value2 }
const convertStringToObject = singlePassportString => {
  const singlePassportItems = singlePassportString.split(' ')
  return singlePassportItems.reduce((accumulator, currentItem) => {
    const [key, value] = currentItem.split(':')
    return { ...accumulator, [key]: value }
  }, {})
}

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

// this section reformats the data into an array of objects that we can work with
let arrayOfPassportObjects = []
let singlePassportString = ''
for (let i = 0; i < stringArray.length; i++) {
  if (stringArray[i] !== '') {
    if (singlePassportString.length === 0) {
      // begining of new passport value string
      singlePassportString = singlePassportString + stringArray[i]
    } else {
      // append to existing passport value string
      singlePassportString = singlePassportString + ' ' + stringArray[i]
    }

    // if this is the very last item of data, make sure this last object gets added.
    if ( i === stringArray.length - 1) {
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


// this section determines the validity of each password, and counts valid ones
const result = arrayOfPassportObjects.reduce((accumulator, currentPassport) => {
  // the passport is valid if all of the required fields exist in the passport
  const passportIsValid = REQUIRED_FIELDS.reduce((truthyAccumulator, currentRequiredField) => {
    // this bit here makes sure all required fields (keys) are in the current passport object
    if (!truthyAccumulator) {
      return false
    } else {
      // helpful visualization of validation
      // if(Object.keys(currentPassport).includes(currentRequiredField)) {
      //   console.log(`${chalk.blue(currentRequiredField)} : ${chalk.cyan(currentPassport[currentRequiredField])} : ${FIELD_RULES[currentRequiredField](currentPassport[currentRequiredField])}`)
      // }
      return Object.keys(currentPassport).includes(currentRequiredField) && FIELD_RULES[currentRequiredField](currentPassport[currentRequiredField])
    }
  }, true)

  // helpful visualization
  // console.log(chalk.red('\n - - - - - - - - -'))
  // console.log('currentPassport: ', currentPassport)
  // console.log('passportIsValid: ', passportIsValid)
  // console.log(chalk.red(' - - - - - - - - -\n'))

  return passportIsValid ? accumulator + 1 : accumulator
}, 0)

console.log('result: ', result)
// Part 1 result is 250
// Part 2 result is 158
