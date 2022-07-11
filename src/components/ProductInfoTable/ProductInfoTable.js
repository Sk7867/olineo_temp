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
      case 'modelName': return 'Item Model Name'
      case 'color': return 'Colour'
      case 'manufacturer': return 'Manufacturer'
      case 'powerOutput': return 'Speakers Maximum Output Power'
      case 'connectorType': return 'Connector Type'
      case 'audioOutputMode': return 'Audio Output Mode'
      case 'batteriesRequired': return 'Batteries Required'
      case 'batteriesIncluded': return 'Batteries Included'
      case 'batteries': return 'Batteries'
      case 'compatibleDevices': return 'Compatible Devices'
      case 'country': return 'Country of Origin'
      case 'includesRechargableBattery': return 'Includes Rechargable Battery'
      case 'mountingHardware': return 'Mounting Hardware'
      case 'numberOfItems': return 'Number Of Items'
      case 'specialFeatures': return 'Special Features'
      case 'speakerAmplificationType': return 'Speaker Amplification Type'
      case 'os': return 'Operating System'
      case 'ram': return 'RAM'
      case 'rom': return 'ROM'
      case 'connectivityTech': return 'Connectivity Technologies'
      case 'displayTechnology': return 'Display Technology'
      case 'displayFeatures': return 'Display Features'
      case 'otherDisplayFeatures': return 'Other Display Features'
      case 'primaryDeviceInterface': return 'Primary Device Interface'
      case 'cameraFeatures': return 'Camera Features'
      case 'audioJack': return 'Audio Jack'
      case 'formFactor': return 'Form Factor'
      case 'batteryPowerRating': return 'Battery Power Rating'
      case 'inTheBox': return 'Whats in the box'
      case 'wirelessTech': return 'Wireless Technology'
      case 'gps': return 'GPS'
      case 'hasGPS': return 'GPS'
      case 'colorsDisplayed': return 'Colors Displayed'
      case 'deviceInterface': return 'Primary Device Interface'
      case 'otherCameraFeatures': return 'Other Camera Features'
      case 'headphonesFormFactor': return 'Headphones Form Factor'
      case 'microphoneFormFactor': return 'Microphone Form Factor'
      case 'cableFeature': return 'Cable Feature'
      case 'material': return 'Material'
      case 'hardwarePlatform': return 'Hardware Platform'
      case 'screenResolution': return 'Screen Resolution'
      case 'ACAdapterCurrent': return 'AC Adapter Current'
      case 'cableType': return 'Cable Type'
      case 'connectiveTech': return 'Connectivity Tech'
      case 'dataTransferRate': return 'Data Transfer Rate'
      case 'itemHeight': return 'Item Height'
      case 'itemWidth': return 'Item Width'
      case 'numberOfMemorySticks': return 'Number Of Memory Sticks'
      case 'numberOfPorts': return 'Number Of Ports'
      case 'totalUsbPorts': return 'Total USB Ports'
      case 'speakerType': return 'Speaker Type'
      case 'peakPowerHandlingSpeakers': return 'Peak Power Handling - Speakers'
      case 'RMSPowerRangeAmplifiers': return 'RMS Power Range - Amplifiers'
      case 'speakerConnectivity': return 'Speaker Connectivity'
      case 'wattage': return 'Wattage'
      case 'mountingType': return 'Mounting Type'
      case 'speakerSurroundSoundChannelConfiguration': return 'Speaker Surround Sound Channel Configuration'
      case 'importedBy': return 'Imported By'
      case 'powerSource': return 'Power Source'
      case 'batterCapacity': return 'Battery Capacity'
      case 'batteryCellComposition': return 'Battery Cell Composition'
      case 'processorBrand': return 'Processor Brand'
      default: return 'miscellaneous Info'
    }
  }
  return (
    <>
      <table className='product_Information_Table'>
        <tbody>
          {
            product_Information.map((elem, index) => (
              elem[1] && (elem[0] !== 'specText') ? (
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