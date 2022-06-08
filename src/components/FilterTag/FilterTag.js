import React from 'react'
import './FilterTag.css'
//Images
import closeBlueBtn from '../../assets/vector/close_outline_blue.svg'

const FilterTag = ({ filterSelected, setFilterSelected }) => {
  // console.log(filter);

  const removeFilter = (id) => {
    let newArray = filterSelected.filter(item => item.id !== id)
    setFilterSelected(newArray)
  }

  return (
    <>
      {
        filterSelected.map((filter) => (
          <div className='filterTag_Container' id={filter.id} key={filter.id}>
            <p>{filter.data}</p>
            <img src={closeBlueBtn} alt="" onClick={() => removeFilter(filter.id)} />
          </div>
        ))
      }
    </>
  )
}

export default FilterTag