import React from 'react'

const getMixedProducts = (arr1, arr2, no_of_items) => {
  let result
  let newConcatArray = arr1.concat(arr2)
  const shuffledArr = [...newConcatArray].sort(() => 0.5 - Math.random())
  result = shuffledArr.slice(0, no_of_items)

  return result
}

export default getMixedProducts