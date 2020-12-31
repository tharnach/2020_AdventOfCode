/**
 * I'm not 100% sure I fully understand quite how this puzzle is solved.
 * I learned about the Chinese Remainder Theorum
 * I'm not sure how, in our equation below, a is (bus - offset) % bus
 * There's a bit of a gap for me in knowing exactly how to apply this 
 * theorum to our AoC puzzle. Learned something nonetheless.
 */

import fs from 'fs'
import chalk from 'chalk'

const stringArray = fs.readFileSync('./data.txt').toString().split('\r\n') // windows line endings

const lines = stringArray[1].split(',').map(item => item == 'x' ? 'x' : Number(item))
const buses = stringArray[1].split(',').filter(item => { if (item != 'x') return item }).sort((a, b) => b - a)
console.log(chalk.magenta(`${buses}`))

// safe with negative numbers unlike JS % operator
const absoluteModulo = (a, b) => ((a % b) + b) % b

// returns x where (a * x) % b == 1
// https://rosettacode.org/wiki/Modular_inverse
const getInverse = (a, mod) => {
  const b = a % mod
  for (let i = 1; i < mod; i++) {
    if ((b * i) % mod === 1) {
      return i
    }
  }
  return 1
}

const chineseRemainderTheorem = (lines) => {
  // x =- a (mod n)
  // x - some unknown, constant value of t
  // a - bus number MINUS offset % bus number
  // n - cycle length (= bus number)

  // to solve each row, we also need
  // N - all n's added up
  // nU = N / n
  // i - inverse modulo

  const N = lines.reduce((acc, cur) => {
    if (cur === 'x') {
      return acc
    }
    return acc === null ? cur : acc * cur
  }, null)

  const sum = lines.reduce((acc, cur, idx) => {
    if (cur === 'x') {
      return acc
    }
    const a = absoluteModulo(cur - idx, cur)
    const nU = N / cur
    const inverse = getInverse(nU, cur)
    console.log(`x = ${a} (mod ${cur})`)
    return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse))
  }, 0n)

  return sum % BigInt(N)
}

console.log(chineseRemainderTheorem(lines))
