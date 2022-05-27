import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { UserDataContext } from '../../Contexts/UserContext'

const AddOffers = ({ setHeaderData }) => {
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


  const availOffers = [
    'Discount',
    'combo',
    'container',
    'coupon'
  ]

  // console.log(eanEntered);

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

  const searchEAN = (e) => {
    e.preventDefault();
    let ean = eanEntered.split(',')
    let product = []
    ean.forEach(item => {
      let demo = allProducts.products.filter((product) => product.ean === item)
      product.push(demo)
    })
    // let product = allProducts.products.filter((product) => product.ean === eanEntered)
    setSelectedProduct({
      loaded: true,
      product: [...product]
    })
  }

  // console.log(selectedProduct);

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
        </div>
      </div>
    </>
  )
}

export default AddOffers