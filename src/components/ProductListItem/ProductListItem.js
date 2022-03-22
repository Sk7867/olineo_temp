import React from 'react'

//CSS
import './ProductListItem.css'

//Images 
import product1 from '../../assets/png/product_1.png'
import ProductOfferTag from '../ProductOfferTag/ProductOfferTag'

const ProductListItem = ({ product }) => {
  return (
    <>
      <div className='productListItem_Contaier'>
        <div className="productListItem_Wrapper">
          <div className="productListItem_Image_Wrapper">
            <img src={product.product_Image} alt="" />
            <ProductOfferTag offer={product.product_Offer} />
          </div>
          <div className='productListItem_Content_Wrapper'>
            <p className='productListItem_Title'>
              {product.product_Name}
            </p>
            <div className="productListItem_Price_Details">
              <p className='productListItem_Discounted_Price'>
                ₹{product.product_Discount_Price}
              </p>
              <p className='productListItem_Original_Price'>
                ₹{product.product_Original_Price}
              </p>
            </div>
            <p className='productListItem_Timer'>
              Ends in {product.product_Discount_End}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListItem