import { db } from './config';

import fillIcon from './src/assets/images/fillIcon.png'

import { useEffect } from 'react';



const constant = 'this is a constant and cannot be reassigned'

let variable = 'this is a variable and be reassigned'

console.log(constant)



if (constnt === 'hello') {
  console.log(variable)
} else {
  console.log(constant, 'is not hello')
}



async function testAsyncFuntion() {

  await console.log(variable)

  console.log(constant)
}


const normalFunction = () => {
  let variable = 'new varaible'
  console.log(variable)
}


testAsyncFuntion()
normalFunction()



const functionWithReturn = () => {
  const message = 'hello this is a message'

  return message
}


console.log(functionWithReturn())


const functionWithPromise = () => {
  return new Promise((completed, notCompleted) => {

    if (constant === 'hello') {

      completed(constant)

    } else {

      notCompleted(constant)

    }
  })
}
