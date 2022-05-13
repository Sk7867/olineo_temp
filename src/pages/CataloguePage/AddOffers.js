import React, { useContext, useEffect, useState } from 'react'
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

  console.log(allProducts);
  console.log(comboProduct);

  const searchEAN = (e) => {
    e.preventDefault();
    let product = allProducts.products.filter((product) => product.ean === eanEntered)
    setSelectedProduct({
      loaded: true,
      product: product
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

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper">
          <div className='catelogue_Page_Header'>
            <h4 className='catelogue_Page_Heading'>Add Offer Page</h4>
          </div>
          <form onSubmit={searchEAN} className='catelogue_Product_Search'>
            <input type="text" id='EAN' name='EAN' className='input-field' placeholder='Enter Product EAN Number' onChange={(e) => setEanEntered(e.target.value)} />
            <div className={'button-Container'}>
              <button type='submit' className='submit-button'><p>Search Product</p></button>
            </div>
          </form>
          {
            selectedProduct.loaded ? (
              selectedProduct.product.length === 0 ? (
                <div>Product Not Found, Enter Correct EAN number</div>
              ) : (
                <>
                  <div className='catelog_Product_Info'>
                    <div className='product_Info_Left'>
                      <p>Product Name : {selectedProduct.product[0].name}</p>
                      <p>Product EAN : {selectedProduct.product[0].ean}</p>
                      <p>Product Price : {selectedProduct.product[0].price}</p>
                    </div>
                    <div className="product_Info_Right">
                      <img src={selectedProduct.product[0].images[0]} alt="" />
                    </div>
                  </div>
                  <form className="catelogue_Form addoffer_Form">
                    <div className="addoffer_Input">
                      <input type="text" name='Discounted Price' id='Discounted Price' className='input-field' placeholder='Discounted Price/ MOP' onChange={(e) => handleDiscountCalc(e.target.value)} />
                      <p>{discountGiven ? (<>Discount Given : {discountGiven}</>) : ''}</p>
                    </div>
                    <div className="addoffer_Input">
                      <div className="addoffer_Input2">
                        <input type="text" name='Free Product' id='Free Product' className='input-field' placeholder='Enter Free Product EAN' onChange={(e) => setComboEAN(e.target.value)} />
                        <div className={'button-Container'}>
                          <button className='submit-button' onClick={searchComboProduct} disabled={(comboEAN === null) ? true : false}   ><p>Search Product</p></button>
                        </div>
                      </div>
                      <p>{comboProduct.loaded ? (
                        comboProduct.product.length === 0 ? (
                          <div>Product Not Found, Enter Correct EAN number</div>
                        ) : (
                          <span>Product Selected : {comboProduct.product[0].name}, Price : {comboProduct.product[0].price}, EAN : {comboProduct.product[0].ean}</span>
                        )
                      ) : ('')}</p>
                    </div>
                  </form>
                </>
              )

            ) : ('')
          }
        </div>
      </div>
    </>
  )
}

export default AddOffers