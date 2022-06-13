import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap'
import { UserDataContext } from '../../Contexts/UserContext'
import DatePicker from 'react-date-picker';
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import { updateProductCatalogue, updateProductOffers } from '../../api/CatalogueApi';
import { Slide, toast, ToastContainer } from 'react-toastify'
import { addCoupon } from '../../api/couponApi';

toast.configure()
const AddOffers = ({ setHeaderData }) => {
  const nav = useNavigate()
  const { allProducts, setAllProducts } = useContext(UserDataContext)
  const [selectedProduct, setSelectedProduct] = useState({
    loaded: false,
    product: []
  })
  const [eanEntered, setEanEntered] = useState('')
  const [discountGiven, setDiscountGiven] = useState(null)
  const [comboEAN, setComboEAN] = useState(null)
  const [comboProduct, setComboProduct] = useState({
    loaded: false,
    product: []
  })
  const [offerTypeSelected, setOfferTypeSelected] = useState('')
  const [value, onChange] = useState(new Date());
  const [discountedPrice, setDiscountedPrice] = useState('')
  const [offers, setoffers] = useState({
    flatDiscount: {
      value: '',
      from: null,
      to: null
    },
    combo: {
      value: '',
      from: null,
      to: null
    },
    conetainer: [],
    coupon: {
      couponName: '',
      value: '',
      upTo: '',
      to: null
    }
  })
  const [bankOffers, setBankOffers] = useState([])
  const [holdContainerValue, setHoldContainerValue] = useState('')

  const [flatDisOffers, setFlatDisOffers] = useState({
    value: '',
    from: new Date(),
    to: new Date()
  })

  const [comboOffersHold, setComboOffersHold] = useState({
    value: '',
    from: new Date(),
    to: new Date()
  })

  const [contOffersHold, setContOffersHold] = useState({
    value: '',
    from: new Date(),
    to: new Date()
  })

  const [couponOffersHold, setCouponOffersHold] = useState({
    couponName: '',
    value: '',
    upTo: '',
    to: new Date()
  })
  const [bankOfferHold, setBankOfferHold] = useState({
    offerHeading: '',
    offerName: '',
    offerAvail: '',
    storeId: '',
    from: '',
    to: ''
  })
  const [offerHeadingSelected, setOfferHeadingSelected] = useState('')

  const availOffers = [
    'Discount',
    'Combo',
    'Container',
    'Coupon',
    'Bank/Store Offer'
  ]

  const offerHeadingOptions = [
    'Bank Offer',
    'Store Offer'
  ]

  // console.log(value);
  useEffect(() => {
    if (holdContainerValue) {
      let containerArray = holdContainerValue.split(',')
      setContOffersHold(prev => ({ ...prev, value: containerArray }))
    }
  }, [holdContainerValue])


  const handleInput = (prop, prop2, prop3, e) => {
    e.target
      ? prop({ ...prop2, [prop3]: e.target.value })
      : prop({ ...prop2, [prop3]: e.label })
  }

  useEffect(() => {
    if (flatDisOffers.value) {
      setoffers(prev => ({ ...prev, flatDiscount: flatDisOffers }))
    }
  }, [flatDisOffers.value, flatDisOffers])
  useEffect(() => {
    if (comboOffersHold.value) {
      setoffers(prev => ({ ...prev, combo: comboOffersHold }))
    }
  }, [comboOffersHold.value, comboOffersHold])
  useEffect(() => {
    if (contOffersHold.value) {
      setoffers(prev => ({ ...prev, conetainer: contOffersHold }))
    }
  }, [contOffersHold.value, contOffersHold])

  const handleRemoveBankOffer = (index) => {
    let list = [...bankOffers]
    list.splice(index, 1)
    setBankOffers(list)
  }

  const handleAddBankOffer = (e) => {
    e.preventDefault();
    setBankOffers([...bankOffers, { offerHeading: '', storeId: '', offerName: '', offerAvail: '', from: null, to: null }])
  }

  const handleBankOffer = (e, index) => {
    const { name, value } = e.target
    let list = [...bankOffers]
    list[index][name] = value
    setBankOffers(list)
  }

  const handleBankOfferHeading = (item, index, prop) => {
    console.log(item, index, prop);
    let list = [...bankOffers]
    list[index][prop] = item
    setBankOffers(list)
  }

  const handleBankOfferDate = (e, prop, index) => {
    const value = e
    let list = [...bankOffers]
    list[index][prop] = value
    setBankOffers(list)
  }


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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct.loaded) {
      if (couponOffersHold.value) {
        let products = eanEntered.split(',')
        addCoupon(couponOffersHold, products)
          .then(res => {
            console.log(res)
            nav('/catelogue-page')
          })
      } else {
        let newProductArray = selectedProduct.product.map(function (elem) {
          let prices = elem.price
          let existingBankOffers = [...elem.offers]
          let newOffersArray
          if (offers.flatDiscount.value) {
            let dis = parseInt(offers.flatDiscount.value)
            let mop = parseInt(elem.price.mop)
            let disPrice = Math.floor(((((dis * 0.01) * mop) - mop) * -1))
            prices.discountPrice = disPrice
          }
          if (bankOffers.length > 0) {
            newOffersArray = existingBankOffers.concat(bankOffers)
          }
          let item = { ...elem, discount: offers, price: prices, offers: newOffersArray }
          return item
        })
        newProductArray.forEach(product => (
          updateProductOffers(product)
            .then(res => {
              console.log(res)
              nav('/catelogue-page')
            })
        ))
        console.log(newProductArray);
      }
    } else {
      toast.error('Add/Search Product(s) First')
    }
  }

  console.log(couponOffersHold);

  const searchEAN = (e) => {
    e.preventDefault();
    let ean = eanEntered.split(',')
    let product = []
    ean.forEach(item => {
      let demo = allProducts.products.filter((product) => product.ean === item)
      product.push(demo[0])
    })
    // let product = allProducts.products.filter((product) => product.ean === eanEntered)
    setSelectedProduct({
      loaded: true,
      product: [...product]
    })
  }

  const searchComboProduct = (e) => {
    e.preventDefault();
    let product = allProducts.products.filter((product) => product.ean === comboEAN)
    setComboProduct({
      loaded: true,
      product: product
    })
  }

  const handleDiscountCalc = (priceGiven) => {
    if (selectedProduct.loaded) {
      if (selectedProduct.product.length > 0) {
        let MOP = parseInt(priceGiven)
        let price = selectedProduct.product[0].price
        let discount = ((price - MOP) / price) * 100
        setDiscountGiven(isNaN(discount) ? null : discount)
      }
    }
  }

  const handleDate = (e, type, key) => {
    type(prev => ({ ...prev, [key]: e }))
  }
  // console.log(bankOffers);
  const onlyNumberRegex = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      let value = e.target.value
      handleInput(setFlatDisOffers, flatDisOffers, 'value', value)
    }
  }

  const handleOfferType = (offerTypeSelected) => {
    switch (offerTypeSelected) {
      case 'Discount':
        return (
          <>
            <input type='text' name="Product Offer" id="Product Offer" value={flatDisOffers.value} className='input-field' placeholder='Enter Product Discount Offer' onChange={(e) => handleInput(setFlatDisOffers, flatDisOffers, 'value', value)} />
            <DatePicker
              onChange={(e) => handleDate(e, setFlatDisOffers, 'from')}
              value={flatDisOffers.from}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Discount Offer Start Date</p>
            <DatePicker
              onChange={(e) => handleDate(e, setFlatDisOffers, 'to')}
              value={flatDisOffers.to}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Discount Offer End Date</p>
          </>
        )

      case 'Combo':
        return (
          <>
            <input type='text' name="Product Offer" id="Product Offer" className='input-field' placeholder='Enter Product Product EAN for Combo offer' value={comboOffersHold.value} onChange={(value) => handleInput(setComboOffersHold, comboOffersHold, 'value', value)} />
            <DatePicker
              onChange={(e) => handleDate(e, setComboOffersHold, 'from')}
              value={comboOffersHold.from}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Combo Offer Start Date</p>
            <DatePicker
              onChange={(e) => handleDate(e, setComboOffersHold, 'to')}
              value={comboOffersHold.to}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Combo Offer End Date</p>
          </>
        )

      case 'Container':
        return (
          <>
            <input type='text' name="Product Offer" id="Product Offer" className='input-field' placeholder='Enter Product Product EAN for Container offer' value={holdContainerValue} onChange={(e) => setHoldContainerValue(e.target.value)} />
            <p className="catalogue_Hint">Enter comma separated EAN numbers</p>
            <DatePicker
              onChange={(e) => handleDate(e, setContOffersHold, 'from')}
              value={contOffersHold.from}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Container Offer Start Date</p>
            <DatePicker
              onChange={(e) => handleDate(e, setContOffersHold, 'to')}
              value={contOffersHold.to}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Container Offer End Date</p>
          </>
        )

      case 'Coupon':
        return (
          <>
            <input type='text' name="Coupon code" id="Coupon code" className='input-field' placeholder='Enter Coupon Code' value={couponOffersHold.couponName} onChange={(value) => { handleInput(setCouponOffersHold, couponOffersHold, 'couponName', value) }} />
            <input type='text' name="Coupon Discount" id="Coupon Discount" className='input-field' placeholder='Enter Coupon Discount' value={couponOffersHold.value} onChange={(value) => handleInput(setCouponOffersHold, couponOffersHold, 'value', value)} />
            <input type='text' name="Max Value" id="Max Value" className='input-field' placeholder='Enter Coupon Maximum Amount' value={couponOffersHold.upTo} onChange={(value) => handleInput(setCouponOffersHold, couponOffersHold, 'upTo', value)} />
            <DatePicker
              onChange={(e) => handleDate(e, setCouponOffersHold, 'to')}
              value={couponOffersHold.to}
              format='dd/MM/y'
              className={'input-field custom-date-picker'}
            />
            <p className='catalogue_Hint offerPage_Hint'>Enter Coupon Offer End Date</p>
          </>
        )

      case 'Bank/Store Offer':
        return (
          <>
            <div className="addoffer_Input">
              {bankOffers && bankOffers.length > 0 && (
                bankOffers.map((offer, index) => (
                  <>
                    {/* <fieldset className='catelogue_Fieldset' >
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <div className="catalogue_Dropdown">
                            {offerHeadingSelected ? (<p>{offerHeadingSelected}</p>) : (<p>Select Offer Type</p>)}
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {
                            offerHeadingOptions.map((item, index) => (
                              <Dropdown.Item key={index} name='offerHeading' value={item} onClick={() => setOfferHeadingSelected(item)} onChange={(e) => handleBankOfferHeading(item, index, 'offerHeading')}>{item}</Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </fieldset> */}
                    <div className="addoffer_Input2 bank_offer_heading">
                      <div className="input_Delete">
                        <img src={deleteIcon} alt="" onClick={() => handleRemoveBankOffer(index)} />
                      </div>
                      <p>Offer {index + 1}</p>
                    </div>
                    <input type="text" name='offerHeading' id='offerHeading' className='input-field' placeholder='Select Bank Offer or Store Offer' value={offer.offerHeading} onChange={(e) => handleBankOffer(e, index)} />
                    <input type="text" name='offerName' id='offerName' className='input-field' placeholder='Add Offer Name' value={offer.offerName} onChange={(e) => handleBankOffer(e, index)} />
                    <input type="text" name='offerAvail' id='offerAvail' className='input-field' placeholder='Add Offer Conditions' value={offer.offerAvail} onChange={(e) => handleBankOffer(e, index)} />
                    <p className="catalogue_Hint">Add "~" seperated Offer Conditions</p>
                    {
                      bankOffers[index]['offerHeading'] === 'Store Offer' ? (
                        <input type="text" name='storeId' id='storeId' className='input-field' placeholder='Add Store ID' value={offer.storeId} onChange={(e) => handleBankOffer(e, index)} />
                      ) : ('')
                    }
                    <DatePicker
                      value={bankOffers[index].from}
                      onChange={(e) => handleBankOfferDate(e, 'from', index)}
                      format='dd/MM/y'
                      className={'input-field custom-date-picker'}
                    />
                    {bankOffers[index].offerName && !bankOffers[index].from && (<p className='alert alert-danger'>Enter Date!</p>)}
                    <DatePicker
                      value={bankOffers[index].to}
                      onChange={(e) => handleBankOfferDate(e, 'to', index)}
                      format='dd/MM/y'
                      className={'input-field custom-date-picker'}
                    />
                    {bankOffers[index].offerName && !bankOffers[index].to && (<p className='alert alert-danger'>Enter Date!</p>)}
                  </>
                ))
              )}
              <div className={'button-Container'}>
                <button type='submit' className='submit-button' onClick={handleAddBankOffer} ><p>Add Bank Offers</p></button>
              </div>
            </div>
          </>
        )

      default:
        return (<></>)
    }
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper">
          <div className='catelogue_Page_Header'>
            <h4 className='catelogue_Page_Heading'>Add Offer Page</h4>
          </div>
          <form onSubmit={searchEAN} className='catelogue_Product_Search'>
            <div className="addoffer_Input2">
              <input type="text" id='EAN' name='EAN' className='input-field' placeholder='Enter Product EAN Number' onChange={(e) => setEanEntered(e.target.value)} />
              <p className="catalogue_Hint">Add comma seperated Product EAN</p>
            </div>
            <div className={'button-Container'}>
              <button type='submit' className='submit-button'><p>Search Product</p></button>
            </div>
          </form>
          <br />
          <fieldset className='catelogue_Fieldset' >
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="catalogue_Dropdown">
                  {offerTypeSelected ? (<p>{offerTypeSelected}</p>) : (<p>Select Offer Type</p>)}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  availOffers.map((item, index) => (
                    <Dropdown.Item key={index} value={item} onClick={() => setOfferTypeSelected(item)}>{item}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          </fieldset>
          <div className="offer_Section">
            {
              handleOfferType(offerTypeSelected)
            }
          </div>
          {
            offerTypeSelected && (
              <div className={'button-Container'}>
                <button type='submit' className='submit-button' onClick={handleSubmit}><p>Submit</p></button>
              </div>
            )
          }
          <br />
          <br />
          <div className='offerPage_ProductList'>
            {
              selectedProduct.loaded && (
                <>
                  <div className="catalogue_List_Item">
                    <div className='catalogue_List_Content'>
                      <p>Product EAN</p>
                      <p>Product Name</p>
                      <p>Product MRP</p>
                      <p>Product MOP</p>
                    </div>
                  </div>
                  {selectedProduct.product.map((product, index) => (
                    <div className="catalogue_List_Item" key={index}>
                      <div className='catalogue_List_Content'>
                        {product.ean && (<p>{product.ean}</p>)}
                        {product.name && (<p>{product.name}</p>)}
                        {product.price.mrp && (<p>{product.price.mrp}</p>)}
                        {product.price.mop && (<p>{product.price.mop}</p>)}
                      </div>
                    </div>
                  ))}
                </>
              )
            }
          </div>
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
    </>
  )
}

export default AddOffers