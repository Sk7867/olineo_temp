import React from 'react'
import './OrderProductCard.css'

//Images
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'

const OrderProductCard = ({ productName, productArrival, productImage, productDeliveryStatues }) => {
  return (
    <div className={`product_Container`}>
      <div className={`product_Wrapper`}>
        <div className={`product_Details`}>
          <h4 className={`product_Name`}>
            {productName}
          </h4>
          <p className={`product_Status ${productDeliveryStatues === 'Arriving' ? 'product_Arriving' : ''}`}>
            {productArrival}
          </p>
        </div>
        <div className={`product_ImageContainer`}>
          <img src={productImage} alt="product Name" />
        </div>
      </div>
      {
        productDeliveryStatues === 'Arriving' && (
          <div className={`product_Tracker`}>
            <p className={`product_TrackText`}>Track order</p>
            <img src={arrowRightBlue} alt="" />
          </div>
        )
      }
    </div>
  )
}

export default OrderProductCard
