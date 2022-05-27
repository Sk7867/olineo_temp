import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { addProductCatalogue, updateProductCatalogue } from '../../api/CatalogueApi';
import { UserDataContext } from '../../Contexts/UserContext'


//CSS
import './CateloguePage.css'
import { Dropdown } from 'react-bootstrap';
import DatePicker from 'react-modern-calendar-datepicker';

//Images
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import ModalComp from '../../components/ModalComponenr/Modal';
import CatelogueModal from '../../components/ModalComponenr/CatelogueModal';


toast.configure()
const AddProduct = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const { allProducts } = useContext(UserDataContext)
  const [selectedDay, setSelectedDay] = useState(null);
  const [product, setProduct] = useState({
    heading: '',
    name: '',
    ID: '',
    EAN: '',
    HSN: '',
    description: '',
    color: '',
    MRP: '',
    MOP: '',
    stock: '',
    weight: '',
    size: '',
    brand: '',
    modelYear: '',
    modelNumber: '',
    inwardDate: ''
  })

  const [imagesArray, setImagesArray] = useState([])
  const nav = useNavigate()
  const loc = useLocation()
  const [testFile, setTestFile] = useState(null)
  const [L1Selected, setL1Selected] = useState('')
  const [L2Selected, setL2Selected] = useState('')
  const [L3Selected, setL3Selected] = useState('')
  const [classificationSelected, setClassificationSelected] = useState('')
  const [dynamicTable, setDynamicTable] = useState({})
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
  const [galleryImages, setGalleryImages] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState('')
  const [technicalDetailsTable, setTechnicalDetailsTable] = useState({})
  const [bankOffers, setBankOffers] = useState([])
  const [alternateColorProds, setAlternateColorProds] = useState('')
  const [alternateSpecProds, setAlternateSpecProds] = useState('')
  const [immediateComplimentary, setImmediateComplimentary] = useState('')
  const [laterComplimentary, setLaterComplimentary] = useState('')

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

  useEffect(() => {
    if (loc.state) {
      let product = loc.state.product
      console.log(product);
      setProduct({
        heading: product.dynamicHeader,
        ID: product._id,
        EAN: product.ean,
        name: product.name,
        description: product.description,
        HSN: product.HSN,
        color: product.color,
        MRP: product.price.mrp,
        MOP: product.price.mop,
        size: product.productInfo.size,
        brand: product.productInfo.brand,
        modelYear: product.productInfo.modelYear,
        modelNumber: product.productInfo.modelNo,
        stock: product.qty,
        weight: product.productInfo.weight
      })
      setL1Selected(product.hierarchyL1)
      setL2Selected(product.hierarchyL2)
      setL3Selected(product.hierarchyL3)
      setClassificationSelected(product.classification)
      setImages(product.images.join(','))
      setGalleryImages(product.gallery.join(','))
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
  // console.log(product);

  useEffect(() => {
    if (selectedDay) {
      let dateEntered = selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year
      setProduct(prev => ({
        ...prev,
        inwardDate: dateEntered
      }))
    }
  }, [selectedDay])


  const handleInput = (prop, e) => {
    e.target
      ? setProduct({ ...product, [prop]: e.target.value })
      : setProduct({ ...product, [prop]: e.label })
  }

  const formSubmit = (e) => {
    e.preventDefault();
    let flatDiscountDetails = {
      value: '',
      from: null,
      to: null
    }
    let comboOfferDetails = {
      value: '',
      from: null,
      to: null
    }
    let containerDetails = []

    if (flatDiscount.value && flatDiscount.from && flatDiscount.to) {
      flatDiscountDetails.value = flatDiscount.value
      flatDiscountDetails.from = flatDiscount.from.year + '/' + flatDiscount.from.month + '/' + flatDiscount.from.day
      flatDiscountDetails.to = flatDiscount.to.year + '/' + flatDiscount.to.month + '/' + flatDiscount.to.day
    }
    if (comboOffer.value && comboOffer.from && comboOffer.to) {
      comboOfferDetails.value = comboOffer.value
      comboOfferDetails.from = comboOffer.from.year + '/' + comboOffer.from.month + '/' + comboOffer.from.day
      comboOfferDetails.to = comboOffer.to.year + '/' + comboOffer.to.month + '/' + comboOffer.to.day
    }
    if (containerOffer.valAdded) {
      let temp = {
        value: '',
        from: null,
        to: null
      }
      containerOffer.value.forEach(val => (
        temp.value = val,
        temp.from = containerOffer.from.year + '/' + containerOffer.from.month + '/' + containerOffer.from.day,
        temp.to = containerOffer.to.year + '/' + containerOffer.to.month + '/' + containerOffer.to.day,
        containerDetails.push(temp)
      ))
    }

    let imagesArray = images.split(',')
    let galleryImagesArray = galleryImages.split(',')

    let alternateProds = {
      color: alternateColorProds.split(','),
      spec: alternateSpecProds.split(',')
    }

    let dynamicHeader
    if (product && dynamicTable && checkDynamicTable(dynamicTable)) {
      let temp = Object.values(dynamicTable)
      dynamicHeader = product.name + ' (' + temp.map(item => (` ${item}`)) + ')'
    }

    let dynamicArray = dynamicHeader.replace(/[\(,\)]/g, '').split(" ");
    let dynamicArray2 = dynamicArray.filter(n => n)
    let url = dynamicArray2.join('-')

    if (loc.state) {
      updateProductCatalogue(
        product,
        technicalDetailsTable,
        dynamicHeader,
        url,
        imagesArray,
        galleryImagesArray,
        L1Selected,
        L2Selected,
        L3Selected,
        discountedPrice,
        classificationSelected,
        flatDiscountDetails,
        comboOfferDetails,
        containerDetails,
        alternateProds,
        bankOffers
      )
        .then(res => res ? (
          // console.log(res),
          toast.success('Product Added Successfully'),
          setProduct({
            name: '',
            ID: '',
            EAN: '',
            description: '',
            type: '',
            stock: '',
            weight: '',
            size: '',
            brand: '',
            modelYear: '',
          }),
          toast.success('Product Added Successfully'),
          nav('/catelogue-page')
        ) : (
          toast.error('Incomplete Data')))
    } else {
      addProductCatalogue(
        product,
        technicalDetailsTable,
        dynamicHeader,
        url,
        imagesArray,
        galleryImagesArray,
        L1Selected,
        L2Selected,
        L3Selected,
        discountedPrice,
        classificationSelected,
        flatDiscountDetails,
        comboOfferDetails,
        containerDetails,
        alternateProds,
        bankOffers)
        .then(res => res ? (
          // console.log(res),
          toast.success('Product Added Successfully'),
          setProduct({
            name: '',
            ID: '',
            EAN: '',
            description: '',
            type: '',
            stock: '',
            weight: '',
            size: '',
            brand: '',
            modelYear: '',
          }),
          toast.success('Product Added Successfully'),
          nav('/catelogue-page')
        ) : (
          toast.error('Incomplete Data')))
    }
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

  const productTypeList = [
    { value: 'Bluetooth_Headphones', label: 'Bluetooth Headphones' },
    { value: 'Wired_Headphones', label: 'Wired Headphones' },
    { value: 'Wired_Earphone', label: 'Wired Earphone' },
    { value: 'Tablet', label: 'Tablet' },
    { value: 'Smart_TV', label: 'Smart TV' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Wifi_Smart_Speaker', label: 'Wifi Smart Speaker' },
    { value: 'Security_Camera', label: 'Security Camera' },
  ]

  const hL1List = [
    'Mobile & Tablets',
    'Consumer Electronics'
  ]

  const hL2List = [
    'Smartphone',
    'Tablet',
    'Wired Headphones',
    'Wired Earphones',
    'Bluetooth Speaker',
    'Bluetooth Headphones',
    'Bluetooth Neckband',
    'Soundbar',
    'Adaptor',
    'Charging Cable',
    'Power Bank',
    'Smart TV',
    'TWS',
    // 'Wifi Smart Speaker',
    // 'Security Camera',
    'Miscellaneous'
    // { value: 'Soundbar', label: '' },
    // { value: 'Bluetooth_Speaker', label: '' },
    // { value: 'Bluetooth_Neckband_Earphones', label: '' },
    // { value: 'True_Wireless_Earbuds', label: 'True Wireless Earbuds' },
    // { value: 'Smartphone', label: '' },
    // { value: 'Adapter', label: '' },
    // { value: 'Charging_Cable', label: '' },
    // { value: 'Neckband_Bluetooth', label: '' },
    // { value: 'Power_Bank', label: '' },
    // { value: 'TWS', label: '' },
    // { value: 'Wired_Earphone', label: '' },
    // { value: 'Smart_TV', label: '' },
    // { value: 'Bluetooth_Headphones', label: '' },
    // { value: 'Wired_Headphones', label: '' },
    // { value: 'Wired_Earphone', label: '' },
    // { value: 'Tablet', label: '' },
    // { value: 'Powerbank', label: '' },
    // { value: 'Laptop', label: 'Laptop' },
    // { value: 'Wifi_Smart_Speaker', label: '' },
    // { value: 'Security_Camera', label: '' },
    // { value: 'Miscellaneous', label: '' },
  ]

  const hL3List = [
    'Premium',
    'Midrange',
    'Budget'
    // { value: 'Premium', label: '' },
    // { value: 'Midrange', label: '' },
    // { value: 'Budget', label: '' },
  ]

  const productClassifications = [
    'Normal',
    'Coming Soon',
    'Out Of Stock',
    'Temp Hidden'
    // { value: 'Normal', label: '' },
    // { value: 'Coming_Soon', label: '' },
    // { value: 'Out_Of_Stock', label: '' },
    // { value: 'Temp_Hidden', label: '' },
  ]

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
    if (product) {
      if (product.MRP !== '') {
        let discountPrice = parseInt(priceGiven)
        let price = product.MRP
        let discount = Math.floor(((price - discountPrice) / price) * 100)
        setFlatDiscount(prev => ({
          ...prev,
          value: isNaN(discount) ? null : discount
        }))
        setDiscountedPrice(priceGiven)
      }
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

  const imageHandleChange = (e) => {
    if (e.target.files) {
      let fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      // console.log(fileArray);

      setImagesArray((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file)) //Optional
    }
  }

  const renderImages = (source) => {
    return source.map((img, index) => {
      return (<img height={100} width={100} src={img} key={index} alt="" />)
    })
  }

  const handleDate = (e, type, prop) => {
    let key
    if (prop) {
      key = 'from'
    } else {
      key = 'to'
    }
    type(prev => ({ ...prev, [key]: e }))
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

  // console.log(bankOffers);
  const setImageLink = (e) => {
    var imageLink = e.target.value
    setImages(imageLink)
  }

  const setImageGalleryLink = (e) => {
    var imageLink = e.target.value
    // console.log(imageLink);
    setGalleryImages(imageLink)
  }

  const handleOpen = (e, images) => {
    e.preventDefault()
    setModalOpen(true)
    setModalData(images)
  }

  // const expData = () => {
  //   return (
  //     <>
  //       <div id='modal-header'>Hello There</div>
  //       <div id='modal-main' >
  //         New Body
  //       </div>
  //       <div id='modal-footer'>
  //         New Footer
  //       </div>
  //     </>
  //   )
  // }
  // console.log(containerEAN);
  // console.log(containerOffer);
  // console.log(containerProducts);

  // const dynamicTableComp = (type) => {
  //   switch (type) {
  //     case 'Soundbar':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Power Output" id="Product Power Output" value={dynamicTable.powerOutput} className='input-field' placeholder='Enter Product Power Output' onChange={(value) => { handleDyanmicTableValues("powerOutput", value); handleInput("powerOutput", value) }} />
  //             <input type='text' name="Product Channel Configuration" id="Product Channel Configuration" value={dynamicTable.channelConfiguration} className='input-field' placeholder='Enter Product Channel Configuration' onChange={(value) => { handleDyanmicTableValues("channelConfiguration", value); handleInput("channelConfiguration", value) }} />
  //             <input type='text' name="Product Connection type" id="Product Connection type" value={dynamicTable.connectionType} className='input-field' placeholder='Enter Product Connection Type' onChange={(value) => { handleDyanmicTableValues("connectionType", value); handleInput("connectionType", value) }} />
  //             <input type='text' name="Product Sattelite Channels" id="Product Sattelite Channels" value={dynamicTable.satteliteChannels} className='input-field' placeholder='Enter Product Sattelite Channels' onChange={(value) => { handleDyanmicTableValues("satteliteChannels", value); handleInput("satteliteChannels", value) }} />
  //             <input type='text' name="Product Included subwoofer" id="Product Included subwoofer" value={dynamicTable.includedSubwoofer} className='input-field' placeholder='Enter Product Included Subwoofer' onChange={(value) => { handleDyanmicTableValues("includedSubwoofer", value); handleInput("includedSubwoofer", value) }} />
  //             <input type='text' name="Product Input ports" id="Product Input ports" value={dynamicTable.inputPorts} className='input-field' placeholder='Enter Product Input ports' onChange={(value) => { handleDyanmicTableValues("inputPorts", value); handleInput("inputPorts", value) }} />
  //           </div>
  //         </>)
  //     case 'TWS':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Bluetooth Version" id="Product Bluetooth Version" value={dynamicTable.bluetoothVersion} className='input-field' placeholder='Enter Product Bluetooth Version' onChange={(value) => { handleDyanmicTableValues("bluetoothVersion", value); handleInput("bluetoothVersion", value) }} />
  //             <input type='text' name="Product Total Playback Time" id="Product Total Playback Time" value={dynamicTable.totalPlaybackTime} className='input-field' placeholder='Enter Product Total Playback Time' onChange={(value) => { handleDyanmicTableValues("totalPlaybackTime", value); handleInput("totalPlaybackTime", value) }} />
  //             <input type='text' name="Product Quick Charge" id="Product Quick Charge" value={dynamicTable.quickCharge} className='input-field' placeholder='Enter Product Quick Charge' onChange={(value) => { handleDyanmicTableValues("quickCharge", value); handleInput("quickCharge", value) }} />
  //           </div>
  //         </>)
  //     case 'Bluetooth_Neckband_Earphones':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Bluetooth Version" id="Product Bluetooth Version" value={dynamicTable.bluetoothVersion} className='input-field' placeholder='Enter Product Bluetooth Version' onChange={(value) => { handleDyanmicTableValues("bluetoothVersion", value); handleInput("bluetoothVersion", value) }} />
  //             <input type='text' name="Product Playback Time" id="Product Playback Time" value={dynamicTable.playbackTime} className='input-field' placeholder='Enter Product Playback Time' onChange={(value) => { handleDyanmicTableValues("playbackTime", value); handleInput("playbackTime", value) }} />
  //             <input type='text' name="Product Quick Charge" id="Product Quick Charge" value={dynamicTable.quickCharge} className='input-field' placeholder='Enter Product Quick Charge' onChange={(value) => { handleDyanmicTableValues("quickCharge", value); handleInput("quickCharge", value) }} />
  //           </div>
  //         </>)
  //     case 'Bluetooth_Headphones':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Bluetooth Version" id="Product Bluetooth Version" value={dynamicTable.bluetoothVersion} className='input-field' placeholder='Enter Product Bluetooth Version' onChange={(value) => { handleDyanmicTableValues("bluetoothVersion", value); handleInput("bluetoothVersion", value) }} />
  //             <input type='text' name="Product Playback Time" id="Product Playback Time" value={dynamicTable.playbackTime} className='input-field' placeholder='Enter Product Playback Time' onChange={(value) => { handleDyanmicTableValues("playbackTime", value); handleInput("playbackTime", value) }} />
  //             <input type='text' name="Product Quick Charge" id="Product Quick Charge" value={dynamicTable.quickCharge} className='input-field' placeholder='Enter Product Quick Charge' onChange={(value) => { handleDyanmicTableValues("quickCharge", value); handleInput("quickCharge", value) }} />
  //             <input type='text' name="Product Mic" id="Product Mic" value={dynamicTable.mic} className='input-field' placeholder='Enter Product Mic' onChange={(value) => { handleDyanmicTableValues("mic", value); handleInput("mic", value) }} />
  //           </div>
  //         </>)
  //     case 'Wired_Headphones':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Mic" id="Product Mic" value={dynamicTable.mic} className='input-field' placeholder='Enter Product Mic' onChange={(value) => { handleDyanmicTableValues("mic", value); handleInput("mic", value) }} />
  //             <input type='text' name="Product Wired Controls" id="Product Wired Controls" value={dynamicTable.wiredControls} className='input-field' placeholder='Enter Product Wired Controls' onChange={(value) => { handleDyanmicTableValues("wiredControls", value); handleInput("wiredControls", value) }} />
  //             <input type='text' name="Product Weight" id="Product Weight" value={dynamicTable.weight} className='input-field' placeholder='Enter Product Weight' onChange={(value) => { handleDyanmicTableValues("weight", value); handleInput("weight", value) }} />
  //           </div>
  //         </>)
  //     case 'Wired_Earphone':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Mic" id="Product Mic" value={dynamicTable.mic} className='input-field' placeholder='Enter Product Mic' onChange={(value) => { handleDyanmicTableValues("mic", value); handleInput("mic", value) }} />
  //             <input type='text' name="Product Wired Controls" id="Product Wired Controls" value={dynamicTable.wiredControls} className='input-field' placeholder='Enter Product Wired Controls' onChange={(value) => { handleDyanmicTableValues("wiredControls", value); handleInput("wiredControls", value) }} />
  //           </div>
  //         </>)
  //     case 'Powerbank':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Capacity" id="Product Capacity" value={dynamicTable.capacity} className='input-field' placeholder='Enter Product Capacity' onChange={(value) => { handleDyanmicTableValues("capacity", value); handleInput("capacity", value) }} />
  //             <input type='text' name="Product Output Ports" id="Product Output Ports" value={dynamicTable.outputPorts} className='input-field' placeholder='Enter Product Output Ports' onChange={(value) => { handleDyanmicTableValues("outputPorts", value); handleInput("outputPorts", value) }} />
  //             <input type='text' name="Product Fast Charging" id="Product Fast Charging" value={dynamicTable.fastCharging} className='input-field' placeholder='Enter Product Fast Charging' onChange={(value) => { handleDyanmicTableValues("fastCharging", value); handleInput("fastCharging", value) }} />
  //           </div>
  //         </>)
  //     case 'Tablet':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product RAM" id="Product RAM" value={dynamicTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleInput("ram", value) }} />
  //             <input type='text' name="Product Internal Storage" id="Product Internal Storage" value={dynamicTable.internalStorage} className='input-field' placeholder='Enter Product Internal Storage' onChange={(value) => { handleDyanmicTableValues("internalStorage", value); handleInput("internalStorage", value) }} />
  //             <input type='text' name="Product Screen Size" id="Product Screen Size" value={dynamicTable.screenSize} className='input-field' placeholder='Enter Product Screen Size' onChange={(value) => { handleDyanmicTableValues("screenSize", value); handleInput("screenSize", value) }} />
  //             <input type='text' name="Product Screen Resolution" id="Product Screen Resolution" value={dynamicTable.screenResolution} className='input-field' placeholder='Enter Product Screen Resolution' onChange={(value) => { handleDyanmicTableValues("screenResolution", value); handleInput("screenResolution", value) }} />
  //             <input type='text' name="Product Screen Type" id="Product Screen Type" value={dynamicTable.screenType} className='input-field' placeholder='Enter Product Screen Type' onChange={(value) => { handleDyanmicTableValues("screenType", value); handleInput("screenType", value) }} />
  //             {/* <input type='text' name="Product Screen Type" id="Product Screen Type" value={dynamicTable.screenType} className='input-field' placeholder='Enter Product Screen Type' onChange={(value) => handleDyanmicTableValues("screenType", value)} /> */}
  //           </div>
  //         </>)
  //     case 'Smart_TV':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Operating System" id="Product Operating System" value={dynamicTable.operatingSystem} className='input-field' placeholder='Enter Product Operating System' onChange={(value) => { handleDyanmicTableValues("operatingSystem", value); handleInput("operatingSystem", value) }} />
  //             <input type='text' name="Product Screen Size" id="Product Screen Size" value={dynamicTable.screenSize} className='input-field' placeholder='Enter Product Screen Size' onChange={(value) => { handleDyanmicTableValues("screenSize", value); handleInput("screenSize", value) }} />
  //             <input type='text' name="Product Screen Resolution" id="Product Screen Resolution" value={dynamicTable.screenResolution} className='input-field' placeholder='Enter Product Screen Resolution' onChange={(value) => { handleDyanmicTableValues("screenResolution", value); handleInput("screenResolution", value) }} />
  //             <input type='text' name="Product Display Technology" id="Product Display Technology" value={dynamicTable.displayTechnology} className='input-field' placeholder='Enter Product Display Technology' onChange={(value) => { handleDyanmicTableValues("displayTechnology", value); handleInput("displayTechnology", value) }} />
  //             <input type='text' name="Product Input ports" id="Product Input ports" value={dynamicTable.inputPorts} className='input-field' placeholder='Enter Product Input ports' onChange={(value) => { handleDyanmicTableValues("inputPorts", value); handleInput("inputPorts", value) }} />
  //             <input type='text' name="Product Refresh Rate" id="Product Refresh Rate" value={dynamicTable.refreshRate} className='input-field' placeholder='Enter Product Refresh Rate' onChange={(value) => { handleDyanmicTableValues("refreshRate", value); handleInput("refreshRate", value) }} />
  //           </div>
  //         </>)
  //     case 'Laptop':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product RAM" id="Product RAM" value={dynamicTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleInput("ram", value) }} />
  //             <input type='text' name="Product Internal Storage" id="Product Internal Storage" value={dynamicTable.internalStorage} className='input-field' placeholder='Enter Product Internal Storage' onChange={(value) => { handleDyanmicTableValues("internalStorage", value); handleInput("internalStorage", value) }} />
  //             <input type='text' name="Product Screen Size" id="Product Screen Size" value={dynamicTable.screenSize} className='input-field' placeholder='Enter Product Screen Size' onChange={(value) => { handleDyanmicTableValues("screenSize", value); handleInput("screenSize", value) }} />
  //             <input type='text' name="Product Screen Resolution" id="Product Screen Resolution" value={dynamicTable.screenResolution} className='input-field' placeholder='Enter Product Screen Resolution' onChange={(value) => { handleDyanmicTableValues("screenResolution", value); handleInput("screenResolution", value) }} />
  //             <input type='text' name="Product Screen Type" id="Product Screen Type" value={dynamicTable.screenType} className='input-field' placeholder='Enter Product Screen Type' onChange={(value) => { handleDyanmicTableValues("screenType", value); handleInput("screenType", value) }} />
  //             <input type='text' name="Product Graphics Card" id="Product Graphics Card" value={dynamicTable.graphicsCard} className='input-field' placeholder='Enter Product Graphics Card' onChange={(value) => { handleDyanmicTableValues("graphicsCard", value); handleInput("graphicsCard", value) }} />
  //           </div>
  //         </>)
  //     case 'Wifi_Smart_Speaker':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Supported smart assistants" id="Product Supported smart assistants" value={dynamicTable.supportedSmartAssistants} className='input-field' placeholder='Enter Product Supported smart assistants' onChange={(value) => { handleDyanmicTableValues("supportedSmartAssistants", value); handleInput("supportedSmartAssistants", value) }} />
  //             <input type='text' name="Product Power Output" id="Product Power Output" value={dynamicTable.powerOutput} className='input-field' placeholder='Enter Product Power Output' onChange={(value) => { handleDyanmicTableValues("powerOutput", value); handleInput("powerOutput", value) }} />
  //           </div>
  //         </>)
  //     case 'Security_Camera':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Sensor Resolution" id="Product Sensor Resolution" value={dynamicTable.sensorResolution} className='input-field' placeholder='Enter Product Sensor Resolution' onChange={(value) => { handleDyanmicTableValues("sensorResolution", value); handleInput("sensorResolution", value) }} />
  //           </div>
  //         </>)
  //     case 'Smartphone':
  //       return (
  //         <>
  //           <h4>Product Specific Details</h4>
  //           <div className="catelogue_Form_Group">
  //             <input type='text' name="Product Color" id="Product Color" value={dynamicTable.color} className='input-field' placeholder='Enter Product Color' onChange={(value) => { handleDyanmicTableValues("color", value); handleInput("oolor", value) }} />
  //             <input type='text' name="Product RAM" id="Product RAM" value={dynamicTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleInput("ram", value) }} />
  //             <input type='text' name="Product ROM" id="Product ROM" value={dynamicTable.rom} className='input-field' placeholder='Enter Product ROM' onChange={(value) => { handleDyanmicTableValues("rom", value); handleInput("rom", value) }} />
  //           </div>
  //         </>)

  //     case 'Miscellaneous':
  //       return (
  //         <></>
  //       )

  //     default:
  //       return <>
  //         <p className='alert alert-danger' >Select Product Type first</p>
  //       </>
  //   }
  // }

  const technicalDetaislComp = (type) => {
    switch (type) {
      case 'Soundbar':
        return (
          <>
            <input type='text' name="Product Power Output" id="Product Power Output" value={technicalDetailsTable.powerOutput} className='input-field' placeholder='Enter Product Maximum Power Output' onChange={(value) => { handleDyanmicTableValues("powerOutput", value); handleTechnicalTableValues("powerOutput", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleDyanmicTableValues("compatibleDevices", value); handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Audio Output Mode" id="Product Audio Output Mode" value={technicalDetailsTable.audioOutputMode} className='input-field' placeholder='Enter Product Audio Output Mode' onChange={(value) => handleTechnicalTableValues("audioOutputMode", value)} />
            <input type='text' name="Speaker Amplification Type" id="Speaker Amplification Type" value={technicalDetailsTable.speakerAmplificationType} className='input-field' placeholder='Enter Product Speaker Amplification Type' onChange={(value) => { handleTechnicalTableValues("speakerAmplificationType", value) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Includes Rechargable Battery" id="Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(value) => { handleTechnicalTableValues("includesRechargableBattery", value) }} />
          </>)
      case 'Smartphone':
        return (
          <>
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(value) => handleTechnicalTableValues("os", value)} />
            <input type='text' name="Product RAM" id="Product RAM" value={technicalDetailsTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleTechnicalTableValues("ram", value) }} />
            <input type='text' name="Product ROM" id="Product ROM" value={technicalDetailsTable.rom} className='input-field' placeholder='Enter Product ROM' onChange={(value) => { handleDyanmicTableValues("rom", value); handleTechnicalTableValues("rom", value) }} />
            <input type='text' name="Product Wireless communication technologies" id="Product Wireless communication technologies" value={technicalDetailsTable.wirelessTech} className='input-field' placeholder='Enter Product Wireless communication technologies' onChange={(value) => handleTechnicalTableValues("wirelessTech", value)} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectivityTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(value) => handleTechnicalTableValues("connectivityTech", value)} />
            <input type='text' name="Product GPS" id="Product GPS" value={technicalDetailsTable.gps} className='input-field' placeholder='Enter if Product has GPS' onChange={(value) => handleTechnicalTableValues("gps", value)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Display features" id="Product Display features" value={technicalDetailsTable.displayFeature} className='input-field' placeholder='Enter Product Display features' onChange={(value) => handleTechnicalTableValues("displayFeatures", value)} />
            <input type='text' name="Product Colours displayed" id="Product Colours displayed" value={technicalDetailsTable.colorsDisplayed} className='input-field' placeholder='Enter Product Colours displayed' onChange={(value) => handleTechnicalTableValues("colorsDisplayed", value)} />
            <input type='text' name="Product Other display features" id="Product Other display features" value={technicalDetailsTable.otherDisplayFeatures} className='input-field' placeholder='Enter Product Other display features' onChange={(value) => handleTechnicalTableValues("otherDisplayFeatures", value)} />
            <input type='text' name="Product Device interface - primary" id="Product Device interface - primary" value={technicalDetailsTable.deviceInterface} className='input-field' placeholder='Enter Product Device interface - primary' onChange={(value) => handleTechnicalTableValues("deviceInterface", value)} />
            <input type='text' name="Product Other camera features" id="Product Other camera features" value={technicalDetailsTable.othercameraFeatures} className='input-field' placeholder='Enter Product Other camera features' onChange={(value) => handleTechnicalTableValues("othercameraFeatures", value)} />
            <input type='text' name="Product Audio Jack" id="Product Audio Jack" value={technicalDetailsTable.audioJack} className='input-field' placeholder='Enter Product Audio Jack' onChange={(value) => handleTechnicalTableValues("audioJack", value)} />
            <input type='text' name="Product Form factor" id="Product Form factor" value={technicalDetailsTable.formFactor} className='input-field' placeholder='Enter Product Form factor' onChange={(value) => handleTechnicalTableValues("formFactor", value)} />
            <input type='text' name="Product Battery Power Rating" id="Product Battery Power Rating" value={technicalDetailsTable.batteryPowerRating} className='input-field' placeholder='Enter Product Battery Power Rating' onChange={(value) => handleTechnicalTableValues("batteryPowerRating", value)} />
            <input type='text' name="Product Talk Time" id="Product Talk Time" value={technicalDetailsTable.productTalkTime} className='input-field' placeholder='Enter Product Talk Time' onChange={(value) => handleTechnicalTableValues("productTalkTime", value)} />
            <input type='text' name="Product Standby Time" id="Product Standby Time" value={technicalDetailsTable.productStandbyTime} className='input-field' placeholder='Enter Product Standby Time' onChange={(value) => handleTechnicalTableValues("productStandbyTime", value)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(value) => handleTechnicalTableValues("inTheBox", value)} />
          </>)
      case 'Tablet':
        return (
          <>
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(value) => handleTechnicalTableValues("os", value)} />
            <input type='text' name="Product Series" id="Product Series" value={technicalDetailsTable.series} className='input-field' placeholder='Enter Product Series' onChange={(value) => handleTechnicalTableValues("series", value)} />
            <input type='text' name="Product RAM" id="Product RAM" value={technicalDetailsTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleTechnicalTableValues("ram", value) }} />
            <input type='text' name="Product ROM" id="Product ROM" value={technicalDetailsTable.rom} className='input-field' placeholder='Enter Product ROM' onChange={(value) => { handleDyanmicTableValues("rom", value); handleTechnicalTableValues("rom", value) }} />
            <input type='text' name="Product Item Height" id="Product Item Height" value={technicalDetailsTable.itemHeight} className='input-field' placeholder='Enter Product Item Height' onChange={(value) => handleTechnicalTableValues("itemHeight", value)} />
            <input type='text' name="Product Item Width" id="Product Item Width" value={technicalDetailsTable.itemWidth} className='input-field' placeholder='Enter Product Item Width' onChange={(value) => handleTechnicalTableValues("itemWidth", value)} />
            <input type='text' name="Standing screen display size" id="Standing screen display size" value={technicalDetailsTable.standingScreenDisplaySize} className='input-field' placeholder='Enter Standing screen display size' onChange={(value) => handleTechnicalTableValues("standingScreenDisplaySize", value)} />
            <input type='text' name="Standing Screen Resolution" id="Standing Screen Resolution" value={technicalDetailsTable.screenResolution} className='input-field' placeholder='Enter Standing Screen Resolution' onChange={(value) => handleTechnicalTableValues("screenResolution", value)} />
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(value) => { handleTechnicalTableValues("batteries", value) }} />
            <input type='text' name="Product Processor Brand" id="Product Processor Brand" value={technicalDetailsTable.processorBrand} className='input-field' placeholder='Enter Product Processor Brand' onChange={(value) => { handleTechnicalTableValues("processorBrand", value) }} />
            <input type='text' name="Product Processor Speed" id="Product Processor Speed" value={technicalDetailsTable.processorSpeed} className='input-field' placeholder='Enter Product Processor Speed' onChange={(value) => { handleTechnicalTableValues("processorSpeed", value) }} />
            <input type='text' name="Product Processor Count" id="Product Processor Count" value={technicalDetailsTable.processorCount} className='input-field' placeholder='Enter Product Processor Count' onChange={(value) => { handleTechnicalTableValues("processorCount", value) }} />
            <input type='text' name="Product Connectivity technologies" id="Product Connectivity technologies" value={technicalDetailsTable.connectivityTech} className='input-field' placeholder='Enter Product Connectivity technologies' onChange={(value) => handleTechnicalTableValues("connectivityTech", value)} />
            <input type='text' name="Rear Webcam Resolution" id="Rear Webcam Resolution" value={technicalDetailsTable.rearWebcamResolution} className='input-field' placeholder='Enter Product Rear Webcam Resolution' onChange={(value) => { handleTechnicalTableValues("rearWebcamResolution", value) }} />
            <input type='text' name="Product Front Webcam Resolution" id="Product Front Webcam Resolution" value={technicalDetailsTable.frontWebcamResolution} className='input-field' placeholder='Enter Product Front Webcam Resolution' onChange={(value) => handleTechnicalTableValues("frontWebcamResolution", value)} />
            <input type='text' name="Product Whats in the box" id="Product Whats in the box" value={technicalDetailsTable.inTheBox} className='input-field' placeholder='Enter Product  Whats in the box' onChange={(value) => handleTechnicalTableValues("inTheBox", value)} />
          </>)
      case 'TWS':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(value) => { handleTechnicalTableValues("batteries", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Playtime" id="Product Playtime" value={technicalDetailsTable.playtime} className='input-field' placeholder='Enter Product Playtime' onChange={(value) => { handleDyanmicTableValues("playtime", value); handleTechnicalTableValues("playtime", value) }} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Microphone Form Factor" id="Product Microphone Form Factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form Factor' onChange={(value) => { handleTechnicalTableValues("microphoneFormFactor", value) }} />
            <input type='text' name="Product Headphones Form Factor" id="Product Headphones Form Factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form Factor' onChange={(value) => { handleTechnicalTableValues("headphonesFormFactor", value) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(value) => { handleTechnicalTableValues("batteriesIncluded", value) }} />
            <input type='text' name="Product Batteries Required" id="Product Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesIncluded", value) }} />
            <input type='text' name="Product Battery Cell Composition" id="Product Battery Cell Composition" value={technicalDetailsTable.batteryCellComposition} className='input-field' placeholder='Enter Product Battery Cell Composition' onChange={(value) => { handleTechnicalTableValues("batteryCellComposition", value) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(value) => { handleTechnicalTableValues("cableFeature", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(value) => { handleTechnicalTableValues("maximumOperatingDistance", value) }} />
            <input type='text' name="Product Maximum Contains Liquid Contents" id="Product Maximum Contains Liquid Contents" value={technicalDetailsTable.containsLiquidContents} className='input-field' placeholder='Enter Product Maximum Contains Liquid Contents' onChange={(value) => { handleTechnicalTableValues("containsLiquidContents", value) }} />
            <input type='text' name="Product Includes Rechargable Battery" id="Product Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(value) => { handleTechnicalTableValues("includesRechargableBattery", value) }} />
          </>)
      case 'Bluetooth Neckband':
        return (
          <>
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(value) => handleTechnicalTableValues("microphoneFormFactor", value)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(value) => handleTechnicalTableValues("headphonesFormFactor", value)} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(value) => { handleTechnicalTableValues("cableFeature", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(value) => { handleTechnicalTableValues("material", value) }} />
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(value) => { handleTechnicalTableValues("maximumOperatingDistance", value) }} />
            <input type='text' name="Includes Rechargable Battery" id="Includes Rechargable Battery" value={technicalDetailsTable.includesRechargableBattery} className='input-field' placeholder='Enter Product Includes Rechargable Battery' onChange={(value) => { handleTechnicalTableValues("includesRechargableBattery", value) }} />
          </>)
      case 'Bluetooth Headphones':
        return (
          <>
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Product Playback Time" id="Product Playback Time" value={technicalDetailsTable.playbackTime} className='input-field' placeholder='Enter Product Playback Time' onChange={(value) => { handleDyanmicTableValues("playbackTime", value); handleTechnicalTableValues("playbackTime", value) }} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleDyanmicTableValues("compatibleDevices", value); handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Microphone Form factor" id="Product Microphone Form factor" value={technicalDetailsTable.microphoneFormFactor} className='input-field' placeholder='Enter Product Microphone Form factor' onChange={(value) => handleTechnicalTableValues("microphoneFormFactor", value)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(value) => handleTechnicalTableValues("headphonesFormFactor", value)} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(value) => { handleTechnicalTableValues("cableFeature", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Product Maximum Operating Distance" id="Product Maximum Operating Distance" value={technicalDetailsTable.maximumOperatingDistance} className='input-field' placeholder='Enter Product Maximum Operating Distance' onChange={(value) => { handleTechnicalTableValues("maximumOperatingDistance", value) }} />
          </>)
      case 'Wired Headphones':
        return (
          <>
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Microphone Technology" id="Product Microphone Technology" value={technicalDetailsTable.microphoneTechnology} className='input-field' placeholder='Enter Product Microphone Technology' onChange={(value) => handleTechnicalTableValues("microphoneTechnology", value)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(value) => handleTechnicalTableValues("headphonesFormFactor", value)} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(value) => { handleTechnicalTableValues("cableFeature", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(value) => { handleTechnicalTableValues("material", value) }} />
          </>)
      case 'Wired Earphones':
        return (
          <>
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Microphone Technology" id="Product Microphone Technology" value={technicalDetailsTable.microphoneTechnology} className='input-field' placeholder='Enter Product Microphone Technology' onChange={(value) => handleTechnicalTableValues("microphoneTechnology", value)} />
            <input type='text' name="Product Headphones factor" id="Product Headphones Form factor" value={technicalDetailsTable.headphonesFormFactor} className='input-field' placeholder='Enter Product Headphones Form factor' onChange={(value) => handleTechnicalTableValues("headphonesFormFactor", value)} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(value) => { handleTechnicalTableValues("batteriesIncluded", value) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Product Cable Feature" id="Product Cable Feature" value={technicalDetailsTable.cableFeature} className='input-field' placeholder='Enter Product Cable Feature' onChange={(value) => { handleTechnicalTableValues("cableFeature", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
            <input type='text' name="Material" id="Material" value={technicalDetailsTable.material} className='input-field' placeholder='Enter Product Material' onChange={(value) => { handleTechnicalTableValues("material", value) }} />
          </>)
      case 'Adaptor':
        return (
          <>
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(value) => { handleTechnicalTableValues("wattage", value); handleDyanmicTableValues("wattage", value) }} />
            <input type='text' name="Product Power Source" id="Product Power Source" value={technicalDetailsTable.powerSource} className='input-field' placeholder='Enter Product Power Source' onChange={(value) => { handleTechnicalTableValues("powerSource", value) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(value) => { handleTechnicalTableValues("batteriesIncluded", value) }} />
            <input type='text' name="Batteries Required" id="Batteries Required" value={technicalDetailsTable.batteriesRequired} className='input-field' placeholder='Enter Product Batteries Required' onChange={(value) => { handleTechnicalTableValues("batteriesRequired", value) }} />
            <input type='text' name="Product Number of Ports" id="Product Number of Ports" value={technicalDetailsTable.numberOfPorts} className='input-field' placeholder='Enter Product Number of Ports' onChange={(value) => { handleTechnicalTableValues("numberOfPorts", value) }} />
            <input type='text' name="Product Total Usb Ports" id="Product Total Usb Ports" value={technicalDetailsTable.totalUsbPorts} className='input-field' placeholder='Enter Product Total Usb Ports' onChange={(value) => { handleTechnicalTableValues("totalUsbPorts", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
          </>)
      case 'Charging Cable':
        return (
          <>
            <input type='text' name="Product Item Height" id="Product Item Height" value={technicalDetailsTable.itemHeight} className='input-field' placeholder='Enter Product Item Height' onChange={(value) => handleTechnicalTableValues("itemHeight", value)} />
            <input type='text' name="Product Item Width" id="Product Item Width" value={technicalDetailsTable.itemWidth} className='input-field' placeholder='Enter Product Item Width' onChange={(value) => handleTechnicalTableValues("itemWidth", value)} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(value) => { handleTechnicalTableValues("wattage", value); handleDyanmicTableValues("wattage", value) }} />
            <input type='text' name="Product Batteries Included" id="Product Batteries Included" value={technicalDetailsTable.batteriesIncluded} className='input-field' placeholder='Enter Product Batteries Included' onChange={(value) => { handleTechnicalTableValues("batteriesIncluded", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
          </>)
      case 'Power Bank':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(value) => { handleTechnicalTableValues("batteries", value) }} />
            <input type='text' name="Product Compatible Devices" id="Product Compatible Devices" value={technicalDetailsTable.compatibleDevices} className='input-field' placeholder='Enter Product Compatible Devices' onChange={(value) => { handleTechnicalTableValues("compatibleDevices", value) }} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Wattage" id="Product Wattage" value={technicalDetailsTable.wattage} className='input-field' placeholder='Enter Product Wattage' onChange={(value) => { handleTechnicalTableValues("wattage", value); handleDyanmicTableValues("wattage", value) }} />
            <input type='text' name="Connector Type" id="Connector Type" value={technicalDetailsTable.connectorType} className='input-field' placeholder='Enter Product Connector Type' onChange={(value) => { handleTechnicalTableValues("connectorType", value); handleDyanmicTableValues("connectorType", value) }} />
          </>)
      case 'Smart TV':
        return (
          <>
            <input type='text' name="Product Batteries" id="Product Batteries" value={technicalDetailsTable.batteries} className='input-field' placeholder='Enter Product Batteries' onChange={(value) => { handleTechnicalTableValues("batteries", value) }} />
            <input type='text' name="Product Memory Storage Capacity" id="Product Memory Storage Capacity" value={technicalDetailsTable.memoryStorageCapacity} className='input-field' placeholder='Enter Product Memory Storage Capacity' onChange={(value) => { handleTechnicalTableValues("memoryStorageCapacity", value) }} />
            <input type='text' name="Product Ram Memory Installed Size" id="Product Ram Memory Installed Size" value={technicalDetailsTable.ramMemoryInstalledSize} className='input-field' placeholder='Enter Product Ram Memory Installed Size' onChange={(value) => { handleTechnicalTableValues("ramMemoryInstalledSize", value) }} />
            <input type='text' name="Product OS" id="Product OS" value={technicalDetailsTable.os} className='input-field' placeholder='Enter Product OS' onChange={(value) => handleTechnicalTableValues("os", value)} />
            <input type='text' name="Product Hardware Interface" id="Product Hardware Interface" value={technicalDetailsTable.hardwareInterface} className='input-field' placeholder='Enter Product Hardware Interface' onChange={(value) => handleTechnicalTableValues("hardwareInterface", value)} />
            <input type='text' name="Product Graphics Coprocessor" id="Product Graphics Coprocessor" value={technicalDetailsTable.graphicsCoprocessor} className='input-field' placeholder='Enter Product Graphics Coprocessor' onChange={(value) => handleTechnicalTableValues("graphicsCoprocessor", value)} />
            <input type='text' name="Product Tuner Technology" id="Product Tuner Technology" value={technicalDetailsTable.tunerTechnology} className='input-field' placeholder='Enter Product Tuner Technology' onChange={(value) => handleTechnicalTableValues("tunerTechnology", value)} />
            <input type='text' name="Product Response Time" id="Product Response Time" value={technicalDetailsTable.responseTime} className='input-field' placeholder='Enter Product Response Time' onChange={(value) => handleTechnicalTableValues("responseTime", value)} />
            <input type='text' name="Product Resolution" id="Product Resolution" value={technicalDetailsTable.resolution} className='input-field' placeholder='Enter Product Resolution' onChange={(value) => handleTechnicalTableValues("resolution", value)} />
            <input type='text' name="Product Special features" id="Product Special features" value={technicalDetailsTable.spacialFeature} className='input-field' placeholder='Enter Product Special features' onChange={(value) => handleTechnicalTableValues("spacialFeature", value)} />
            <input type='text' name="Product Mounting Hardware" id="Product Mounting Hardware" value={technicalDetailsTable.mountingHardware} className='input-field' placeholder='Enter Product Mounting Hardware' onChange={(value) => handleTechnicalTableValues("mountingHardware", value)} />
            <input type='text' name="Product Number Of Items" id="Product Number Of Items" value={technicalDetailsTable.numberOfItems} className='input-field' placeholder='Enter Product Number Of Items' onChange={(value) => handleTechnicalTableValues("numberOfItems", value)} />
            <input type='text' name="Product Remote Control Description" id="Product Remote Control Description" value={technicalDetailsTable.remoteControlDescription} className='input-field' placeholder='Enter Product Remote Control Description' onChange={(value) => handleTechnicalTableValues("remoteControlDescription", value)} />
            <input type='text' name="Product Remote Control Type" id="Product Remote Control Type" value={technicalDetailsTable.remoteControlType} className='input-field' placeholder='Enter Product Remote Control Type' onChange={(value) => handleTechnicalTableValues("remoteControlType", value)} />
            <input type='text' name="Product Display Technology" id="Product Display Technology" value={dynamicTable.displayTechnology} className='input-field' placeholder='Enter Product Display Technology' onChange={(value) => { handleTechnicalTableValues("displayTechnology", value) }} />
          </>)
      // case 'Laptop':
      //   return (
      //     <>
      //       <h4>Product Specific Details</h4>
      //       <div className="catelogue_Form_Group">
      //         <input type='text' name="Product RAM" id="Product RAM" value={dynamicTable.ram} className='input-field' placeholder='Enter Product RAM' onChange={(value) => { handleDyanmicTableValues("ram", value); handleInput("ram", value) }} />
      //         <input type='text' name="Product Internal Storage" id="Product Internal Storage" value={dynamicTable.internalStorage} className='input-field' placeholder='Enter Product Internal Storage' onChange={(value) => { handleDyanmicTableValues("internalStorage", value); handleInput("internalStorage", value) }} />
      //         <input type='text' name="Product Screen Size" id="Product Screen Size" value={dynamicTable.screenSize} className='input-field' placeholder='Enter Product Screen Size' onChange={(value) => { handleDyanmicTableValues("screenSize", value); handleInput("screenSize", value) }} />
      //         <input type='text' name="Product Screen Resolution" id="Product Screen Resolution" value={dynamicTable.screenResolution} className='input-field' placeholder='Enter Product Screen Resolution' onChange={(value) => { handleDyanmicTableValues("screenResolution", value); handleInput("screenResolution", value) }} />
      //         <input type='text' name="Product Screen Type" id="Product Screen Type" value={dynamicTable.screenType} className='input-field' placeholder='Enter Product Screen Type' onChange={(value) => { handleDyanmicTableValues("screenType", value); handleInput("screenType", value) }} />
      //         <input type='text' name="Product Graphics Card" id="Product Graphics Card" value={dynamicTable.graphicsCard} className='input-field' placeholder='Enter Product Graphics Card' onChange={(value) => { handleDyanmicTableValues("graphicsCard", value); handleInput("graphicsCard", value) }} />
      //       </div>
      //     </>)
      // case 'Wifi_Smart_Speaker':
      //   return (
      //     <>
      //       <h4>Product Specific Details</h4>
      //       <div className="catelogue_Form_Group">
      //         <input type='text' name="Product Supported smart assistants" id="Product Supported smart assistants" value={dynamicTable.supportedSmartAssistants} className='input-field' placeholder='Enter Product Supported smart assistants' onChange={(value) => { handleDyanmicTableValues("supportedSmartAssistants", value); handleInput("supportedSmartAssistants", value) }} />
      //         <input type='text' name="Product Power Output" id="Product Power Output" value={dynamicTable.powerOutput} className='input-field' placeholder='Enter Product Power Output' onChange={(value) => { handleDyanmicTableValues("powerOutput", value); handleInput("powerOutput", value) }} />
      //       </div>
      //     </>)
      // case 'Security_Camera':
      //   return (
      //     <>
      //       <h4>Product Specific Details</h4>
      //       <div className="catelogue_Form_Group">
      //         <input type='text' name="Product Sensor Resolution" id="Product Sensor Resolution" value={dynamicTable.sensorResolution} className='input-field' placeholder='Enter Product Sensor Resolution' onChange={(value) => { handleDyanmicTableValues("sensorResolution", value); handleInput("sensorResolution", value) }} />
      //       </div>
      //     </>)


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
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper">
          <div className="catelogue_Page_Header">
            <h4 className='catelogue_Page_Heading'>Catelogue Add Product</h4>
          </div>
          <form className="catelogue_Form" onSubmit={formSubmit}>
            <fieldset className='catelogue_Fieldset' >
              {/* <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <div className="catalogue_Dropdown">
                    {productTypeSelected ? (<p>{productTypeSelected.label}</p>) : (<p>Select Product Type</p>)}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    productTypeList.map((item, index) => (
                      <Dropdown.Item key={index} value={item.value} onClick={() => setProductTypeSelected(item)}>{item.label}</Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown> */}

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
            </fieldset>
            <div className="catelogue_Form_Group">
              <h4>Dynamic Header Preview</h4>
              {
                product.name && (
                  <p>{product.name}
                    {dynamicTable && checkDynamicTable(dynamicTable) && (
                      (Object.values(dynamicTable)).map((item, index) => (
                        <span key={index} >{index === 0 ? ' (' : ''}{item}{(Object.values(dynamicTable).length - 1) === index ? ')' : ','} </span>
                      )))
                    }
                  </p>
                )
              }
            </div>
            <h4 className="Catalogue_Section_Heading">Product Info</h4>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product Name" id="Product Name" value={product.name} className='input-field' placeholder='Enter Product Name' onChange={(value) => handleInput("name", value)} />
              <input type='text' name="Product EAN" id="Product EAN" value={product.EAN} className='input-field' placeholder='Enter Product EAN' onChange={(value) => handleInput("EAN", value)} />
              <input type='text' name="Product HSN" id="Product HSN" value={product.HSN} className='input-field' placeholder='Enter Product HSN' onChange={(value) => handleInput("HSN", value)} />
            </div>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product Description" id="Product Description" value={product.description} className='input-field' placeholder='Enter Product Description' onChange={(value) => handleInput("description", value)} />
              <p className="catalogue_Hint">Add "~" seperated Product Description</p>
            </div>
            <br />
            <h4 className="Catalogue_Section_Heading">Product technical Info</h4>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product Brand" id="Product Brand" className='input-field' placeholder='Enter Product Brand' value={technicalDetailsTable.brand} onChange={(value) => handleTechnicalTableValues("brand", value)} />
              <input type='text' name="Product Manufacturer" id="Product Manufacturer" value={technicalDetailsTable.manufacturer} className='input-field' placeholder='Enter Product Manufacturer' onChange={(value) => handleTechnicalTableValues("manufacturer", value)} />
              <input type='text' name="Product Model Number" id="Product Model Number" className='input-field' placeholder='Enter Product Model Number' value={technicalDetailsTable.modelNumber} onChange={(value) => handleTechnicalTableValues("modelNumber", value)} />
              <input type='text' name="Product Model Name" id="Product Model Name" className='input-field' placeholder='Enter Product Model Name' value={technicalDetailsTable.modelName} onChange={(value) => handleTechnicalTableValues("modelName", value)} />
              <input type='text' name="Product Model Year" id="Product Model Year" className='input-field' placeholder='Enter Product Model Year' value={technicalDetailsTable.modelYear} onChange={(value) => handleTechnicalTableValues("modelYear", value)} />
              <input type='text' name="Product Color" id="Product Color" value={technicalDetailsTable.color} className='input-field' placeholder='Enter Product Color' onChange={(value) => { handleDyanmicTableValues("color", value); handleTechnicalTableValues("color", value) }} />
              <input type='text' name="Product Weight" id="Product Weight" className='input-field' placeholder='Enter Product Weight' value={technicalDetailsTable.weight} onChange={(value) => handleTechnicalTableValues("weight", value)} />
              <input type='text' name="Product Size" id="Product Size" value={technicalDetailsTable.size} className='input-field' placeholder='Enter Product Size/Dimensions' onChange={(value) => handleTechnicalTableValues("size", value)} />
              <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Product Inward Date"
                inputClassName='input-field'

                shouldHighlightWeekends
              />
              {
                technicalDetaislComp(L2Selected)
              }
              <input type='text' name="Product Imported By" id="Product Imported By" value={technicalDetailsTable.importedBy} className='input-field' placeholder='Enter Product Imported By' onChange={(value) => { handleTechnicalTableValues("importedBy", value) }} />
              <input type='text' name="Product Country of Origin" id="Product Country of Origin" value={technicalDetailsTable.country} className='input-field' placeholder='Enter Product Country of Origin' onChange={(value) => handleTechnicalTableValues("country", value)} />
            </div>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product MRP" id="Product MRP" value={product.MRP} className='input-field' placeholder='Enter Product MRP' onChange={(value) => handleInput("MRP", value)} />
              <input type='text' name="Product MOP" id="Product MOP" value={product.MOP} className='input-field' placeholder='Enter Product MOP' onChange={(value) => handleInput("MOP", value)} />
              {
                matches ? (
                  <input type='tel' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' value={product.stock} onChange={(value) => handleInput("stock", value)} />
                ) : (
                  <input type='number' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' value={product.stock} onChange={(value) => handleInput("stock", value)} />
                )
              }
            </div>
            <br />
            <div className="catelogue_Form_Group">
              <h4 className="Catalogue_Section_Heading">Alternate Products</h4>
              <input type='text' name="Product alternate color" id="Product alternate color" value={alternateColorProds} className='input-field' placeholder='Enter Alternate product EAN by color' onChange={(e) => setAlternateColorProds(e.target.value)} />
              <input type='text' name="Product MOP" id="Product MOP" value={alternateSpecProds} className='input-field' placeholder='Enter Alternate product EAN by spec' onChange={(e) => setAlternateSpecProds(e.target.value)} />
              <p className="catalogue_Hint">Add comma Product EAN numbers</p>

            </div>
            <br />
            <div className="catelogue_Form_Group">
              <h4 className="Catalogue_Section_Heading">Complimentary Products</h4>
              <input type='text' name="Product Immediate Complimentary" id="Product Immediate Complimentary" value={immediateComplimentary} className='input-field' placeholder='Enter Immediate Complimentary product EAN' onChange={(e) => setImmediateComplimentary(e.target.value)} />
              <input type='text' name="Product Later Complimentary" id="Product Later Complimentary" value={laterComplimentary} className='input-field' placeholder='Enter Later Complimentary product EAN' onChange={(e) => setLaterComplimentary(e.target.value)} />
              <p className="catalogue_Hint">Add comma Product EAN numbers</p>
            </div>

            {/* <div className="catelogue_Form_Group">
              {
                dynamicTableComp(L2Selected)
              }
            </div> */}
            {/* <div className="catelogue_Form_Group catalogue_Image_Preview">
              {imagesArray && (imagesArray.length > 0) ? (
                renderImages(imagesArray)
              ) : ('')}
            </div> */}
            <br />
            <h4>Product Images</h4>
            <div className="catelogue_Form_Group">
              {/* <input type='file' name="Product Images" multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={imageHandleChange} />
              <p className="catalogue_Hint">Add Maximun 5 images</p> */}
              <input type='url' name="Product Images" id="Product Images" className='input-field' placeholder='Enter Product Images URL' value={images} onChange={(e) => setImageLink(e)} />
              <p className="catalogue_Hint">Add comma seperated Image links, Add maximum 5 Images</p>
              <div className={'button-Container'} onClick={(e) => handleOpen(e, images)}>
                <button type='submit' className='submit-button'><p>Preview Images</p></button>
              </div>
            </div>
            <div className="catelogue_Form_Group">
              {/* <input type='file' name="Product Images" multiple id="Product Images" className='input-field' placeholder='Enter Product Images URL' onChange={imageHandleChange} />
              <p className="catalogue_Hint">Add Maximun 5 images</p> */}
              <input type='url' name="Product Gallery Images" id="Product Gallery Images" className='input-field' placeholder='Enter Product Gallery Images URL' value={galleryImages} onChange={(e) => setImageGalleryLink(e)} />
              <p className="catalogue_Hint">Add comma seperated Image links</p>
              <div className={'button-Container'} onClick={(e) => handleOpen(e, galleryImages)}>
                <button type='submit' className='submit-button'><p>Preview Images</p></button>
              </div>
            </div>
            <br />
            {/* <input type="file" name="file" id="file" onChange={testImageHandle} /> */}
            <h4>Add Product Offers</h4>
            <div className="addoffer_Input">
              <p>Enter Flat Discount Price</p>
              <input type="text" name='Discounted Price' id='Discounted Price' className='input-field' placeholder='Discounted Price/ MOP' onChange={(e) => handleDiscountCalc(e.target.value)} />
              <p>{flatDiscount.value ? (<>Discount Given : {flatDiscount.value}</>) : ''}</p>
              <DatePicker
                value={flatDiscount.from}
                onChange={(e) => handleDate(e, setFlatDiscount, true)}
                inputPlaceholder="Discount Valid From Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {flatDiscount.value && !flatDiscount.from && (<p className='alert alert-danger'>Enter Date!</p>)}
              <DatePicker
                value={flatDiscount.to}
                onChange={(e) => handleDate(e, setFlatDiscount, false)}
                inputPlaceholder="Discount Valid Till Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {flatDiscount.value && !flatDiscount.to && (<p className='alert alert-danger'>Enter Date!</p>)}
            </div>
            <div className="addoffer_Input">
              <p>Enter Combo Offer Product</p>
              <div className="addoffer_Input2">
                <input type="text" name='Free Product' id='Free Product' className='input-field' placeholder='Enter Free Product EAN' onChange={(e) => setComboOffer(prev => ({ ...prev, value: e.target.value }))} />
                <div className={'button-Container'}>
                  <button className='submit-button' onClick={searchComboProduct} disabled={(comboOffer.value === null) ? true : false}   ><p>Search Product</p></button>
                </div>
              </div>
              <p>{comboProduct.loaded ? (
                comboProduct.product.length === 0 ? (
                  <div>Product Not Found, Enter Correct EAN number</div>
                ) : (
                  <span>Product Selected : {comboProduct.product[0].name}, EAN : {comboProduct.product[0].ean}</span>
                )
              ) : ('')}</p>
              <DatePicker
                value={comboOffer.from}
                onChange={(e) => handleDate(e, setComboOffer, true)}
                inputPlaceholder="Combo Valid From Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {comboOffer.value && !comboOffer.from && (<p className='alert alert-danger'>Enter Date!</p>)}
              <DatePicker
                value={comboOffer.to}
                onChange={(e) => handleDate(e, setComboOffer, false)}
                inputPlaceholder="Combo Valid Till Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {comboOffer.value && !comboOffer.to && (<p className='alert alert-danger'>Enter Date!</p>)}
            </div>
            <div className="addoffer_Input">
              <p>Enter Container Offer Products</p>
              {
                containerEAN.map((item, index) => (
                  <div key={index} className='addoffer_Container' >
                    <div className="addoffer_Input2">
                      {
                        containerEAN.length > 1 && (
                          <div className="input_Delete">
                            <img src={deleteIcon} alt="" onClick={() => handleRemoveInput(index)} />
                          </div>
                        )
                      }
                      <input type="text" name='productEAN' value={item.productEAN} id='productEAN' className='input-field' placeholder='Enter Free Product EAN' onChange={(e) => handleContainerEAN(e, index)} />
                      <div className={'button-Container'}>
                        <button className='submit-button' onClick={(e) => handleContainerProds(e, index)} ><p>Search Product</p></button>
                      </div>
                    </div>
                    <p>{containerProducts[index].loaded ? (
                      containerProducts[index].productInfo ? (
                        <span>Product Selected : {containerProducts[index].productInfo.name}, EAN : {containerProducts[index].productInfo.ean}</span>
                      ) : (
                        <div>Product Not Found, Enter Correct EAN number</div>
                      )
                    ) : ('')}</p>
                  </div>
                ))
              }
              <DatePicker
                value={containerOffer.from}
                onChange={(e) => handleDate(e, setContainerOffer, true)}
                inputPlaceholder="Container Valid From Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {containerOffer.value.length > 0 && !containerOffer.from && (<p className='alert alert-danger'>Enter Date!</p>)}
              <DatePicker
                value={containerOffer.to}
                onChange={(e) => handleDate(e, setContainerOffer, false)}
                inputPlaceholder="Container Valid Till Date"
                inputClassName='input-field'
                shouldHighlightWeekends
              />
              {containerOffer.value.length > 0 && !containerOffer.to && (<p className='alert alert-danger'>Enter Date!</p>)}
              <div className={'button-Container'}>
                <button type='submit' className='submit-button' onClick={handleAddInput} ><p>Add Container Product</p></button>
              </div>
            </div>
            <br />
            <h4>Add Product Offers</h4>
            <div className="addoffer_Input">
              {bankOffers && bankOffers.length > 0 && (
                bankOffers.map((offer, index) => (
                  <>
                    <div className="addoffer_Input2 bank_offer_heading">
                      <div className="input_Delete">
                        <img src={deleteIcon} alt="" onClick={() => handleRemoveBankOffer(index)} />
                      </div>
                      <p>Offer {index + 1}</p>
                    </div>
                    <input type="text" name='offerName' id='offerName' className='input-field' placeholder='Add Offer Heading' value={offer.offerName} onChange={(e) => handleBankOffer(e, index)} />
                    <input type="text" name='offerAvail' id='offerAvail' className='input-field' placeholder='Add Offer Conditions' value={offer.offerAvail} onChange={(e) => handleBankOffer(e, index)} />
                    <p className="catalogue_Hint">Add "~" seperated Offer Conditions</p>
                    <DatePicker
                      value={bankOffers[index].fromDate}
                      onChange={(e) => handleBankOfferDate(e, true, index)}
                      inputPlaceholder="Offer Valid From Date"
                      inputName='from'
                      inputClassName='input-field'
                      shouldHighlightWeekends
                    />
                    {bankOffers[index].offerName && !bankOffers[index].from && (<p className='alert alert-danger'>Enter Date!</p>)}
                    <DatePicker
                      value={bankOffers[index].toDate}
                      onChange={(e) => handleBankOfferDate(e, false, index)}
                      inputPlaceholder="Offer Valid Till Date"
                      inputClassName='input-field'
                      shouldHighlightWeekends
                    />
                    {bankOffers[index].offerName && !bankOffers[index].to && (<p className='alert alert-danger'>Enter Date!</p>)}
                  </>
                ))
              )}
              <div className={'button-Container'}>
                <button type='submit' className='submit-button' onClick={handleAddBankOffer} ><p>Add Bank Offers</p></button>
              </div>
            </div>
            <div className={'button-Container'}>
              <button type='submit' className='submit-button'><p>Submit</p></button>
            </div>
          </form>
        </div>
      </div>
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
      <CatelogueModal modalShow={modalOpen} setModalShow={setModalOpen} modalData={modalData} />
      {/* {modalData()}
      </ModalComp> */}
    </>
  )
}

export default AddProduct