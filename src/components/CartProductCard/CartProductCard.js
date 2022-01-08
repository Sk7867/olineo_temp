import React from 'react'
//CSS
import './CartProductCard.css'

const CartProductCard = ({
  productImage,
  productName,
  productColor,
  productOriginalPrice,
  productDiscount,
  productDiscountPrice,
  productOffersAvailable,
  productDeliveryExpected,
  productDeliveryCharge,
  productAvailabilty,
}) => {
  return (
    <div className='product_Contianer'>
      <div className="product_Wrapper">
        <div className="product_Details">
          <h4 className='product_Name'>
            {productName}
          </h4>
          <p className="product_Color">
            Color : {productColor}
          </p>
          <div className="product_Price_Section">
            <p className="product_Discount_Price">
              {productDiscountPrice}
            </p>
            <p className="product_Original_Price">
              {productOriginalPrice}
            </p>
            <p className='product_Discount'>
              {productDiscount} off
            </p>
          </div>
          <p className="product_Offers">
            {productOffersAvailable}
          </p>
          <div className="product_Delivery_Info">
            <p className="product_Delivery_Estimate">{productDeliveryExpected}</p> | <p className="product_Delivery_Charge">{productDeliveryCharge}</p>
          </div>
          <p className="product_Availability">{productAvailabilty}</p>
        </div>
        <div className="product_Image_Container">
          <img src={productImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
