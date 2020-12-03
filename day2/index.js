/*
--- Day 2: Password Philosophy ---
Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?
*/

import fs from 'fs'

// PART 1
// const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n") // windows line endings
// const totalCorrectPasswords = stringArray.reduce((accumulator, currentValue) => {
//   const [range, letterWithColon, password] = currentValue.split(' ') // splits line into ['1-3', 'a:', 'abcde'] then destructures
//   const passwordAsArray = password.split('') // password split into array containing letters
//   const letter = letterWithColon.replace(':', '') // pulls colon off of given letter contraint
//   const [low, high] = range.split('-') // breaks '1-3' into ['1', '3'], then destructures
//   const letterCount = passwordAsArray.reduce((acc, curr) => curr === letter ? acc + 1 : acc, 0) // counts occurrences of given letter contraint in password
//   // if the count of this letter falls within the given range, count this as a valid password
//   if(letterCount >= low && letterCount <= high) {
//     return accumulator + 1
//   }
//   return accumulator
// }, 0)
// console.log(`Total correct passwords: ${totalCorrectPasswords}`)

// PART 2
const stringArray = fs.readFileSync('./data.txt').toString().split("\r\n") // windows line endings
const totalCorrectPasswords = stringArray.reduce((accumulator, currentValue) => {
  const [range, letterWithColon, password, result] = currentValue.split(' ') // splits line into ['1-3', 'a:', 'abcde'] then destructures
  const passwordAsArray = password.split('') // password split into array containing letters
  const letter = letterWithColon.replace(':', '') // pulls colon off of given letter contraint
  const [pos1, pos2] = range.split('-') // breaks '1-3' into ['1', '3'], then destructures
  const position1 = Number(pos1) - 1 // subtract 1 to get array position
  const position2 = Number(pos2) - 1 // subtract 1 to get array position
  // are both positions within the range of the password?
  if ((position1 < passwordAsArray.length - 1) && (position2 <= passwordAsArray.length - 1)){
    // is only one of the two positions the given letter?
    if((passwordAsArray[position1] === letter && passwordAsArray[position2] !== letter) || (passwordAsArray[position1] !== letter && passwordAsArray[position2] === letter)){
      return accumulator + 1
    }
  }
  return accumulator
}, 0)
console.log(`Total correct passwords: ${totalCorrectPasswords}`) // 502
