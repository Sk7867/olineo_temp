import React, { useContext, useEffect, useState } from 'react'
import { sliderClasses, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProductCatalogue, addProductGalleryImages, addProductImages, updateProductCatalogue } from '../../api/CatalogueApi';
import { UserDataContext } from '../../Contexts/UserContext'


//CSS
import './CateloguePage.css'
import { Dropdown } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

//Images
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import ModalComp from '../../components/ModalComponenr/Modal';
import CatelogueModal from '../../components/ModalComponenr/CatelogueModal';
import CommonModal from '../../components/ModalComponenr/CommonModal';
import ProductInfoTable from '../../components/ProductInfoTable/ProductInfoTable';


toast.configure()

export const hL1List = [
  'Mobile & Tablets',
  'Consumer Electronics'
]

export const hL2List = [
  'Smartphone',
  'Tablet',
  'Wired Headphones',
  'Wired Earphones',
  'Bluetooth Speaker',
  'Bluetooth Headphones',
  'Bluetooth Neckband',
  'Soundbar',
  'Adapter',
  'Charging Cable',
  'Power Bank',
  'Smart TV',
  'TWS',
  'Laptop',
  'Wifi Smart Speaker',
  'Security Camera',
  'Miscellaneous'
]

export const hL3List = [
  'Premium',
  'Midrange',
  'Budget'
  // { value: 'Premium', label: '' },
  // { value: 'Midrange', label: '' },
  // { value: 'Budget', label: '' },
]

export const productClassifications = [
  'Normal',
  'Coming Soon',
  'Out Of Stock',
  'Temp Hidden'
  // { value: 'Normal', label: '' },
  // { value: 'Coming_Soon', label: '' },
  // { value: 'Out_Of_Stock', label: '' },
  // { value: 'Temp_Hidden', label: '' },
]

export const advancePaymentOptions = [
  'Yes',
  'No'
]
const AddProductSection = () => {
  const matches = useMediaQuery("(min-width:768px)")
  const nav = useNavigate()
  const loc = useLocation()
  const { allProducts } = useContext(UserDataContext)
  const [prodPreviewData, setProdPreviewData] = useState({})
  const [L1Selected, setL1Selected] = useState('')
  const [L2Selected, setL2Selected] = useState('')
  const [L3Selected, setL3Selected] = useState('')
  const [classificationSelected, setClassificationSelected] = useState('')
  const [advancePayment, setAdvancePayment] = useState('')
  const [selectedDay, setSelectedDay] = useState(null);
  const [dynamicHeaderDemo, setDynamicHeaderDemo] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [ean, setEan] = useState('')
  const [hsn, setHsn] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('')
  const [mrp, setMrp] = useState('')
  const [mop, setMop] = useState('')
  const [weight, setWeight] = useState('')
  const [size, setSize] = useState('')
  const [inwardDate, setInwardDate] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [modelYear, setModelYear] = useState('')
  const [modelName, setModelName] = useState('')
  const [modelNo, setModelNo] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [update, setUpdate] = useState(false)

  const [imagesObject, setImagesObject] = useState({
    imgs: [],
    imgsUrl: []
  })
  const [existingImagesArray, setExistingImagesArray] = useState([])
  const [dynamicTable, setDynamicTable] = useState({})
  const [existingDynamicTable, setexistingDynamicTable] = useState({})
  const [discountGiven, setDiscountGiven] = useState(null)
  const [discountedPrice, setDiscountedPrice] = useState(null)
  const [flatDiscount, setFlatDiscount] = useState({
    value: '',
    from: null,
    to: null
  })
  const [comboOffer, setComboOffer] = useState({
    value: '',
    from: null,
    to: null
  })
  const [containerOffer, setContainerOffer] = useState({
    valAdded: false,
    value: [],
    from: null,
    to: null
  })
  const [containerEAN, setContainerEAN] = useState([{ productEAN: '' }])
  const [containerProducts, setContainerProducts] = useState([{ productInfo: '', loaded: false }])
  const [comboProduct, setComboProduct] = useState({
    loaded: false,
    product: []
  })
  const [images, setImages] = useState('')
  const [galleryImagesObject, setGalleryImagesObject] = useState({
    imgs: [],
    imgsUrl: []
  })
  const [existingGalleryImagesArray, setExistingGalleryImagesArray] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState('')
  const [technicalDetailsTable, setTechnicalDetailsTable] = useState({})
  const [bankOffers, setBankOffers] = useState([])
  const [alternateColorProds, setAlternateColorProds] = useState('')
  const [alternateSpecProds, setAlternateSpecProds] = useState('')
  const [alternateColorArray, setAlternateColorArray] = useState([])
  const [alternateSpecArray, setAlternateSpecArray] = useState([])
  const [immediateComplimentary, setImmediateComplimentary] = useState('')
  const [laterComplimentary, setLaterComplimentary] = useState('')
  const [immediateComplimentaryArray, setImmediateComplimentaryArray] = useState([])
  const [laterComplimentaryArray, setLaterComplimentaryArray] = useState([])
  const [bodyProductInfo, setBodyProductInfo] = useState([])
  const [slug, setSlug] = useState('')
  const [imagesArrayToShow, setImagesArrayToShow] = useState([])
  const [galleryImagesArrayToShow, setGalleryImagesArrayToShow] = useState([])
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (loc.state) {
      let product = loc.state.item
      console.log(product);
      setId(product._id)
      setEan(product.ean)
      setName(product.name)
      setDescription(product.description)
      setHsn(product.HSN)
      setColor(product.color)
      setMrp(product.price.mrp)
      setMop(product.price.mop)
      setSize(product.productInfo.size)
      setBrand(product.brand)
      setWeight(product.productInfo.weight)
      setStock(product.qty)
      // setInwardDate(product.productInfo.inwardDate)
      setModelName(product.productInfo.modelName)
      setModelNo(product.productInfo.modelNo)
      setModelYear(product.productInfo.modelYear)
      setManufacturer(product.productInfo.manufacturer)
      setL1Selected(product.hierarchyL1)
      setL2Selected(product.hierarchyL2)
      setL3Selected(product.hierarchyL3)
      setClassificationSelected(product.classification)
      setTechnicalDetailsTable(product.productInfo)
      setExistingImagesArray([...product.images])
      setExistingGalleryImagesArray([...product.gallery])
      setDynamicHeaderDemo(product.dynamicHeader)
      setSlug(product.slug)
      setUpdate(true)
      setDisabled(false)
      // setFlatDiscount(product.discount.flatDiscount)
      // setComboOffer(product.discount.combo)
      // setContainerOffer(prev => ({
      //   ...prev,
      //   value: product.discount.conetainer
      // }))
      // setDiscountGiven(product.discount.flatDiscount)
      // if (loc.state.inwardDate) {
      //   if (typeof (loc.state.inwardDate) === 'string') {
      //     let bdayRecieved = loc.state.inwardDate
      //     let seperateDOB = bdayRecieved.split('-')
      //     let yearRecieved = parseInt(seperateDOB[0])
      //     let monthRecieved = parseInt(seperateDOB[1])
      //     let dateRecieved = parseInt(seperateDOB[2])
      //     // let dateSep = dateWhole.slice(0, 2)
      //     // console.log(seperateDOB);
      //     // console.log(`
      //     // ${bdayRecieved}
      //     //   year: ${yearRecieved},
      //     //   month: ${monthRecieved},
      //     //   whole date: ${dateRecieved}

      //     // `);
      //     setSelectedDay({
      //       year: yearRecieved,
      //       month: monthRecieved,
      //       day: dateRecieved,
      //     })
      //   } else if (typeof (loc.state.inwardDate) === 'object') {
      //     setSelectedDay({
      //       year: loc.state.inwardDate.year,
      //       month: loc.state.inwardDate.month,
      //       day: loc.state.inwardDate.day,
      //     })
      //   }
      // } else if (loc.state.inwardDate === null) {
      //   setSelectedDay(null)
      // }
    }
  }, [loc])

  // const handleInput = (prop, e) => {
  //   e.target
  //     ? setProduct({ ...product, [prop]: e.target.value })
  //     : setProduct({ ...product, [prop]: e.label })
  // }

  console.log(update);

  const handleFormPreview = (e) => {
    e.preventDefault();
    let product = {
      id: id,
      name: name,
      ean: ean,
      HSN: hsn,
      description: description,
      brand: brand,
      // inwardDate: selectedDay,
      color: color,
      price: {
        mrp: mrp,
        mop: mop
      },
      stock: stock
    }
    setProdPreviewData(product)
    setBodyProductInfo(Object.entries(technicalDetailsTable))

    let dynamicHeader
    if (product && dynamicTable && (checkDynamicTable(dynamicTable))) {
      let temp = Object.values(dynamicTable)
      dynamicHeader = name + ' (' + temp.map(item => (` ${item}`)) + ')'
      setDynamicHeaderDemo(dynamicHeader)
    }

    if (slug === '' && (checkDynamicTable(dynamicTable))) {
      let dyHeader = dynamicHeader.replace(/[.]/g, '-')
      let dyHeader1 = dyHeader.replace(/[\(,\)]/g, '')
      let dynamicArray = dyHeader1.split(" ");
      let dynamicArray2 = dynamicArray.filter(n => n)
      let url = dynamicArray2.join('-')
      setSlug(url)
    }

    let colour = []
    let specs = []
    if (alternateColorProds !== '') {
      let newColorStr = alternateColorProds.replace(/['"]+/g, '')
      if (newColorStr.indexOf(',') > -1) {
        colour = newColorStr.split(',')
      } else {
        colour.push(newColorStr)
      }
    }
    setAlternateColorArray(colour)

    if (alternateSpecProds !== '') {
      let newSpecStr = alternateSpecProds.replace(/['"]+/g, '')
      if (newSpecStr.indexOf(',') > -1) {
        specs = newSpecStr.split(',')
      } else {
        specs.push(newSpecStr)
      }
    }
    setAlternateSpecArray(specs)

    let immediateComplimentArray = []
    let laterComplimentArray = []
    if (immediateComplimentary && immediateComplimentary !== '') {
      if (immediateComplimentary.indexOf(',') > -1) {
        let arrayHold = immediateComplimentary.split(',')
        immediateComplimentArray = arrayHold.map((prod) => {
          return prod.trim()
        })
      } else {
        immediateComplimentArray.push(immediateComplimentary)
      }
    }
    setImmediateComplimentaryArray(immediateComplimentArray)

    if (laterComplimentary && laterComplimentary !== '') {
      if (laterComplimentary.indexOf(',') > -1) {
        let arrayHold = laterComplimentary.split(',')
        laterComplimentArray = arrayHold.map((prod) => {
          return prod.trim()
        })
      } else {
        laterComplimentArray.push(laterComplimentary)
      }
    }
    setLaterComplimentaryArray(laterComplimentArray)

    if (imagesObject && imagesObject.imgsUrl && imagesObject.imgsUrl.length === 0 && existingImagesArray.length === 0) {
      (toast.error('Add Product Images'))
    } else {
      let holdImagesToShow = ((imagesObject.imgsUrl.length > 0) ? [...imagesObject.imgsUrl] : [...existingImagesArray])
      setImagesArrayToShow(holdImagesToShow)
    }

    if (galleryImagesObject && galleryImagesObject.imgsUrl && galleryImagesObject.imgsUrl.length === 0 && existingGalleryImagesArray.length === 0) {
      (toast.error('Add Gallery Images'))
    } else {
      let holdGalleryImagesToShow = ((galleryImagesObject.imgsUrl.length > 0) ? [...galleryImagesObject.imgsUrl] : [...existingGalleryImagesArray])
      setGalleryImagesArrayToShow(holdGalleryImagesToShow)
    }

    if ((imagesArrayToShow.length > 0) && (galleryImagesArrayToShow.length > 0)) {
      setModalOpen(true)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    (loc.state) ? (
      updateProductCatalogue(
        L1Selected,
        L2Selected,
        L3Selected,
        classificationSelected,
        prodPreviewData,
        dynamicHeaderDemo,
        technicalDetailsTable,
        alternateColorArray,
        alternateSpecArray,
        slug,
        immediateComplimentaryArray,
        laterComplimentaryArray,
      )
        .then(res => {
          if (res) {
            if (imagesObject.imgs.length > 0) {
              addProductImages(prodPreviewData.id, imagesObject.imgs)
            }
            if (galleryImagesObject.imgs.length > 0) {
              addProductGalleryImages(prodPreviewData.id, galleryImagesObject.imgs)
            }
            nav("/catelogue-page")
          } else {
            (toast.error('Incomplete Data'))
          }
        }
        )

    ) : (
      (imagesObject.imgs.length > 0) && (galleryImagesObject.imgs.length > 0) ? (
        addProductCatalogue(
          L1Selected,
          L2Selected,
          L3Selected,
          classificationSelected,
          prodPreviewData,
          dynamicHeaderDemo,
          technicalDetailsTable,
          alternateColorArray,
          alternateSpecArray,
          slug,
          immediateComplimentaryArray,
          laterComplimentaryArray,
        )
          .then(res => res ? (
            addProductImages(res._id, imagesObject.imgs),
            addProductGalleryImages(res._id, galleryImagesObject.imgs),
            setTimeout(() => {
              // document.getElementById("submitCsvData").innerHTML = "<p>Submit</p>";
              nav("/catelogue-page")
            }, 2000)
          ) : (
            (toast.error('Incomplete Data'))
          ))) :
        (toast.error('Add Product And Gallery Images'))
    )
  }

  const handleAddInput = (e) => {
    e.preventDefault();
    setContainerEAN([...containerEAN, { productEAN: '' }])
    setContainerProducts([...containerProducts, { productInfo: '', loaded: false }])
  }

  const handleAddBankOffer = (e) => {
    e.preventDefault();
    setBankOffers([...bankOffers, { offerName: '', offerAvail: '', from: null, to: null, fromDate: '', toDate: '' }])
  }

  const handleRemoveBankOffer = (index) => {
    let list = [...bankOffers]
    list.splice(index, 1)
    setBankOffers(list)
  }

  const handleRemoveInput = (index) => {
    let list = [...containerEAN]
    let productList = [...containerProducts]
    list.splice(index, 1)
    productList.splice(index, 1)
    setContainerEAN(list)
    setContainerProducts(productList)
  }

  const handleContainerEAN = (e, index) => {
    const { name, value } = e.target
    let list = [...containerEAN]
    list[index][name] = value
    setContainerEAN(list)
  }

  const handleBankOffer = (e, index) => {
    const { name, value } = e.target
    let list = [...bankOffers]
    list[index][name] = value
    setBankOffers(list)
  }

  // const validateNumber = (e) => {
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value)) {
  //     handleInput("stock", e.target.value)
  //   }
  // }

  const handleDyanmicTableValues = (prop, e) => {
    e.target
      ? setDynamicTable({ ...dynamicTable, [prop]: e.target.value })
      : setDynamicTable({ ...dynamicTable, [prop]: e.label })
  }

  const handleTechnicalTableValues = (prop, e) => {
    e.target
      ? setTechnicalDetailsTable({ ...technicalDetailsTable, [prop]: e.target.value })
      : setTechnicalDetailsTable({ ...technicalDetailsTable, [prop]: e.label })
  }

  const handleDiscountCalc = (priceGiven) => {
    if (mrp !== '') {
      let discountPrice = parseInt(priceGiven)
      let price = mrp
      let discount = Math.floor(((price - discountPrice) / price) * 100)
      setFlatDiscount(prev => ({
        ...prev,
        value: isNaN(discount) ? null : discount
      }))
      setDiscountedPrice(priceGiven)
    }
  }

  const searchComboProduct = (e) => {
    e.preventDefault();
    let product = allProducts.products.filter((product) => product.ean === comboOffer.value)
    setComboProduct({
      loaded: true,
      product: product
    })
  }

  const handleContainerProds = (e, index) => {
    e.preventDefault();
    let list = [...containerEAN]
    let list2 = [...containerOffer.value]
    let productList = [...containerProducts]
    let product = list[index]
    let { productEAN } = product
    let productFound = allProducts.products.filter((product) => product.ean === productEAN)
    let productInfo = productFound.pop()
    let loaded
    if (productInfo) {
      loaded = true
      let productToLoad = { productInfo, loaded }
      productList.splice(index, 1, productToLoad)
      list2.push(productEAN)
      setContainerProducts(productList)
      setContainerOffer(prev => ({ ...prev, valAdded: true, value: list2 }))
    }
  }

  const checkDynamicTable = (obj) => {
    if (Object.entries(obj).length === 0) {
      return false
    } else {
      return true
    }
  }

  const imageHandleChange = (e, type) => {
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
        setImagesObject(imgObj);

      } else if (type === "gallery_image") {
        if (imgObj.imgs.length > 3) {
          e.target.value = "";
          imgObj = {
            imgs: [],
            imgsUrl: [],
          };
          toast.error("Maximum 3 Images can be selected!");
        }
        setGalleryImagesObject(imgObj);
        setDisabled(false)
      }
    }
  };

  const renderImages = (source) => {
    return source.map((img, index) => {
      return (<img height={100} width={100} src={img} key={index} alt="" />)
    })
  }

  const handleBankOfferDate = (e, prop, index) => {
    const value = e
    const { day, month, year } = e
    let list = [...bankOffers]
    let key
    let key2
    if (prop) {
      key = 'fromDate'
      key2 = 'from'
    } else {
      key = 'toDate'
      key2 = 'to'
    }
    list[index][key] = value
    list[index][key2] = year + '/' + month + '/' + day
    setBankOffers(list)
  }

  const handleOpen = (e, imagesPassed) => {
    e.preventDefault()
    setModalOpen(true)
    setModalData(imagesPassed)
  }

  const handleDate = (e, type, key) => {
    type(prev => ({ ...prev, [key]: e }))
  }

  const modalHeaderComp = () => {
    return (
      <div className='addProduct_Preview_Modal'>
        <h4>Add Product Preview</h4>
      </div>
    )
  }

  const modalBodyComp = () => {
    return (
      <div className='addProduct_Preview_Modal_Body'>
        <div className="addProduct_Modal_Section">
          <p>Product Dynamic Header :</p>
          <p className='addProduct_Modal_Values'>{dynamicHeaderDemo}</p>
        </div>
        <div className="addProduct_Modal_Section">
          <p>Product Name :</p>
          <p className='addProduct_Modal_Values'>{name}</p>
        </div>
        <div className="addProduct_Modal_Section">
          <p>Product EAN Number :</p>
          <p className='addProduct_Modal_Values'>{ean}</p>
        </div>
        <div className="addProduct_Modal_Section">
          <p>Product HSN Number :</p>
          <p className='addProduct_Modal_Values'>{hsn}</p>
        </div>
        <div className="addProduct_Modal_Section">
          <p>Product Description :</p>
          <p className='addProduct_Modal_Values'>{description}</p>
        </div>
        <br />
        <br />
        <div className="addProduct_Modal_Section">
          <p>Product Brand :</p>
          <p className='addProduct_Modal_Values'>{brand}</p>
        </div>
        {manufacturer && (
          <div className="addProduct_Modal_Section">
            <p>Product Manufacturer :</p>
            <p className='addProduct_Modal_Values'>{manufacturer}</p>
          </div>
        )}
        {modelNo && (
          <div className="addProduct_Modal_Section">
            <p>Product Model Number :</p>
            <p className='addProduct_Modal_Values'>{modelNo}</p>
          </div>
        )}
        {modelName && (
          <div className="addProduct_Modal_Section">
            <p>Product Model Name :</p>
            <p className='addProduct_Modal_Values'>{modelName}</p>
          </div>
        )}
        {modelYear && (
          <div className="addProduct_Modal_Section">
            <p>Product Model Year :</p>
            <p className='addProduct_Modal_Values'>{modelYear}</p>
          </div>
        )}
        {color && (
          <div className="addProduct_Modal_Section">
            <p>Product Color :</p>
            <p className='addProduct_Modal_Values'>{color}</p>
          </div>
        )}
        {weight && (
          <div className="addProduct_Modal_Section">
            <p>Product Weight :</p>
            <p className='addProduct_Modal_Values'>{weight}</p>
          </div>
        )}
        {size && (
          <div className="addProduct_Modal_Section">
            <p>Product Size/Dimensions :</p>
            <p className='addProduct_Modal_Values'>{size}</p>
          </div>
        )}
        {mrp && (
          <div className="addProduct_Modal_Section">
            <p>Product MRP :</p>
            <p className='addProduct_Modal_Values'>{mrp}</p>
          </div>
        )}
        {mop && (
          <div className="addProduct_Modal_Section">
            <p>Product MOP :</p>
            <p className='addProduct_Modal_Values'>{mop}</p>
          </div>
        )}
        {bodyProductInfo && bodyProductInfo.length > 0 && (
          <>
            <ProductInfoTable product_Information={bodyProductInfo} />
            <br />
            <br />
          </>
        )}
        {alternateColorProds && (
          <div className="addProduct_Modal_Section">
            <p>Product Alternate Colors EAN Numbers :</p>
            <p className='addProduct_Modal_Values'>{alternateColorProds}</p>
          </div>
        )}
        {alternateSpecProds && (
          <div className="addProduct_Modal_Section">
            <p>Product Alternate Specs EAN Numbers :</p>
            <p className='addProduct_Modal_Values'>{alternateSpecProds}</p>
          </div>
        )}
        {immediateComplimentary && (
          <div className="addProduct_Modal_Section">
            <p>Immediate Complimentory Product Categories :</p>
            <p className='addProduct_Modal_Values'>{immediateComplimentary}</p>
          </div>
        )}
        {laterComplimentary && (
          <div className="addProduct_Modal_Section">
            <p>Later Complimentory Product Categories :</p>
            <p className='addProduct_Modal_Values'>{laterComplimentary}</p>
          </div>
        )}
        <br />
        <br />
        {
          imagesArrayToShow && imagesArrayToShow.length > 0 && (
            <div className="addProduct_Modal_Section">
              <h4>Product Images</h4>
              <div className="image_Preview_Side_Section">
                <div className="image_Preview_Selected section_Wrapper modal_Image_Preview">
                  <img src={imagesArrayToShow[0]} alt="" />
                </div>
                <div className="product_Thumbnails">
                  {imagesArrayToShow.map((image, index) => (
                    <div className="thumbnail" key={index}>
                      <img src={image} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        {
          galleryImagesArrayToShow && galleryImagesArrayToShow.length > 0 && (
            <>
              <h4>Gallery Images</h4>
              <div className='addProduct_Modal_Section_Gallery_Images'>
                {
                  galleryImagesArrayToShow.map((image, index) => (
                    <div key={index}>
                      <img src={image} width={350} alt="" />
                    </div>
                  ))
                }
              </div>
            </>
          )
        }
        <br />
        <br />
        <div className={'button-Container'}>
          <button type='submit' className='submit-button' onClick={(e) => formSubmit(e)} ><p>Submit Product</p></button>
        </div>
      </div>
    )
  }

  const technicalDetaislComp = (type) => {
    switch (type) {
      case 'Soundbar':
        return (
          <>
            <input type='text' name="Product Hardware Platform" id="Product Hardware Platform" value={technicalDetailsTable.hardwarePlatform} className='input-field' placeholder='Enter Product Hardware Platform' onChange={(e) => handleTechnicalTableValues("hardwarePlatform", e)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Speaker Surround Sound Channel Configuration" id="Product Speaker Surround Sound Channel Configuration" value={technicalDetailsTable.speakerSurroundSoundChannelConfiguration} className='input-field' placeholder='Enter Product Speaker Surround Sound Channel Configuration' onChange={(e) => handleTechnicalTableValues("speakerSurroundSoundChannelConfiguration", e)} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleDyanmicTableValues("compatibleDevices", e); handleTechnicalTableValues("compatibleDevices", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Mounting Type" id="Product Mounting Type" value={technicalDetailsTable.mountingType} className='input-field' placeholder='Enter Product Mounting Type' onChange={(e) => { handleTechnicalTableValues("mountingType", e) }} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Audio Output Mode" id="Product Audio Output Mode" value={technicalDetailsTable.audioOutputMode} className='input-field' placeholder='Enter Product Audio Output Mode' onChange={(e) => handleTechnicalTableValues("audioOutputMode", e)} />
            <input type='text' name="Speaker Amplification Type" id="Speaker Amplification Type" value={technicalDetailsTable.speakerAmplificationType} className='input-field' placeholder='Enter Product Speaker Amplification Type' onChange={(e) => { handleTechnicalTableValues("speakerAmplificationType", e) }} />
            <input type='text' name="Product Speaker Connectivity" id="Product Speaker Connectivity" value={technicalDetailsTable.speakerConnectivity} className='input-field' placeholder='Enter Product Speaker Connectivity' onChange={(e) => { handleTechnicalTableValues("speakerConnectivity", e) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Includes Rechargable Battery" id="Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(e) => { handleTechnicalTableValues("includesRechargableBattery", e) }} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(e) => { handleTechnicalTableValues("wattage", e); handleDyanmicTableValues("  ", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'Smartphone':
        return (
          <>
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(e) => { handleTechnicalTableValues("os", e); handleDyanmicTableValues("os", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product RAM" id="Product RAM" value={technicalDetailsTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(e) => { handleTechnicalTableValues("ram", e); handleDyanmicTableValues("ram", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product ROM" id="Product ROM" value={technicalDetailsTable.rom} className='input-field' placeholder='Enter Product ROM' onChange={(e) => { handleTechnicalTableValues("rom", e); handleDyanmicTableValues("rom", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Wireless communication technologies" id="Product Wireless communication technologies" value={technicalDetailsTable.wirelessTech} className='input-field' placeholder='Enter Product Wireless communication technologies' onChange={(e) => handleTechnicalTableValues("wirelessTech", e)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectiveTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(e) => handleTechnicalTableValues("connectiveTech", e)} />
            <input type='text' name="Product GPS" id="Product GPS" value={technicalDetailsTable.gps} className='input-field' placeholder='Enter if Product has GPS' onChange={(e) => handleTechnicalTableValues("gps", e)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Display features" id="Product Display features" value={technicalDetailsTable.displayFeatures} className='input-field' placeholder='Enter Product Display features' onChange={(e) => handleTechnicalTableValues("displayFeatures", e)} />
            <input type='text' name="Product Colours displayed" id="Product Colours displayed" value={technicalDetailsTable.colorsDisplayed} className='input-field' placeholder='Enter Product Colours displayed' onChange={(e) => handleTechnicalTableValues("colorsDisplayed", e)} />
            <input type='text' name="Product Other display features" id="Product Other display features" value={technicalDetailsTable.otherDisplayFeatures} className='input-field' placeholder='Enter Product Other display features' onChange={(e) => handleTechnicalTableValues("otherDisplayFeatures", e)} />
            <input type='text' name="Product Device interface - primary" id="Product Device interface - primary" value={technicalDetailsTable.deviceInterface} className='input-field' placeholder='Enter Product Device interface - primary' onChange={(e) => handleTechnicalTableValues("deviceInterface", e)} />
            <input type='text' name="Product camera features" id="Product camera features" value={technicalDetailsTable.cameraFeatures} className='input-field' placeholder='Enter Product Camera features' onChange={(e) => handleTechnicalTableValues("cameraFeatures", e)} />
            <input type='text' name="Product Other camera features" id="Product Other camera features" value={technicalDetailsTable.othercameraFeatures} className='input-field' placeholder='Enter Product Other camera features' onChange={(e) => handleTechnicalTableValues("othercameraFeatures", e)} />
            <input type='text' name="Product Audio Jack" id="Product Audio Jack" value={technicalDetailsTable.audioJack} className='input-field' placeholder='Enter Product Audio Jack' onChange={(e) => handleTechnicalTableValues("audioJack", e)} />
            <input type='text' name="Product Form factor" id="Product Form factor" value={technicalDetailsTable.formFactor} className='input-field' placeholder='Enter Product Form factor' onChange={(e) => handleTechnicalTableValues("formFactor", e)} />
            <input type='text' name="Product Battery Power Rating" id="Product Battery Power Rating" value={technicalDetailsTable.batteryPowerRating} className='input-field' placeholder='Enter Product Battery Power Rating' onChange={(e) => handleTechnicalTableValues("batteryPowerRating", e)} />
            <input type='text' name="Product Talk Time" id="Product Talk Time" value={technicalDetailsTable.productTalkTime} className='input-field' placeholder='Enter Product Talk Time' onChange={(e) => handleTechnicalTableValues("productTalkTime", e)} />
            <input type='text' name="Product Standby Time" id="Product Standby Time" value={technicalDetailsTable.productStandbyTime} className='input-field' placeholder='Enter Product Standby Time' onChange={(e) => handleTechnicalTableValues("productStandbyTime", e)} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'Tablet':
        return (
          <>
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(e) => { handleTechnicalTableValues("os", e); handleDyanmicTableValues("os", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Series" id="Product Series" value={technicalDetailsTable.series} className='input-field' placeholder='Enter Product Series' onChange={(e) => handleTechnicalTableValues("series", e)} />
            <input type='text' name="Product RAM" id="Product RAM" value={technicalDetailsTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(e) => { handleDyanmicTableValues("ram", e); handleTechnicalTableValues("ram", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product ROM" id="Product ROM" value={technicalDetailsTable.rom} className='input-field' placeholder='Enter Product ROM' onChange={(e) => { handleDyanmicTableValues("rom", e); handleTechnicalTableValues("rom", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Item Height" id="Product Item Height" value={technicalDetailsTable.itemHeight} className='input-field' placeholder='Enter Product Item Height' onChange={(e) => handleTechnicalTableValues("itemHeight", e)} />
            <input type='text' name="Product Item Width" id="Product Item Width" value={technicalDetailsTable.itemWidth} className='input-field' placeholder='Enter Product Item Width' onChange={(e) => handleTechnicalTableValues("itemWidth", e)} />
            <input type='text' name="Standing screen display size" id="Standing screen display size" value={technicalDetailsTable.standingScreenDisplaySize} className='input-field' placeholder='Enter Standing screen display size' onChange={(e) => handleTechnicalTableValues("standingScreenDisplaySize", e)} />
            <input type='text' name="Product Wireless communication technologies" id="Product Wireless communication technologies" value={technicalDetailsTable.wirelessTech} className='input-field' placeholder='Enter Product Wireless communication technologies' onChange={(e) => handleTechnicalTableValues("wirelessTech", e)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product GPS" id="Product GPS" value={technicalDetailsTable.gps} className='input-field' placeholder='Enter if Product has GPS' onChange={(e) => handleTechnicalTableValues("gps", e)} />
            <input type='text' name="Standing Screen Resolution" id="Standing Screen Resolution" value={technicalDetailsTable.screenResolution} className='input-field' placeholder='Enter Standing Screen Resolution' onChange={(e) => handleTechnicalTableValues("screenResolution", e)} />
            <input type='text' name="Product Other display features" id="Product Other display features" value={technicalDetailsTable.otherDisplayFeatures} className='input-field' placeholder='Enter Product Other display features' onChange={(e) => handleTechnicalTableValues("otherDisplayFeatures", e)} />
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Processor Brand" id="Product Processor Brand" value={technicalDetailsTable.processorBrand} className='input-field' placeholder='Enter Product Processor Brand' onChange={(e) => { handleTechnicalTableValues("processorBrand", e) }} />
            <input type='text' name="Product Processor Speed" id="Product Processor Speed" value={technicalDetailsTable.processorSpeed} className='input-field' placeholder='Enter Product Processor Speed' onChange={(e) => { handleTechnicalTableValues("processorSpeed", e) }} />
            <input type='text' name="Product Processor Count" id="Product Processor Count" value={technicalDetailsTable.processorCount} className='input-field' placeholder='Enter Product Processor Count' onChange={(e) => { handleTechnicalTableValues("processorCount", e) }} />
            <input type='text' name="Product Other camera features" id="Product Other camera features" value={technicalDetailsTable.othercameraFeatures} className='input-field' placeholder='Enter Product Other camera features' onChange={(e) => handleTechnicalTableValues("othercameraFeatures", e)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectivityTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(e) => handleTechnicalTableValues("connectivityTech", e)} />
            <input type='text' name="Rear Webcam Resolution" id="Rear Webcam Resolution" value={technicalDetailsTable.rearWebcamResolution} className='input-field' placeholder='Enter Product Rear Webcam Resolution' onChange={(e) => { handleTechnicalTableValues("rearWebcamResolution", e) }} />
            <input type='text' name="Product Front Webcam Resolution" id="Product Front Webcam Resolution" value={technicalDetailsTable.frontWebcamResolution} className='input-field' placeholder='Enter Product Front Webcam Resolution' onChange={(e) => handleTechnicalTableValues("frontWebcamResolution", e)} />
            <input type='text' name="Product Battery Power Rating" id="Product Battery Power Rating" value={technicalDetailsTable.batteryPowerRating} className='input-field' placeholder='Enter Product Battery Power Rating' onChange={(e) => handleTechnicalTableValues("batteryPowerRating", e)} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Form factor" id="Product Form factor" value={technicalDetailsTable.formFactor} className='input-field' placeholder='Enter Product Form factor' onChange={(e) => handleTechnicalTableValues("formFactor", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'TWS':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Playtime" id="Product Playtime" value={technicalDetailsTable.playtime} className='input-field' placeholder='Enter Product Playtime' onChange={(e) => { handleDyanmicTableValues("playtime", e); handleTechnicalTableValues("playtime", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Power Source" id="Product Power Source" value={technicalDetailsTable.powerSource} className='input-field' placeholder='Enter Product Power Source' onChange={(e) => handleTechnicalTableValues("powerSource", e)} />
            <input type='text' name="Product Microphone Form Factor" id="Product Microphone Form Factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form Factor' onChange={(e) => { handleTechnicalTableValues("microphoneFormFactor", e) }} />
            <input type='text' name="Product Microphone Technology" id="Product Microphone Technology" value={technicalDetailsTable.microphoneTech} className='input-field' placeholder='Enter Product Microphone Technology' onChange={(e) => { handleTechnicalTableValues("microphoneTech", e); handleDyanmicTableValues("microphoneTech", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Headphones Form Factor" id="Product Headphones Form Factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form Factor' onChange={(e) => { handleTechnicalTableValues("headphonesFormFactor", e) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Product Batteries Required" id="Product Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Product Battery Cell Composition" id="Product Battery Cell Composition" value={technicalDetailsTable.batteryCellComposition} className='input-field' placeholder='Enter Product Battery Cell Composition' onChange={(e) => { handleTechnicalTableValues("batteryCellComposition", e) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(e) => { handleTechnicalTableValues("cableFeature", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Bluetooth Version" id="Bluetooth Version" value={technicalDetailsTable.bluetoothVersion} className='input-field' placeholder='Enter Product Bluetooth Version' onChange={(e) => { handleTechnicalTableValues("bluetoothVersion", e); handleDyanmicTableValues("bluetoothVersion", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(e) => { handleTechnicalTableValues("maximumOperatingDistance", e) }} />
            <input type='text' name="Product Maximum Contains Liquid Contents" id="Product Maximum Contains Liquid Contents" value={technicalDetailsTable.containsLiquidContents} className='input-field' placeholder='Enter Product Contains Liquid Contents' onChange={(e) => { handleTechnicalTableValues("containsLiquidContents", e) }} />
            <input type='text' name="Product Includes Rechargable Battery" id="Product Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(e) => { handleTechnicalTableValues("includesRechargableBattery", e) }} />
            <input type='text' name="Product Material" id="Product Material" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'Bluetooth Neckband':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Playtime" id="Product Playtime" value={technicalDetailsTable.playtime} className='input-field' placeholder='Enter Product Playtime' onChange={(e) => { handleDyanmicTableValues("playtime", e); handleTechnicalTableValues("playtime", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Wireless communication technologies" id="Product Wireless communication technologies" value={technicalDetailsTable.wirelessTech} className='input-field' placeholder='Enter Product Wireless communication technologies' onChange={(e) => handleTechnicalTableValues("wirelessTech", e)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectivityTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(e) => handleTechnicalTableValues("connectivityTech", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Other display features" id="Product Other display features" value={technicalDetailsTable.otherDisplayFeatures} className='input-field' placeholder='Enter Product Other display features' onChange={(e) => handleTechnicalTableValues("otherDisplayFeatures", e)} />
            <input type='text' name="Product Audio Jack" id="Product Audio Jack" value={technicalDetailsTable.audioJack} className='input-field' placeholder='Enter Product Audio Jack' onChange={(e) => handleTechnicalTableValues("audioJack", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(e) => handleTechnicalTableValues("microphoneFormFactor", e)} />
            <input type='text' name="Product Microphone Technology" id="Product Microphone Technology" value={technicalDetailsTable.microphoneTech} className='input-field' placeholder='Enter Product Microphone Technology' onChange={(e) => { handleTechnicalTableValues("microphoneTech", e); handleDyanmicTableValues("microphoneTech", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Headphones Form factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(e) => handleTechnicalTableValues("headphonesFormFactor", e)} />
            <input type='text' name="Product Power Source" id="Product Power Source" value={technicalDetailsTable.powerSource} className='input-field' placeholder='Enter Product Power Source' onChange={(e) => handleTechnicalTableValues("powerSource", e)} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Product Batteries Required" id="Product Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Bluetooth Version" id="Bluetooth Version" value={technicalDetailsTable.bluetoothVersion} className='input-field' placeholder='Enter Product Bluetooth Version' onChange={(e) => { handleTechnicalTableValues("bluetoothVersion", e); handleDyanmicTableValues("bluetoothVersion", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(e) => { handleTechnicalTableValues("cableFeature", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(e) => { handleTechnicalTableValues("maximumOperatingDistance", e) }} />
            <input type='text' name="Product Includes Rechargable Battery" id="Product Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(e) => { handleTechnicalTableValues("includesRechargableBattery", e) }} />
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(e) => { handleTechnicalTableValues("maximumOperatingDistance", e) }} />
            <input type='text' name="Includes Rechargable Battery" id="Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(e) => { handleTechnicalTableValues("includesRechargableBattery", e) }} />
          </>)
      case 'Bluetooth Speaker':
        return (
          <>
            <input type='text' name="Product Speaker Type" id="Product Speaker Type" value={technicalDetailsTable.speakerType} className='input-field' placeholder='Enter Product Speaker Type' onChange={(e) => handleTechnicalTableValues("speakerType", e)} />
            <input type='text' name="Product Peak Power Handling - Speakers" id="Product Peak Power Handling - Speakers" value={technicalDetailsTable.peakPowerHandlingSpeakers} className='input-field' placeholder='Enter Product Peak Power Handling - Speakers' onChange={(e) => handleTechnicalTableValues("peakPowerHandlingSpeakers", e)} />
            <input type='text' name="Product RMS Power Range - Amplifiers" id="Product RMS Power Range - Amplifiers" value={technicalDetailsTable.RMSPowerRangeAmplifiers} className='input-field' placeholder='Enter Product RMS Power Range - Amplifiers' onChange={(e) => handleTechnicalTableValues("RMSPowerRangeAmplifiers", e)} />
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Play Time" id="Product Play Time" value={technicalDetailsTable.playTime} className='input-field' placeholder='Enter Product Play Time' onChange={(e) => { handleTechnicalTableValues("playTime", e); handleDyanmicTableValues("playTime", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />

          </>)
      case 'Bluetooth Headphones':
        return (
          <>
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Product Playback Time" id="Product Playback Time" value={technicalDetailsTable.playbackTime} className='input-field' placeholder='Enter Product Playback Time' onChange={(e) => { handleDyanmicTableValues("playbackTime", e); handleTechnicalTableValues("playbackTime", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleDyanmicTableValues("compatibleDevices", e); handleTechnicalTableValues("compatibleDevices", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectivityTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(e) => handleTechnicalTableValues("connectivityTech", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(e) => handleTechnicalTableValues("microphoneFormFactor", e)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(e) => handleTechnicalTableValues("headphonesFormFactor", e)} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(e) => { handleTechnicalTableValues("cableFeature", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(e) => { handleTechnicalTableValues("maximumOperatingDistance", e) }} />
            <input type='text' name="Product Battery Power Rating" id="Product Battery Power Rating" value={technicalDetailsTable.batteryPowerRating} className='input-field' placeholder='Enter Product Battery Power Rating' onChange={(e) => handleTechnicalTableValues("batteryPowerRating", e)} />
          </>)
      case 'Wired Headphones':
        return (
          <>
            <input type='text' name="Product Hardware Platform" id="Product Hardware Platform" value={technicalDetailsTable.hardwarePlatform} className='input-field' placeholder='Enter Product Hardware Platform' onChange={(e) => handleTechnicalTableValues("hardwarePlatform", e)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(e) => handleTechnicalTableValues("microphoneFormFactor", e)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(e) => handleTechnicalTableValues("headphonesFormFactor", e)} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(e) => { handleTechnicalTableValues("cableFeature", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'Wired Earphones':
        return (
          <>
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleTechnicalTableValues("compatibleDevices", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(e) => handleTechnicalTableValues("microphoneFormFactor", e)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(e) => handleTechnicalTableValues("headphonesFormFactor", e)} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(e) => { handleTechnicalTableValues("cableFeature", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
            <input type='text' name="Product Spec Text" id="Product Spec Text" value={technicalDetailsTable.specText} className='input-field' placeholder='Enter Product Spec Text' onChange={(e) => handleTechnicalTableValues("specText", e)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(e) => handleTechnicalTableValues("inTheBox", e)} />
          </>)
      case 'Adapter':
        return (
          <>
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleTechnicalTableValues("compatibleDevices", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(e) => { handleTechnicalTableValues("wattage", e); handleDyanmicTableValues("wattage", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Power Source" id="Product Power Source" value={technicalDetailsTable.powerSource} className='input-field' placeholder='Enter Product Power Source' onChange={(e) => { handleTechnicalTableValues("powerSource", e) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Product Number of Ports" id="Product Number of Ports" value={technicalDetailsTable.numberOfPorts} className='input-field' placeholder='Enter Product Number of Ports' onChange={(e) => { handleTechnicalTableValues("numberOfPorts", e) }} />
            <input type='text' name="Product Total Usb Ports" id="Product Total Usb Ports" value={technicalDetailsTable.totalUsbPorts} className='input-field' placeholder='Enter Product Total Usb Ports' onChange={(e) => { handleTechnicalTableValues("totalUsbPorts", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
          </>)
      case 'Charging Cable':
        return (
          <>
            <input type='text' name="Product Item Height" id="Product Item Height" value={technicalDetailsTable.itemHeight} className='input-field' placeholder='Enter Product Item Height' onChange={(e) => handleTechnicalTableValues("itemHeight", e)} />
            <input type='text' name="Product Item Width" id="Product Item Width" value={technicalDetailsTable.itemWidth} className='input-field' placeholder='Enter Product Item Width' onChange={(e) => handleTechnicalTableValues("itemWidth", e)} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleTechnicalTableValues("compatibleDevices", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Number Of Memory Sticks" id="Product Number Of Memory Sticks" value={technicalDetailsTable.numberOfMemorySticks} className='input-field' placeholder='Enter Product Number Of Memory Sticks' onChange={(e) => handleTechnicalTableValues("numberOfMemorySticks", e)} />
            <input type='text' name="Product AC Adapter Current" id="Product AC Adapter Current" value={technicalDetailsTable.ACAdapterCurrent} className='input-field' placeholder='Enter Product AC Adapter Current' onChange={(e) => handleTechnicalTableValues("ACAdapterCurrent", e)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectiveTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(e) => handleTechnicalTableValues("connectiveTech", e)} />
            <input type='text' name="Product Number of Ports" id="Product Number of Ports" value={technicalDetailsTable.numberOfPorts} className='input-field' placeholder='Enter Product Number of Ports' onChange={(e) => { handleTechnicalTableValues("numberOfPorts", e) }} />
            <input type='text' name="Product Total Usb Ports" id="Product Total Usb Ports" value={technicalDetailsTable.totalUsbPorts} className='input-field' placeholder='Enter Product Total Usb Ports' onChange={(e) => { handleTechnicalTableValues("totalUsbPorts", e) }} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Data Transfer Rate" id="Product Data Transfer Rate" value={technicalDetailsTable.dataTransferRate} className='input-field' placeholder='Enter Product Data Transfer Rate' onChange={(e) => { handleTechnicalTableValues("dataTransferRate", e) }} />
            <input type='text' name="Product Cable Type" id="Product Cable Type" value={technicalDetailsTable.cableType} className='input-field' placeholder='Enter Product Cable Type' onChange={(e) => { handleTechnicalTableValues("cableType", e) }} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(e) => { handleTechnicalTableValues("wattage", e); handleDyanmicTableValues("wattage", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(e) => { handleTechnicalTableValues("material", e) }} />
          </>)
      case 'Power Bank':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleTechnicalTableValues("compatibleDevices", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(e) => { handleTechnicalTableValues("wattage", e); handleDyanmicTableValues("wattage", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
          </>)
      case 'Smart TV':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product Memory Storage Capacity" id="Product Memory Storage Capacity" value={technicalDetailsTable.memoryStorageCapacity} className='input-field' placeholder='Enter Product Memory Storage Capacity' onChange={(e) => { handleTechnicalTableValues("memoryStorageCapacity", e) }} />
            <input type='text' name="Product Ram Memory Installed Size" id="Product Ram Memory Installed Size" value={technicalDetailsTable.ramMemoryInstalledSize} className='input-field' placeholder='Enter Product Ram Memory Installed Size' onChange={(e) => { handleTechnicalTableValues("ramMemoryInstalledSize", e) }} />
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(e) => handleTechnicalTableValues("os", e)} />
            <input type='text' name="Product Hardware Interface" id="Product Hardware Interface" value={technicalDetailsTable.hardwareInterface} className='input-field' placeholder='Enter Product Hardware Interface' onChange={(e) => handleTechnicalTableValues("hardwareInterface", e)} />
            <input type='text' name="Product Graphics Coprocessor" id="Product Graphics Coprocessor" value={technicalDetailsTable.graphicsCoprocessor} className='input-field' placeholder='Enter Product Graphics Coprocessor' onChange={(e) => handleTechnicalTableValues("graphicsCoprocessor", e)} />
            <input type='text' name="Product Tuner Technology" id="Product Tuner Technology" value={technicalDetailsTable.tunerTechnology} className='input-field' placeholder='Enter Product Tuner Technology' onChange={(e) => handleTechnicalTableValues("tunerTechnology", e)} />
            <input type='text' name="Product Response Time" id="Product Response Time" value={technicalDetailsTable.responseTime} className='input-field' placeholder='Enter Product Response Time' onChange={(e) => handleTechnicalTableValues("responseTime", e)} />
            <input type='text' name="Product Resolution" id="Product Resolution" value={technicalDetailsTable.resolution} className='input-field' placeholder='Enter Product Resolution' onChange={(e) => handleTechnicalTableValues("resolution", e)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Remote Control Description" id="Product Remote Control Description" value={technicalDetailsTable.remoteControlDescription} className='input-field' placeholder='Enter Product Remote Control Description' onChange={(e) => handleTechnicalTableValues("remoteControlDescription", e)} />
            <input type='text' name="Product Remote Control Type" id="Product Remote Control Type" value={technicalDetailsTable.remoteControlType} className='input-field' placeholder='Enter Product Remote Control Type' onChange={(e) => handleTechnicalTableValues("remoteControlType", e)} />
            <input type='text' name="Product Display Technology" id="Product Display Technology" value={technicalDetailsTable.displayTechnology} className='input-field' placeholder='Enter Product Display Technology' onChange={(e) => { handleTechnicalTableValues("displayTechnology", e) }} />
          </>)
      case 'Laptop':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(e) => { handleTechnicalTableValues("batteries", e) }} />
            <input type='text' name="Product RAM" id="Product RAM" value={technicalDetailsTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(e) => { handleDyanmicTableValues("ram", e); handleTechnicalTableValues("ram", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Memory Storage Capacity" id="Product Memory Storage Capacity" value={technicalDetailsTable.memoryStorageCapacity} className='input-field' placeholder='Enter Product Memory Storage Capacity' onChange={(e) => { handleTechnicalTableValues("memoryStorageCapacity", e) }} />
            <input type='text' name="Product Flash Memory Installed Size" id="Product Flash Memory Installed Size" value={technicalDetailsTable.flashMemoryInstalledSize} className='input-field' placeholder='Enter Product Flash Memory Installed Size' onChange={(e) => { handleTechnicalTableValues("flashMemoryInstalledSize", e) }} />
            <input type='text' name="Product Ram Memory Installed Size" id="Product Ram Memory Installed Size" value={technicalDetailsTable.ramMemoryInstalledSize} className='input-field' placeholder='Enter Product Ram Memory Installed Size' onChange={(e) => { handleTechnicalTableValues("ramMemoryInstalledSize", e) }} />
            <input type='text' name="Product Maximum Memory Supported" id="Product Maximum Memory Supported" value={technicalDetailsTable.maximumMemorySupported} className='input-field' placeholder='Enter Product Maximum Memory Supported' onChange={(e) => { handleTechnicalTableValues("maximumMemorySupported", e) }} />
            <input type='text' name="Product Ram Memory Technology" id="Product Ram Memory Technology" value={technicalDetailsTable.ramMemoryTechnology} className='input-field' placeholder='Enter Product Ram Memory Technology' onChange={(e) => { handleTechnicalTableValues("ramMemoryTechnology", e) }} />
            <input type='text' name="Product Hard Drive Interface" id="Product Hard Drive Interface" value={technicalDetailsTable.hardDriveInterface} className='input-field' placeholder='Enter Product Hard Drive Interface' onChange={(e) => { handleTechnicalTableValues("hardDriveInterface", e) }} />
            <input type='text' name="Product Hard Disk Description" id="Product Hard Disk Description" value={technicalDetailsTable.hardDiskDescription} className='input-field' placeholder='Enter Product Hard Disk Description' onChange={(e) => { handleTechnicalTableValues("hardDiskDescription", e) }} />
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(e) => handleTechnicalTableValues("os", e)} />
            <input type='text' name="Product Processor Brand" id="Product Processor Brand" value={technicalDetailsTable.processorBrand} className='input-field' placeholder='Enter Product Processor Brand' onChange={(e) => { handleTechnicalTableValues("processorBrand", e) }} />
            <input type='text' name="Product Processor Speed" id="Product Processor Speed" value={technicalDetailsTable.processorSpeed} className='input-field' placeholder='Enter Product Processor Speed' onChange={(e) => { handleTechnicalTableValues("processorSpeed", e) }} />
            <input type='text' name="Product Processor Type" id="Product Processor Type" value={technicalDetailsTable.processorType} className='input-field' placeholder='Enter Product Processor Type' onChange={(e) => { handleTechnicalTableValues("processorType", e) }} />
            <input type='text' name="Product Processor Count" id="Product Processor Count" value={technicalDetailsTable.processorCount} className='input-field' placeholder='Enter Product Processor Count' onChange={(e) => { handleTechnicalTableValues("processorCount", e) }} />
            <input type='text' name="Product Processor Model Number" id="Product Processor Model Number" value={technicalDetailsTable.processorModelNumber} className='input-field' placeholder='Enter Product Processor Model Number' onChange={(e) => { handleTechnicalTableValues("processorModelNumber", e) }} />
            <input type='text' name="Product Processor Model Number" id="Product Processor Model Number" value={technicalDetailsTable.processorModelNumber} className='input-field' placeholder='Enter Product Processor Model Number' onChange={(e) => { handleTechnicalTableValues("processorModelNumber", e) }} />
            <input type='text' name="Product Graphics Card Description" id="Product Graphics Card Description" value={technicalDetailsTable.graphicsCardDescription} className='input-field' placeholder='Enter Product Graphics Card Description' onChange={(e) => handleTechnicalTableValues("graphicsCardDescription", e)} />
            <input type='text' name="Product Graphics RAM Type" id="Product Graphics RAM Type" value={technicalDetailsTable.graphicsRAMType} className='input-field' placeholder='Enter Product Graphics RAM Type' onChange={(e) => handleTechnicalTableValues("graphicsRAMType", e)} />
            <input type='text' name="Product Graphics Card Interface" id="Product Graphics Card Interface" value={technicalDetailsTable.graphicsCardInterface} className='input-field' placeholder='Enter Product Graphics Card Interface' onChange={(e) => handleTechnicalTableValues("graphicsCardInterface", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Standing screen display size" id="Standing screen display size" value={technicalDetailsTable.standingScreenDisplaySize} className='input-field' placeholder='Enter Standing screen display size' onChange={(e) => handleTechnicalTableValues("standingScreenDisplaySize", e)} />
            <input type='text' name="Product Display Type" id="Product Display Type" value={technicalDetailsTable.displayType} className='input-field' placeholder='Enter Product Display Type' onChange={(e) => handleTechnicalTableValues("displayType", e)} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesRequired", e) }} />
            <input type='text' name="Product Battery Cell Composition" id="Product Battery Cell Composition" value={technicalDetailsTable.batteryCellComposition} className='input-field' placeholder='Enter Product Battery Cell Composition' onChange={(e) => { handleTechnicalTableValues("batteryCellComposition", e) }} />
            <input type='text' name="Product Wireless Type" id="Product Wireless Type" value={technicalDetailsTable.wirelessType} className='input-field' placeholder='Enter Product Wireless Type' onChange={(e) => handleTechnicalTableValues("wirelessType", e)} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Device interface - primary" id="Product Device interface - primary" value={technicalDetailsTable.deviceInterface} className='input-field' placeholder='Enter Product Device interface - primary' onChange={(e) => handleTechnicalTableValues("deviceInterface", e)} />
            <input type='text' name="Product Form factor" id="Product Form factor" value={technicalDetailsTable.formFactor} className='input-field' placeholder='Enter Product Form factor' onChange={(e) => handleTechnicalTableValues("formFactor", e)} />
          </>)
      case 'Wifi Smart Speaker':
        return (
          <>
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(e) => { handleTechnicalTableValues("compatibleDevices", e) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.specialFeatures} className='input-field' placeholder='Enter Product Special features' onChange={(e) => handleTechnicalTableValues("specialFeatures", e)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(e) => handleTechnicalTableValues("mountingHardware", e)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(e) => handleTechnicalTableValues("numberOfItems", e)} />
            <input type='text' name="Product Audio Output Mode" id="Product Audio Output Mode" value={technicalDetailsTable.audioOutputMode} className='input-field' placeholder='Enter Product Audio Output Mode' onChange={(e) => handleTechnicalTableValues("audioOutputMode", e)} />
            <input type='text' name="Product Speaker Connectivity" id="Product Speaker Connectivity" value={technicalDetailsTable.speakerConnectivity} className='input-field' placeholder='Enter Product Speaker Connectivity' onChange={(e) => { handleTechnicalTableValues("speakerConnectivity", e) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Product Batteries Required" id="Product Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(e) => { handleTechnicalTableValues("batteriesIncluded", e) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(e) => { handleTechnicalTableValues("connectorType", e); handleDyanmicTableValues("connectorType", e) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Mounting Type" id="Product Mounting Type" value={technicalDetailsTable.mountingType} className='input-field' placeholder='Enter Product Mounting Type' onChange={(e) => { handleTechnicalTableValues("mountingType", e) }} />
          </>)
      case 'Security Camera':
        return (
          <>
            <input type='text' name="Product ASIN" id="Product ASIN" value={technicalDetailsTable.ASIN} className='input-field' placeholder='Enter Product ASIN' onChange={(e) => { handleTechnicalTableValues("ASIN", e) }} />
          </>)


      case 'Miscellaneous':
        return (
          <></>
        )

      default:
        return <>
          <p className='alert alert-danger' >Select Product Type first</p>
        </>
    }
  }

  return (
    <>
      <div className="catelogue_Page section_Wrapper">
        <div className="catelogue_Page_Header">
          <h4 className='catelogue_Page_Heading'>Catelogue Add Product</h4>
        </div>
        <form className="catelogue_Form" onSubmit={handleFormPreview}>
          <fieldset className='catelogue_Fieldset' >
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="catalogue_Dropdown">
                  {L1Selected ? (<p>{L1Selected}</p>) : (<p>Select L1</p>)}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  hL1List.map((item, index) => (
                    <Dropdown.Item key={index} value={item} onClick={() => setL1Selected(item)}>{item}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="catalogue_Dropdown">
                  {L2Selected ? (<p>{L2Selected}</p>) : (<p>Select L2</p>)}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  hL2List.map((item, index) => (
                    <Dropdown.Item key={index} value={item} onClick={() => setL2Selected(item)}>{item}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="catalogue_Dropdown">
                  {L3Selected ? (<p>{L3Selected}</p>) : (<p>Select L3</p>)}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  hL3List.map((item, index) => (
                    <Dropdown.Item key={index} value={item} onClick={() => setL3Selected(item)}>{item}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="catalogue_Dropdown">
                  {classificationSelected ? (<p>{classificationSelected}</p>) : (<p>Select Product Classification</p>)}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  productClassifications.map((item, index) => (
                    <Dropdown.Item key={index} value={item} onClick={() => setClassificationSelected(item)}>{item}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>

            {
              classificationSelected === 'Coming Soon' ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="catalogue_Dropdown">
                      {advancePayment ? (<p>{advancePayment}</p>) : (<p>Is Advance Payment Available?</p>)}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      advancePaymentOptions.map((item, index) => (
                        <Dropdown.Item key={index} value={item} onClick={() => setAdvancePayment(item)}>{item}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              ) : ('')
            }
          </fieldset>
          <h4 className="Catalogue_Section_Heading">Product Info</h4>
          <div className="catelogue_Form_Group">
            <input type='text' name="Product Name" id="Product Name" value={name} className='input-field' placeholder='Enter Product Name' onChange={(e) => setName(e.target.value)} />
            <input type='text' name="Product EAN" id="Product EAN" value={ean} className='input-field' placeholder='Enter Product EAN' onChange={(e) => setEan(e.target.value)} />
            <input type='text' name="Product HSN" id="Product HSN" value={hsn} className='input-field' placeholder='Enter Product HSN' onChange={(e) => setHsn(e.target.value)} />
          </div>
          <div className="catelogue_Form_Group">
            <input type='text' name="Product Description" id="Product Description" value={description} className='input-field' placeholder='Enter Product Description' onChange={(e) => setDescription(e.target.value)} />
            <p className="catalogue_Hint">Add "~" seperated Product Description</p>
          </div>
          <br />
          <h4 className="Catalogue_Section_Heading">Product technical Info</h4>
          <div className="catelogue_Form_Group">
            <input type='text' name="Product Brand" id="Product Brand" className='input-field' placeholder='Enter Product Brand' value={brand} onChange={(e) => { handleTechnicalTableValues("brand", e); setBrand(e.target.value) }} />
            <input type='text' name="Product Manufacturer" id="Product Manufacturer" value={manufacturer} className='input-field' placeholder='Enter Product Manufacturer' onChange={(e) => { handleTechnicalTableValues("manufacturer", e); setManufacturer(e.target.value) }} />
            <input type='text' name="Product Model Number" id="Product Model Number" className='input-field' placeholder='Enter Product Model Number' value={modelNo} onChange={(e) => { handleTechnicalTableValues("modelNo", e); setModelNo(e.target.value) }} />
            <input type='text' name="Product Model Name" id="Product Model Name" className='input-field' placeholder='Enter Product Model Name' value={modelName} onChange={(e) => { handleTechnicalTableValues("modelName", e); setModelName(e.target.value) }} />
            <input type='text' name="Product Model Year" id="Product Model Year" className='input-field' placeholder='Enter Product Model Year' value={modelYear} onChange={(e) => { handleTechnicalTableValues("modelYear", e); setModelYear(e.target.value) }} />
            <input type='text' name="Product Color" id="Product Color" value={color} className='input-field' placeholder='Enter Product Color' onChange={(e) => { handleDyanmicTableValues("color", e); handleTechnicalTableValues("color", e); setColor(e.target.value) }} />
            {update && (<p className='catalogue_Hint' style={{ color: "red" }}>Please refill this value when updating product details</p>)}
            <input type='text' name="Product Weight" id="Product Weight" className='input-field' placeholder='Enter Product Weight' value={weight} onChange={(e) => { handleTechnicalTableValues("weight", e); setWeight(e.target.value) }} />
            <input type='text' name="Product Size" id="Product Size" value={size} className='input-field' placeholder='Enter Product Size/Dimensions' onChange={(e) => { handleTechnicalTableValues("size", e); setSize(e.target.value) }} />
            {/* <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Product Inward Date"
                inputClassName='input-field'

                shouldHighlightWeekends
              />
              <p>Enter Product Inward Date</p> */}
            {
              technicalDetaislComp(L2Selected)
            }
            <input type='text' name="Product Imported By" id="Product Imported By" value={technicalDetailsTable.importedBy} className='input-field' placeholder='Enter Product Imported By' onChange={(value) => { handleTechnicalTableValues("importedBy", value) }} />
            <input type='text' name="Product Country of Origin" id="Product Country of Origin" value={technicalDetailsTable.country} className='input-field' placeholder='Enter Product Country of Origin' onChange={(value) => handleTechnicalTableValues("country", value)} />
          </div>
          <div className="catelogue_Form_Group">
            <input type='text' name="Product MRP" id="Product MRP" value={mrp} className='input-field' placeholder='Enter Product MRP' onChange={(e) => setMrp(e.target.value)} />
            <input type='text' name="Product MOP" id="Product MOP" value={mop} className='input-field' placeholder='Enter Product MOP' onChange={(e) => setMop(e.target.value)} />
            {
              matches ? (
                <input type='tel' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
              ) : (
                <input type='number' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
              )
            }
          </div>
          <br />
          <div className="catelogue_Form_Group">
            <h4 className="Catalogue_Section_Heading">Alternate Products</h4>
            <input type='text' name="Product alternate color" id="Product alternate color" value={alternateColorProds} className='input-field' placeholder='Enter Alternate product EAN by color' onChange={(e) => setAlternateColorProds(e.target.value)} />
            <p className="catalogue_Hint">Add comma separated Product EAN numbers</p>
            <input type='text' name="Product alternate specs" id="Product alternate specs" value={alternateSpecProds} className='input-field' placeholder='Enter Alternate product EAN by spec' onChange={(e) => setAlternateSpecProds(e.target.value)} />
            <p className="catalogue_Hint">Add comma separated Product EAN numbers</p>

          </div>
          <br />
          <div className="catelogue_Form_Group">
            <h4 className="Catalogue_Section_Heading">Complimentary Products</h4>
            <input type='text' name="Product Immediate Complimentary" id="Product Immediate Complimentary" value={immediateComplimentary} className='input-field' placeholder='Enter Immediate Complimentary product EAN' onChange={(e) => setImmediateComplimentary(e.target.value)} />
            <p className="catalogue_Hint">Add comma separated Product Complimentary Catgories</p>
            <input type='text' name="Product Later Complimentary" id="Product Later Complimentary" value={laterComplimentary} className='input-field' placeholder='Enter Later Complimentary product EAN' onChange={(e) => setLaterComplimentary(e.target.value)} />
            <p className="catalogue_Hint">Add comma separated Product Complimentary Catgories</p>
          </div>

          {/* <div className="catelogue_Form_Group">
              {
                dynamicTableComp(L2Selected)
              }
            </div> */}
          <br />
          <h4>Product Images</h4>
          <div className="catelogue_Form_Group">
            <h6>Add Product Images</h6>
            <input type='file' name="Product Images" max={5} multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={(e) => imageHandleChange(e, 'product_image')} />
            <p className="catalogue_Hint">Add Maximun 5 images</p>
          </div>
          <br />
          <div className="catelogue_Form_Group">
            <h6>Add Product Gallery/ Banner images</h6>
            <input type='file' name="Product Images" max={3} multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={(e) => imageHandleChange(e, 'gallery_image')} />
            <p className="catalogue_Hint">Add Maximun 3 images</p>
          </div>
          <br />
          <div className={'button-Container'}>
            <button type='submit' className='submit-button' disabled={disabled} ><p>Preview Product Details</p></button>
          </div>
        </form>
      </div>
      <CommonModal
        modalShow={modalOpen}
        setModalShow={setModalOpen}
        ModalHeaderComp={modalHeaderComp}
        ModalBodyComp={modalBodyComp}
      />
    </>
  )
}

export default AddProductSection