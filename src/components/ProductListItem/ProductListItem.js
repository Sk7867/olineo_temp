import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductListItem.css'

//Images 
import product1 from '../../assets/png/product_1.png'
import ProductOfferTag from '../ProductOfferTag/ProductOfferTag'

const ProductListItem = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product?.slug}`} className='productListItem_Contaier'>
        <div className="productListItem_Wrapper">
          <div className="productListItem_Image_Wrapper">
            {(product?.images) && (product?.images?.length > 0) && (
              <img src={product?.images[0]} alt="" />
            )}
            {/* <ProductOfferTag offer={product.discount.flatDiscount.value} /> */}
          </div>
          <div className='productListItem_Content_Wrapper'>
            <p className='productListItem_Title'>
              {product?.name}
            </p>
            <div className="productListItem_Price_Details">
              <p className='productListItem_Discounted_Price'>
                ₹{!isNaN(product?.price?.discountPrice) ? product?.price?.discountPrice : product?.price?.mop}
              </p>
              <p className='productListItem_Original_Price'>
                ₹{product?.price?.mrp}
              </p>
            </div>
            {/* <p className='productListItem_Timer'>
              Ends in {product.product_Discount_End}
            </p> */}
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductListItem