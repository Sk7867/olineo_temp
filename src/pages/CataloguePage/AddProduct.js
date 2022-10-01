import React, { useEffect } from 'react'
import AddProductSection from './AddProductSection'

const AddProduct = ({ setHeaderData }) => {
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Catelogue',
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    })
  }, []);
  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <AddProductSection />
      </div>
    </>
  )
}

export default AddProduct