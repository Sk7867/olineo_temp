import React from 'react'
import './ProductInfoTable.css'

const ProductInfoTable = ({ product_Information }) => {

  const handleTableKeys = (elem) => {
    switch (elem) {
      case 'weight': return 'Item Weight'
      case 'size': return 'Item Dimensions LxWxH'
      case 'brand': return 'Brand'
      case 'modelYear': return 'Item Model Year'
      case 'modelNo': return 'Item Model Number'
      case 'modelNumber': return 'Item Model Number'
      case 'color': return 'Colour'
      case 'manufacturer': return 'Manufacturer'
      case 'powerOutput': return 'Speakers Maximum Output Power'
      case 'connectorType': return 'Connector Type'
      case 'audioOutputMode': return 'Audio Output Mode'
      case 'batteriesRequired': return 'Batteries Required'
      case 'compatibleDevices': return 'Compatible Devices'
      case 'country': return 'Country of Origin'
      case 'includesRechargableBattery': return 'Includes Rechargable Battery'
      case 'mountingHardware': return 'Mounting Hardware'
      case 'numberOfItems': return 'Number Of Items'
      case 'spacialFeature': return 'Special Features'
      case 'speakerAmplificationType': return 'Speaker Amplification Type'
      // case 'speakerAmplificationType': return 'Speaker Amplification Type'
      default: return 'miscellaneous Info'
    }
  }
  return (
    <>
      <table className='product_Information_Table'>
        <tbody>
          {
            product_Information.map((elem, index) => (
              elem[1] ? (
                <tr className='product_Table_Row' key={index}>
                  <td className='product_Table_Key'>{handleTableKeys(elem[0])}</td>
                  <td className='product_Table_Value'>{elem[1]}{elem[0] === 'weight' ? '' : ''}</td>
                </tr>
              ) : ('')
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default ProductInfoTable