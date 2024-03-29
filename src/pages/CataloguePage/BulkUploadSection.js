import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import { addBulkOrder, addProductCatalogue, addProductGalleryImages, addProductImages } from "../../api/CatalogueApi";
import CatelogueModal from "../../components/ModalComponenr/CatelogueModal";
import { toast } from "react-toastify";

toast.configure();
const BulkUploadSection = () => {
  const nav = useNavigate();
  const loc = useLocation()

  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileToSend, setFileToSend] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const [imagesObject, setImagesObject] = useState({});
  const [galleryImagesObject, setGalleryImagesObject] = useState({});

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file?.arrayBuffer();
    /* data is an ArrayBuffer */
    if (data) {
      const workbook = XLSX.read(data);
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(workSheet);
      const columnData = XLSX.utils.sheet_to_json(workSheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });
      let newArray = jsonData.map(function (element) {
        const { productInfo, url, dynamicHeader } = handleProductSort(element);

        let colorAlterArray = []
        let specAlterArray = []
        // colorAlterArray.unshift(element.ean)
        // specAlterArray.unshift(element.ean)
        if (element.colorAlter) {
          let newColorStr = element.colorAlter.replace(/['"]+/g, '')
          if (newColorStr.indexOf(',') > -1) {
            colorAlterArray = newColorStr.split(',')
          } else {
            colorAlterArray.push(newColorStr)
          }
        }

        if (element.specAlter) {
          let newSpecStr = element.specAlter.replace(/['"]+/g, '')
          if (newSpecStr.indexOf(',') > -1) {
            specAlterArray = newSpecStr.split(',')
          } else {
            specAlterArray.push(newSpecStr)
          }
        }

        let immediateComplimentArray = []
        let laterComplimentArray = []
        if (element.immediateCompCategory) {
          if (element.immediateCompCategory.indexOf(',') > -1) {
            let arrayHold = element.immediateCompCategory.split(',')
            immediateComplimentArray = arrayHold.map((prod) => {
              return prod.trim()
            })
          } else {
            immediateComplimentArray.push(element.immediateCompCategory)
          }
        }

        if (element.laterCompCategory) {
          if (element.laterCompCategory.indexOf(',') > -1) {
            let arrayHold = element.laterCompCategory.split(',')
            laterComplimentArray = arrayHold.map((prod) => {
              return prod.trim()
            })
          } else {
            laterComplimentArray.push(element.laterCompCategory)
          }
        }

        let item = {
          hierarchyL1: element.hierarchyL1,
          hierarchyL2: element.hierarchyL2,
          hierarchyL3: element.hierarchyL3,
          classification: element.productClassification,
          advancePayment: element.advancePayment,
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
            mop: element.mop,
          },
          slug: url,
          dynamicHeader: dynamicHeader,
          productInfo: productInfo,
          altProduct: {
            color: colorAlterArray,
            spec: specAlterArray,
          },
          complimentoryCatgories: {
            immediate: immediateComplimentArray,
            later: laterComplimentArray
          }
        };
        return item;
      });
      setFileToSend(newArray);
      setfileUploaded({
        loaded: true,
        fileData: columnData,
        eanPosition: columnData[0].indexOf("ean"),
      });
      setFileJsonData({
        loaded: true,
        fileData: jsonData,
      });
    } else {
      setfileUploaded({
        loaded: false,
        fileData: [],
      });

      setFileJsonData({
        loaded: false,
        fileData: [],
      });

      setFileToSend([]);
    }
  };

  const handleProductSort = (elem) => {
    let productInfo = {};
    let url = "";
    let dynamicHeader = "";
    let dynamicArray = [];
    let dynamicArray2 = [];
    let dyHeader = ''
    let dyHeader1 = ''
    productInfo = {
      os: elem.os,
      ram: elem.ram,
      rom: elem.rom,
      series: elem.series,
      color: elem.color,
      itemHeight: elem.itemHeight,
      itemWidth: elem.itemWidth,
      standingScreenDisplaySize: elem.standingScreenDisplaySize,
      batteries: elem.batteries,
      hardwarePlatform: elem.hardwarePlatform,
      wirelessTech: elem.wirelessTech,
      connectivityTech: elem.connectiveTech,
      bluetoothVersion: elem.bluetoothVersion,
      numberOfItems: elem.numberOfItems,
      gps: elem.hasGPS,
      processorBrand: elem.processorBrand,
      processorSpeed: elem.processorSpeed,
      processorCount: elem.processorCount,
      compatibleDevices: elem.compatibleDevices,
      specialFeatures: elem.specialFeatures,
      mountingHardware: elem.mountingHardware,
      mountingType: elem.mountingType,
      displayFeatures: elem.displayFeatures,
      screenResolution: elem.screenResolution,
      displayTechnology: elem.displayTechnology,
      colorsDisplayed: elem.colorsDisplayed,
      otherDisplayFeatures: elem.otherDisplayFeatures,
      deviceInterface: elem.primaryDeviceInterface,
      cameraFeatures: elem.cameraFeatures,
      otherCameraFeatures: elem.otherCameraFeatures,
      speakerType: elem.speakerType,
      playTime: elem.playTime,
      peakPowerHandlingSpeakers: elem.peakPowerHandlingSpeakers,
      RMSPowerRangeAmplifiers: elem.RMSPowerRangeAmplifiers,
      speakerSurroundSoundChannelConfiguration: elem.speakerSurroundSoundChannelConfiguration,
      audioOutputMode: elem.audioOutputMode,
      speakerAmplificationType: elem.speakerAmplificationType,
      speakerConnectivity: elem.speakerConnectivity,
      rearWebcamResolution: elem.rearWebcamResolution,
      frontWebcamResolution: elem.frontWebcamResolution,
      microphoneFormFactor: elem.microphoneFormFactor,
      headphonesFormFactor: elem.headphonesFormFactor,
      microphoneTech: elem.microphoneTech,
      audioJack: elem.audioJack,
      formFactor: elem.formFactor,
      batteryPowerRating: elem.batteryPowerRating,
      batteriesIncluded: elem.batteriesIncluded,
      batteriesRequired: elem.batteriesRequired,
      batteryCellComposition: elem.batteryCellComposition,
      containsLiquidContents: elem.containsLiquidContents,
      includesRechargableBattery: elem.includesRechargableBattery,
      totalUsbPorts: elem.totalUsbPorts,
      numberOfPorts: elem.numberOfPorts,
      cableFeature: elem.cableFeature,
      powerSource: elem.powerSource,
      connectorType: elem.connectorType,
      cableType: elem.cableType,
      numberOfMemorySticks: elem.numberOfMemorySticks,
      ACAdapterCurrent: elem.ACAdapterCurrent,
      maximumOperatingDistance: elem.maximumOperatingDistance,
      material: elem.material,
      wattage: elem.wattage,
      productTalkTime: elem.talkTime,
      productStandbyTime: elem.standbyTime,
      dataTransferRate: elem.dataTransferRate,
      inTheBox: elem.inTheBox,
      modelYear: elem.modelYear,
      modelName: elem.modelName,
      modelNo: elem.modelNo,
      importedBy: elem.importedBy,
      country: elem.countryOrigin,
      specText: elem.specText,
    }

    dynamicHeader = elem.productName +
      '( ' + elem.color + (elem.color ? (', ' + elem.color) : '')
      + (elem.ram ? (', ' + elem.ram) : '')
      + (elem.rom ? (', ' + elem.rom) : '')
      + (elem.bluetoothVersion ? (', ' + elem.bluetoothVersion) : '')
      + (elem.speakerConnectivity ? (', ' + elem.speakerConnectivity) : '')
      + (elem.connectorType ? (', ' + elem.connectorType) : '')
      + (elem.compatibleDevices ? (', ' + elem.compatibleDevices) : '')
      + (elem.wattage ? (', ' + elem.wattage) : '')
      + (elem.playtime ? (', ' + elem.playtime) : '')
      + (elem.microphoneTech ? (', ' + elem.microphoneTech) : '')
      + ')'

    dyHeader = dynamicHeader.replace(/[.]/g, '-')
    dyHeader1 = dyHeader.replace(/[\(,\)]/g, '')
    dynamicArray = dyHeader1.split(" ");
    dynamicArray2 = dynamicArray.filter(n => n)
    url = dynamicArray2.join('-')
    return { productInfo, url, dynamicHeader };
  };

  const imageHandleChange = (e, type, eanNum) => {
    if (e.target.files) {
      let imgObj = {
        imgs: [],
        imgsUrl: [],
      };

      for (let i = 0; i < e.target.files.length; i++) {
        imgObj.imgs.push(e.target.files[i]);
        let url = URL.createObjectURL(e.target.files[i]);
        imgObj.imgsUrl.push(url);
      }

      if (type === "product_image") {
        if (imgObj.imgs.length > 5) {
          e.target.value = "";
          imgObj = {
            imgs: [],
            imgsUrl: [],
          };
          toast.error("Maximum 5 Images can be selected!");
        }
        setImagesObject({ ...imagesObject, [eanNum]: imgObj });
      } else if (type === "gallery_image") {
        if (imgObj.imgs.length > 3) {
          e.target.value = "";
          imgObj = {
            imgs: [],
            imgsUrl: [],
          };
          toast.error("Maximum 3 Images can be selected!");
        }
        setGalleryImagesObject({ ...galleryImagesObject, [eanNum]: imgObj });
      }
    }
  };

  const handleOpen = (e, imagesPassed) => {
    e.preventDefault();
    setModalOpen(true);
    setModalData(imagesPassed);
  };

  console.log(loc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("submitCsvData").disabled = true;
    if (fileJsonData.loaded) {
      let res = await addBulkOrder(fileToSend);
      if (res) {
        document.getElementById("submitCsvData").innerHTML = "<p>Please Wait. Uploading Images... </p>";
        let productArray = res;
        // console.log(productArray);
        for (const ean in imagesObject) {
          if (imagesObject[ean].imgs.length !== 0) {
            const element = imagesObject[ean];
            let product = productArray.find((item) => {
              return item.ean === ean;
            });
            let res = await addProductImages(product._id, element.imgs);
          }
        }
        for (const ean in galleryImagesObject) {
          if (galleryImagesObject[ean].imgs.length !== 0) {
            const element = galleryImagesObject[ean];
            let product = productArray.find((item) => {
              return item.ean === ean;
            });
            let res = await addProductGalleryImages(product._id, element.imgs);
          }
        }
        document.getElementById("submitCsvData").disabled = false;
        document.getElementById("submitCsvData").innerHTML = "<p>Uploaded successfully!</p>";
        setTimeout(() => {
          document.getElementById("submitCsvData").innerHTML = "<p>Submit</p>";
          if (loc.pathname === '/admin-add-product-csv') {
            nav('/admin-products')
          } else {
            nav("/catelogue-page");
          }
        }, 1200);
      } else {
        document.getElementById("submitCsvData").disabled = false;
      }
    } else {
      document.getElementById("submitCsvData").disabled = false;
      toast.error("Excel file not uploaded!");
    }
  };

  return (
    <>
      <div className="catelogue_Page section_Wrapper" style={{ maxWidth: "none" }}>
        <div className="catelogue_Page_Header">
          <h4 className="catelogue_Page_Heading">Catelogue Add Multiple Products</h4>
        </div>

        <input type="file" className="input-field" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => handleFile(e)} />
        {fileUploaded.loaded && (
          <>
            <div className="catelogue_Table">
              <table>
                <thead>
                  <tr>
                    {fileUploaded.fileData[0].map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                    <th>
                      <p>Upload Product Images</p>
                      <p>Add Maximum 5 images</p>
                    </th>
                    <th>Image Files Preview</th>
                    <th>
                      <p>Upload Product Gallery Images</p>
                      <p>Add Maximum 3 images</p>
                    </th>
                    <th>Image Files Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {fileUploaded.fileData.map((item, index) =>
                    index === 0 ? (
                      ""
                    ) : (
                      <tr key={index}>
                        {item.map((itm, index) => (
                          <td key={index}>{itm}</td>
                        ))}
                        <td>
                          <form action="" encType="multipart/form-data">
                            <input
                              type="file"
                              name="Product Images"
                              multiple
                              id="productImageInput"
                              className="input-field"
                              accept="image/*"
                              placeholder="Enter Product Images URL"
                              onChange={(e) => imageHandleChange(e, "product_image", item[fileUploaded.eanPosition].toString())}
                            />
                          </form>
                        </td>
                        <td>
                          <div className={"button-Container"}>
                            <button
                              type="submit"
                              className="submit-button"
                              disabled={imagesObject[item[fileUploaded.eanPosition]] && imagesObject[item[fileUploaded.eanPosition]]?.imgs.length !== 0 ? false : true}
                              onClick={(e) => handleOpen(e, imagesObject[item[fileUploaded.eanPosition]].imgsUrl, index)}
                            >
                              <p>Preview Images</p>
                            </button>
                          </div>
                        </td>
                        <td>
                          <input
                            type="file"
                            name="galleryImageInput"
                            multiple
                            id="Product Images"
                            className="input-field"
                            accept="image/*"
                            placeholder="Enter Product Images URL"
                            onChange={(e) => imageHandleChange(e, "gallery_image", item[fileUploaded.eanPosition].toString())}
                          />
                        </td>
                        <td>
                          <div className={"button-Container"}>
                            <button
                              type="submit"
                              className="submit-button"
                              disabled={galleryImagesObject[item[fileUploaded.eanPosition]] && galleryImagesObject[item[fileUploaded.eanPosition]]?.imgs.length !== 0 ? false : true}
                              onClick={(e) => handleOpen(e, galleryImagesObject[item[fileUploaded.eanPosition]].imgsUrl)}
                            >
                              <p>Preview Images</p>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className={"button-Container"}>
              <button id="submitCsvData" disabled={false} type="submit" className="submit-button" onClick={handleSubmit}>
                <p>Submit</p>
              </button>
            </div>
          </>
        )}
      </div>
      <CatelogueModal modalShow={modalOpen} setModalShow={setModalOpen} imageData={modalData} />
    </>
  );
};

export default BulkUploadSection;
