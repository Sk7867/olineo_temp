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
                <td className='product_Table_Key'>{elem[0]}</td>
                <td className='product_Table_Value'>{elem[1]}{elem[0] === 'weight' ? '' : ''}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default ProductInfoTable