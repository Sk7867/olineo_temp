import React from 'react'
import Shimmer from './Shimmer'
import './SkeletonStyles.css'

const SkeletonElement = ({ type }) => {
  return (
    <div className="skeleton_Wrapper">
      <div className={`skeleton ${type}`}></div>
      <Shimmer />
    </div>
  )
}

export default SkeletonElement