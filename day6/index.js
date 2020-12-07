import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

let arrayOfGroupAnswers = []
let singleGroupAnswerString = ''
for (let i = 0; i < stringArray.length; i++) {
  if (stringArray[i] !== '') {
    if (singleGroupAnswerString.length === 0) {
      // begining of new answer value string
      singleGroupAnswerString = singleGroupAnswerString + stringArray[i]
    } else {
      // append to existing answer value string
      singleGroupAnswerString = singleGroupAnswerString + ' ' + stringArray[i]
    }

    // if this is the very last item of data, make sure this last object gets added.
    if ( i === stringArray.length - 1) {
      // Let's convert the string we've gathered up to this point,
      // and break it down into objects that we can push into arrayOfGroupAnswers
      const str = singleGroupAnswerString.replace(/\s/g, '')
      arrayOfGroupAnswers.push(str.split('').sort())
    }
  } else {
    // we've hit a blank line. Let's convert the string we've gathered up to this point,
    // and break it down into objects that we can push into arrayOfGroupAnswers
    const str = singleGroupAnswerString.replace(/\s/g, '')
      arrayOfGroupAnswers.push(str.split('').sort())

    // reset the answer string when we hit a blank line
    singleGroupAnswerString = ''
  }
}

const deduped = arrayOfGroupAnswers.map(answerArray => {
  return answerArray.reduce((acc, curr) => {
    if (acc.includes(curr)) {
      return acc
    } else {
      return [...acc, curr]
    }
  }, '')
})

const count = deduped.reduce((accumulator, current) => {
  let currentAsArray = []
  if(current.length === 1) {
    currentAsArray = [current]
  } else {
    currentAsArray = current
  }

  const sumOfCurrent = currentAsArray.reduce((acc, curr) => {
    return acc + curr.length
  }, 0)
  return accumulator + sumOfCurrent
}, 0)

console.log(`Count: ${chalk.magenta(count)}`) // 7343 is too high