import React, { useEffect, useRef } from 'react'
import { useCSVReader } from 'react-papaparse';

const BulkUpload = ({ setHeaderData }) => {
  const { CSVReader } = useCSVReader()
  const buttonRef = useRef()

  const handleOnFileLoad = (data) => {
    console.log(data);
  }



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
        <div className="catelogue_Page section_Wrapper" style={{ maxWidth: 'none' }}>
          <div className="catelogue_Page_Header">
            <h4 className='catelogue_Page_Heading'>Catelogue Add Multiple Products</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default BulkUpload