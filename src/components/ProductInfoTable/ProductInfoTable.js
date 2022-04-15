import React from 'react'
import './ProductInfoTable.css'

const ProductInfoTable = ({ product_Information }) => {
  return (
    <>
      <table className='product_Information_Table'>
        <tbody>
          {
            product_Information.map((elem, index) => (
              <tr className='product_Table_Row' key={index}>
                <td className='product_Table_Key'>{elem.table_key}</td>
                <td className='product_Table_Value'>{elem.table_value}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default ProductInfoTable