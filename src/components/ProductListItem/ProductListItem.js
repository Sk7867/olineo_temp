import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductListItem.css'

//Images 
import product1 from '../../assets/png/product_1.png'
import ProductOfferTag from '../ProductOfferTag/ProductOfferTag'

const ProductListItem = ({ product, interestedButton = false }) => {
  return (
    <>
      <div className='productListItem_Contaier'>
        <div className="productListItem_Wrapper">
          <Link to={`/product/${product?.slug}`} className="productListItem_Image_Wrapper">
            {(product?.images) && (product?.images?.length > 0) && (
              <img src={product?.images[0]} alt="" />
            )}
            {/* <ProductOfferTag offer={product.discount.flatDiscount.value} /> */}
          </Link>
          <div className='productListItem_Content_Wrapper'>
            <Link to={`/product/${product?.slug}`} className='productListItem_Title'>
              {product?.name}
            </Link>
            <div className="productListItem_Price_Details">
              <p className='productListItem_Discounted_Price'>
                ₹{!isNaN(product?.price?.discountPrice) ? product?.price?.discountPrice : product?.price?.mop}
              </p>
              <p className='productListItem_Original_Price'>
                ₹{product?.price?.mrp}
              </p>
            </div>
            {
              interestedButton && (
                <div className='productListItem_Int_Button'>
                  <button type="submit" className="submit-button">
                    <p>I'm interested</p>
                  </button>
                </div>
              )
            }
            {/* <p className='productListItem_Timer'>
              Ends in {product.product_Discount_End}
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListItem