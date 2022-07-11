import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import { addBulkOrder, addProductCatalogue, addProductGalleryImages, addProductImages } from "../../api/CatalogueApi";
import CatelogueModal from "../../components/ModalComponenr/CatelogueModal";
import { Slide, toast, ToastContainer } from "react-toastify";

toast.configure();
const BulkUpload = ({ setHeaderData }) => {
  const nav = useNavigate();

  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileToSend, setFileToSend] = useState([]);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "Catelogue",
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    });
  }, []);

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
        specialFeatures: elem.specialFeatures,
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
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        importedBy: elem.importedBy,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.color + ', ' + elem.ram + ', ' + elem.rom + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Adapter': productInfo = {
        compatibleDevices: elem.compatibleDevices,
        specialFeatures: elem.specialFeatures,
        numberOfItems: elem.numberOfItems,
        wattage: elem.wattage,
        powerSource: elem.powerSource,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        numberOfPorts: elem.numberOfPorts,
        totalUsbPorts: elem.totalUsbPorts,
        connectorType: elem.connectorType,
        dataTransferRate: elem.dataTransferRate,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin,
        specText: elem.specText

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
        wirelessTech: elem.wirelessTech,
        specialFeatures: elem.specialFeatures,
        connectivityTech: elem.connectiveTech,
        screenResolution: elem.screenResolution,
        otherDisplayFeatures: elem.otherDisplayFeatures,
        batteries: elem.batteries,
        processorBrand: elem.processorBrand,
        processorSpeed: elem.processorSpeed,
        processorCount: elem.processorCount,
        otherCameraFeatures: elem.cameraFeatures,
        rearWebcamResolution: elem.rearWebcamResolution,
        frontWebcamResolution: elem.frontWebcamResolution,
        batteryPowerRating: elem.batteryPowerRating,
        formFactor: elem.formFactor,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.color + (elem.ram ? (', ' + elem.ram) : '') + (elem.rom ? (', ' + elem.rom) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Wired Headphones': productInfo = {
        hardwarePlatform: elem.hardwarePlatform,
        specialFeatures: elem.specialFeatures,
        mountingHardware: elem.mountingHardware,
        numberOfItems: elem.numberOfItems,
        microphoneFormFactor: elem.microphoneFormFactor,
        headphonesFormFactor: elem.headphonesFormFactor,
        batteriesRequired: elem.batteriesRequired,
        cableFeature: elem.cableFeature,
        connectorType: elem.connectorType,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.headphonesFormFactor ? (', ' + elem.headphonesFormFactor) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case "Wired Earphones":
        productInfo = {
          compatibleDevices: elem.compatibleDevices,
          specialFeatures: elem.specialFeatures,
          mountingHardware: elem.mountingHardware,
          numberOfItems: elem.numberOfItems,
          microphoneFormFactor: elem.microphoneFormFactor,
          headphonesFormFactor: elem.headphonesFormFactor,
          batteriesIncluded: elem.batteriesIncluded,
          batteriesRequired: elem.batteriesRequired,
          cableFeature: elem.cableFeature,
          connectorType: elem.connectorType,
          material: elem.material,
          inTheBox: elem.inTheBox,
          importedBy: elem.importedBy,
          modelYear: elem.modelYear,
          modelName: elem.modelName,
          modelNo: elem.modelNo,
          country: elem.countryOrigin,
          specText: elem.specText
        };
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.headphonesFormFactor ? (', ' + elem.headphonesFormFactor) : '') + (elem.cableFeature ? (', ' + elem.cableFeature) : '') + (elem.compatibleDevices ? (', ' + elem.compatibleDevices) : '') + ')'
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
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.playTime ? (', ' + elem.playTime) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Charging Cable': productInfo = {
        compatibleDevices: elem.compatibleDevices,
        specialFeatures: elem.specialFeatures,
        numberOfMemorySticks: elem.numberOfMemorySticks,
        ACAdapterCurrent: elem.ACAdapterCurrent,
        itemHeight: elem.itemHeight,
        itemWidth: elem.itemWidth,
        connectiveTech: elem.connectiveTech,
        numberOfPorts: elem.numberOfPorts,
        totalUsbPorts: elem.totalUsbPorts,
        cableType: elem.cableType,
        dataTransferRate: elem.dataTransferRate,
        wattage: elem.wattage,
        connectorType: elem.connectorType,
        material: elem.material,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.wattage + (elem.connectorType ? (', ' + elem.connectorType) : '') + (elem.dataTransferRate ? (',' + elem.dataTransferRate) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Soundbar': productInfo = {
        color: elem.color,
        hardwarePlatform: elem.hardwarePlatform,
        specialFeatures: elem.specialFeatures,
        mountingHardware: elem.mountingHardware,
        speakerSurroundSoundChannelConfiguration: elem.speakerSurroundSoundChannelConfiguration,
        audioOutputMode: elem.audioOutputMode,
        numberOfItems: elem.numberOfItems,
        speakerAmplificationType: elem.speakerAmplificationType,
        speakerConnectivity: elem.speakerConnectivity,
        wattage: elem.wattage,
        batteriesRequired: elem.batteriesRequired,
        mountingType: elem.mountingType,
        connectorType: elem.connectorType,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.wattage ? (', ' + elem.wattage) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,/\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'TWS': productInfo = {
        color: elem.color,
        batteries: elem.batteries,
        specialFeatures: elem.specialFeatures,
        playtime: elem.playtime,
        mountingHardware: elem.mountingHardware,
        numberOfItems: elem.numberOfItems,
        microphoneFormFactor: elem.microphoneFormFactor,
        microphoneTech: elem.microphoneTech,
        headphonesFormFactor: elem.headphonesFormFactor,
        powerSource: elem.powerSource,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        batteryCellComposition: elem.batteryCellComposition,
        cableFeature: elem.cableFeature,
        connectorType: elem.connectorType,
        bluetoothVersion: elem.bluetoothVersion,
        maximumOperatingDistance: elem.maximumOperatingDistance,
        containsLiquidContents: elem.containsLiquidContents,
        includesRechargableBattery: elem.includesRechargableBattery,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.playTime ? (', ' + elem.playTime) : '') + (elem.microphoneTech ? (', ' + elem.microphoneTech) : '') + (elem.bluetoothVersion ? (', ' + elem.bluetoothVersion) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,/\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Bluetooth Neckband': productInfo = {
        color: elem.color,
        batteries: elem.batteries,
        specialFeatures: elem.specialFeatures,
        playtime: elem.playtime,
        wirelessTech: elem.wirelessTech,
        connectivityTech: elem.connectivityTech,
        otherDisplayFeatures: elem.otherDisplayFeatures,
        audioJack: elem.audioJack,
        numberOfItems: elem.numberOfItems,
        microphoneFormFactor: elem.microphoneFormFactor,
        microphoneTech: elem.microphoneTech,
        headphonesFormFactor: elem.headphonesFormFactor,
        mountingHardware: elem.mountingHardware,
        powerSource: elem.powerSource,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        cableFeature: elem.cableFeature,
        connectorType: elem.connectorType,
        bluetoothVersion: elem.bluetoothVersion,
        maximumOperatingDistance: elem.maximumOperatingDistance,
        includesRechargableBattery: elem.includesRechargableBattery,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.playTime ? (', ' + elem.playTime) : '') + (elem.microphoneTech ? (', ' + elem.microphoneTech) : '') + (elem.bluetoothVersion ? (', ' + elem.bluetoothVersion) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,/\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      case 'Powerbank': productInfo = {
        color: elem.color,
        batteries: elem.batteries,
        specialFeatures: elem.specialFeatures,
        playtime: elem.playtime,
        wirelessTech: elem.wirelessTech,
        connectivityTech: elem.connectivityTech,
        batteryPowerRating: elem.batteryPowerRating,
        wattage: elem.wattage,
        powerSource: elem.powerSource,
        batterCapacity: elem.batterCapacity,
        batteryCellComposition: elem.batteryCellComposition,
        numberOfItems: elem.numberOfItems,
        numberOfPorts: elem.numberOfPorts,
        totalUsbPorts: elem.totalUsbPorts,
        connectorType: elem.connectorType,
        mountingHardware: elem.mountingHardware,
        batteriesIncluded: elem.batteriesIncluded,
        batteriesRequired: elem.batteriesRequired,
        cableFeature: elem.cableFeature,
        includesRechargableBattery: elem.includesRechargableBattery,
        material: elem.material,
        inTheBox: elem.inTheBox,
        importedBy: elem.importedBy,
        modelYear: elem.modelYear,
        modelName: elem.modelName,
        modelNo: elem.modelNo,
        country: elem.countryOrigin,
        specText: elem.specText
      }
        // url = elem.productName + '-'
        dynamicHeader = elem.productName + '( ' + elem.connectorType + (elem.color ? (', ' + elem.color) : '') + (elem.playTime ? (', ' + elem.playTime) : '') + (elem.microphoneTech ? (', ' + elem.microphoneTech) : '') + (elem.bluetoothVersion ? (', ' + elem.bluetoothVersion) : '') + ')'
        dynamicArray = dynamicHeader.replace(/[\(,/\)]/g, '').split(" ");
        dynamicArray2 = dynamicArray.filter(n => n)
        url = dynamicArray2.join('-')
        return { productInfo, url, dynamicHeader };

      default:
        break;
    }
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
  console.log(fileToSend);
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("submitCsvData").disabled = true;
    if (fileJsonData.loaded) {
      let res = await addBulkOrder(fileToSend);
      if (res) {
        document.getElementById("submitCsvData").innerHTML = "<p>Please Wait. Uploading Images... </p>";
        let productArray = res;
        console.log(productArray);
        for (const ean in imagesObject) {
          if (imagesObject[ean].imgs.length !== 0) {
            const element = imagesObject[ean];
            let product = productArray.find((item) => {
              return item.ean === ean;
            });
            let res = await addProductImages(product._id, element.imgs);
            console.log(res);
          }
        }
        for (const ean in galleryImagesObject) {
          if (galleryImagesObject[ean].imgs.length !== 0) {
            const element = galleryImagesObject[ean];
            let product = productArray.find((item) => {
              return item.ean === ean;
            });
            let res = await addProductGalleryImages(product._id, element.imgs);
            console.log(res);
          }
        }
        document.getElementById("submitCsvData").disabled = false;
        document.getElementById("submitCsvData").innerHTML = "<p>Uploaded successfully!</p>";
        setTimeout(() => {
          document.getElementById("submitCsvData").innerHTML = "<p>Submit</p>";
          nav("/catelogue-page");
        }, 1200);
      } else {
        document.getElementById("submitCsvData").disabled = false;
      }
    } else {
      document.getElementById("submitCsvData").disabled = false;
      toast.error("Excel file not uploaded!");
    }
  };
  console.log(fileToSend);
  return (
    <>
      <div className="page_Wrapper page_Margin_Top_Secondary">
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
      </div>
      <CatelogueModal modalShow={modalOpen} setModalShow={setModalOpen} imageData={modalData} />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Slide} />
    </>
  );
};

export default BulkUpload;
