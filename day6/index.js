import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n"); // windows line endings

let arrayOfGroupAnswers = []
let singleGroupAnswerString = ''
let groupCount = 0
for (let i = 0; i < stringArray.length; i++) {
  if (stringArray[i] !== '') {
    if (singleGroupAnswerString.length === 0) {
      // begining of new answer value string
      singleGroupAnswerString = singleGroupAnswerString + stringArray[i]
    } else {
      // append to existing answer value string
      singleGroupAnswerString = singleGroupAnswerString + ' ' + stringArray[i]
    }
    groupCount++

    // if this is the very last item of data, make sure this last object gets added.
    if ( i === stringArray.length - 1) {
      // Let's convert the string we've gathered up to this point,
      // and break it down into objects that we can push into arrayOfGroupAnswers

      let str = singleGroupAnswerString.replace(/\s/g, '')
      str  = str + groupCount
      arrayOfGroupAnswers.push(str.split('').sort())
    }
  } else {
    // we've hit a blank line. Let's convert the string we've gathered up to this point,
    // and break it down into objects that we can push into arrayOfGroupAnswers
    let str = singleGroupAnswerString.replace(/\s/g, '')
    str  = str + groupCount
    arrayOfGroupAnswers.push(str.split('').sort())

    // reset the answer string when we hit a blank line
    singleGroupAnswerString = ''
    groupCount = 0
  }
}

const arrayOfGroupAnswersCount = arrayOfGroupAnswers.map(answerArray => {

  return answerArray.reduce((acc, curr, index) => {
    if(index === 0) {
      return { numberInGroup: Number(curr) }
    }
    if (Object.keys(acc).includes(curr)) {
      return { ...acc, [curr]: acc[curr] + 1}
    } else {
      return {...acc, [curr]: 1}
    }
  }, {})
})

const arrayOfGroupAnswersAllCount = arrayOfGroupAnswersCount.map((answerCount) => {
  const answerKeys = Object.keys(answerCount)
  const [ numberInGroup = { num }, ...rest ] = answerKeys
  return rest.reduce((acc, curr) => {
    if (answerCount[curr] === answerCount[numberInGroup]) {
      return [...acc, curr]
    } else {
      return acc
    }
  }, [])
})

const countPart2 = arrayOfGroupAnswersAllCount.reduce((accumulator, current) => accumulator + current.length, 0)

console.log(`Count: ${chalk.cyan(countPart2)}`) //3628 