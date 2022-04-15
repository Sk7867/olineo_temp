import React from 'react'
import './SkeletonComp.css'

const SkeletonComp = ({ type }) => {
  return (
    <div className={`skeleton ${type}`}></div>
  )
}

export default SkeletonComp