import React from 'react'
import './SkeletonStyles.css'

const SkeletonElement = ({ type }) => {
  return (
    <div className={`skeleton ${type}`}></div>
  )
}

export default SkeletonElement