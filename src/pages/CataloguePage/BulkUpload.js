import { toBeEmptyDOMElement } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx/xlsx.mjs';
import { addBulkOrder, addProductCatalogue, addProductGalleryImages, addProductImages } from '../../api/CatalogueApi';
import CatelogueModal from '../../components/ModalComponenr/CatelogueModal';
import { Slide, toast, ToastContainer } from 'react-toastify'

toast.configure()
const BulkUpload = ({ setHeaderData }) => {
  const nav = useNavigate()
  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: []
  })
  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: []
  })
  const [fileToSend, setFileToSend] = useState([])
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
  const [imagesArray, setImagesArray] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState('')

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
      blankrows: false,
    })
    let newArray = jsonData.map(function (element) {
      const { productInfo, url, dynamicHeader } = handleProductSort(element)

      let colorAlterArray = []
      let specAlterArray = []
      let newColorStr = element.colorAlter.replace(/['"]+/g, '')
      let newSpecStr = element.specAlter.replace(/['"]+/g, '')
      if (newColorStr.indexOf(',') > -1) {
        colorAlterArray = newColorStr.split(',')
      } else {
        colorAlterArray.push(newColorStr)
      }
      if (newSpecStr.indexOf(',') > -1) {
        specAlterArray = newSpecStr.split(',')
      } else {
        specAlterArray.push(newSpecStr)
      }
      // let immediateComplimentArray = element.immediateComp.split(',')
      // let laterComplimentArray = element.laterComp.split(',')

      let item = {
        hierarchyL1: element.hierarchyL1,
        hierarchyL2: element.hierarchyL2,
        hierarchyL3: element.hierarchyL3,
        classification: element.productClassification,
        name: element.productName,
        ean: element.ean,
        type: element.hierarchyL2,
        description: element.productDesc,
        qty: element.quantity,
        modelNo: element.modelNo,
        brand: element.brand,
        color: element.color,
        HSN: element.hsn,
        inwardDate: element.inwardDate,
        price: {
          mrp: element.mrp,
          mop: element.mop
        },
        slug: url,
        dynamicHeader: dynamicHeader,
        productInfo: productInfo,
        altProduct: {
          color: colorAlterArray,
          spec: specAlterArray
        }
      }
      return item
    })
    setFileToSend(newArray)
    setfileUploaded({
      loaded: true,
      fileData: columnData
    })
    setFileJsonData({
      loaded: true,
      fileData: jsonData
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileJsonData.loaded) {
      addBulkOrder(fileToSend)
        .then(res => {
          if (res) {
            let productArray = res
            productArray.map((item, index) => (
              addProductImages(item._id, imagesArray[index]),
              addProductGalleryImages(item._id, galleryImages[index])
                .then(res => console.log(res))
            ))
            nav('/catelogue-page')
          }
        })
    } else {
      toast.error('Excel file not uploaded')
    }
  }

  const handleProductSort = (elem) => {
    let productInfo = {}
    let url = ''
    let dynamicHeader = ''
    let dynamicArray = []
    let dynamicArray2 = []
    switch (elem.hierarchyL2) {
      case 'Smartphone': productInfo = {
        os: elem.os,
        ram: elem.ram,
        rom: elem.rom,
        color: elem.color,
        batteries: elem.batteries,
        wirelessTech: elem.wirelessTech,
        connectivityTech: elem.connectiveTech,
        gps: elem.hasGPS,
        spacialFeature: elem.specialFeatures,
        displayFeatures: elem.displayFeatures,
        displayTechnology: elem.displayTechnology,
        colorsDisplayed: elem.colorsDisplayed,
        otherDisplayFeatures: elem.otherDisplayFeatures,
        deviceInterface: elem.primaryDeviceInterface,
        cameraFeatures: elem.cameraFeatures,
        otherCameraFeatures: elem.otherCameraFeatures,
        audioJack: elem.audioJack,
        formFactor: elem.formFactor,
        batteryPowerRating: elem.batteryPowerRating,
        productTalkTime: elem.talkTime,
        productStandbyTime: elem.standbyTime,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.color + ', ' + elem.ram + ', ' + elem.rom + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Adapter': productInfo = {
        compatibleDevices: elem.compatibleDevices,
        spacialFeature: elem.specialFeatures,
        numberOfItems: elem.numberOfItems,
        wattage: elem.wattage,
        powerSource: elem.powerSource,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        numberOfPorts: elem.numberOfPorts,
        totalUsbPorts: elem.totalUsbPorts,
        connectorType: elem.connectorType,
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.wattage + ', ' + elem.connectorType + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Tablet': productInfo = {
        os: elem.os,
        series: elem.series,
        ram: elem.ram,
        rom: elem.rom,
        color: elem.color,
        itemHeight: elem.itemHeight,
        itemWidth: elem.itemWidth,
        standingScreenDisplaySize: elem.standingScreenDisplaySize,
        connectivityTech: elem.connectiveTech,
        screenResolution: elem.screenResolution,
        batteries: elem.batteries,
        processorBrand: elem.processorBrand,
        processorSpeed: elem.processorSpeed,
        processorCount: elem.processorCount,
        othercameraFeatures: elem.cameraFeatures,
        rearWebcamResolution: elem.rearWebcamResolution,
        frontWebcamResolution: elem.frontWebcamResolution,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.color + ', ' + elem.ram + ', ' + elem.rom + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Wired Headphones': productInfo = {
        spacialFeature: elem.specialFeatures,
        mountingHardware: elem.mountingHardware,
        numberOfItems: elem.numberOfItems,
        microphoneTechnology: elem.microphoneTechnology,
        headphonesFormFactor: elem.headphonesFormFactor,
        batteriesRequired: elem.batteriesRequired,
        cableFeature: elem.cableFeature,
        connectorType: elem.connectorType,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Wired Earphones': productInfo = {
        compatibleDevices: elem.compatibleDevices,
        spacialFeature: elem.specialFeatures,
        mountingHardware: elem.mountingHardware,
        numberOfItems: elem.numberOfItems,
        microphoneTechnology: elem.microphoneTechnology,
        headphonesFormFactor: elem.headphonesFormFactor,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        cableFeature: elem.cableFeature,
        connectorType: elem.connectorType,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Bluetooth Speaker': productInfo = {
        speakerType: elem.speakerType,
        color: elem.color,
        playTime: elem.playTime,
        peakPowerHandlingSpeakers: elem.peakPowerHandlingSpeakers,
        RMSPowerRangeAmplifiers: elem.RMSPowerRangeAmplifiers,
        batteries: elem.batteries,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + ', ' + elem.playTime + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      default:
        break;
    }
  }

  const imageHandleChange = (e, target) => {
    let imgArray = []
    if (e.target.files) {
      let fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      // console.log(fileArray);
      imgArray.push(fileArray)
      target((prevImages) => prevImages.concat(imgArray))
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file)) //Optional
    }
  }
  const handleOpen = (e, imagesPassed, index) => {
    e.preventDefault()
    setModalOpen(true)
    setModalData(imagesPassed[index - 1])
  }

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
              <>
                <div className='catelogue_Table'>
                  <table>
                    <thead>
                      <tr>
                        {
                          fileUploaded.fileData[0].map((item, index) => (
                            <th key={index} >{item}</th>
                          ))
                        }
                        <th><p>Upload Product Images</p><p>Add Maximum 5 images</p></th>
                        <th>Image Files Preview</th>
                        <th><p>Upload Product Gallery Images</p><p>Add Maximum 5 images</p></th>
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
                              <td><input type='file' name="Product Images" multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={(e) => imageHandleChange(e, setImagesArray)} /></td>
                              <td>
                                <div className={'button-Container'} onClick={(e) => handleOpen(e, imagesArray, index)}>
                                  <button type='submit' className='submit-button'><p>Preview Images</p></button>
                                </div>
                              </td>
                              <td><input type='file' name="Product Images" multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={(e) => imageHandleChange(e, setGalleryImages)} /></td>
                              <td>
                                <div className={'button-Container'} onClick={(e) => handleOpen(e, galleryImages, index)}>
                                  <button type='submit' className='submit-button'><p>Preview Images</p></button>
                                </div>
                              </td>
                            </tr>
                          )
                        ))
                      }
                    </tbody>
                    <tbody>

                    </tbody>
                  </table>
                </div>
                <div className={'button-Container'}>
                  <button type='submit' className='submit-button' onClick={handleSubmit}><p>Submit</p></button>
                </div>
              </>
            )
          }
        </div>
      </div>
      <CatelogueModal modalShow={modalOpen} setModalShow={setModalOpen} modalData={modalData} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  )
}

export default BulkUpload