import React, { useContext, useState } from 'react'
import './FilterTag.css'
//Images
import closeBlueBtn from '../../assets/vector/close_outline_blue.svg'
import { UserDataContext } from '../../Contexts/UserContext';

const FilterTag = ({ filter, handleDeletFilter }) => {

  return (
    <>
      <div className='filterTag_Container' id={filter.id} key={filter.id}>
        <p>{filter.data}</p>
        <img src={closeBlueBtn} alt="" onClick={() => handleDeletFilter(filter)} />
      </div>
    </>
  )
}

export default FilterTag