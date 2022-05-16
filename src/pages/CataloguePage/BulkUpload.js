import React, { useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs';


const BulkUpload = ({ setHeaderData }) => {
  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: []
  })
  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: []
  })
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

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(workSheet)
    const columnData = XLSX.utils.sheet_to_json(workSheet, {
      header: 1,
      defval: '',
    })
    setfileUploaded({
      loaded: true,
      fileData: columnData
    })
    setFileJsonData({
      loaded: true,
      fileData: jsonData
    })
  }




  console.log(fileJsonData);
  console.log(fileUploaded);

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper" style={{ maxWidth: 'none' }}>
          <div className="catelogue_Page_Header">
            <h4 className='catelogue_Page_Heading'>Catelogue Add Multiple Products</h4>
          </div>
          <input
            type="file"
            className='input-field'
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            onChange={(e) => handleFile(e)} />
          {
            fileUploaded.loaded && (
              <div className='catelogue_Table'>
                <table>
                  <thead>
                    <tr>
                      {
                        fileUploaded.fileData[0].map((item, index) => (
                          <th key={index} >{item}</th>
                        ))
                      }
                      <th>Image Files Upload</th>
                      <th>Image Files Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      fileUploaded.fileData.map((item, index) => (
                        index === 0 ? ('') : (
                          <tr key={index} >
                            {
                              item.map((itm, index) => (
                                <td key={index} >{itm}</td>
                              ))
                            }
                            <td><input type="file" /></td>
                            <td>image files 2</td>
                          </tr>
                        )
                      ))
                    }
                  </tbody>
                  <tbody>

                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default BulkUpload