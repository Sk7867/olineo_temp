import React, { useContext, useEffect, useState } from 'react'
import './OrderProductCard.css'
import { UserDataContext } from '../../Contexts/UserContext'

//Images
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import { Link } from 'react-router-dom'
import { getIndiProduct } from '../../api/Product'
import { getOrderStatus } from '../../api/OrdersApi'

const OrderProductCard = ({ orderId, itemId, product, classes, productDeliveryStatues, productPrice, productStatus }) => {
  const [productData, setProductData] = useState({
    order_Id: '',
    order_Status: '',
    name: '',
    color: '',
    image: '',
    itemId: '',
  })

  // console.log(productData);

  useEffect(() => {
    if (product) {
      setProductData(prev => ({
        ...prev,
        order_Id: orderId,
        order_Status: productStatus,
        name: product.name,
        color: product.color,
        itemId: itemId,
        image: product.image
      }))
    }
  }, [product, orderId, productStatus])

  return (
    <>
      <div className={`product_Container ` + (classes ? classes.boxClass : '')}>
        <div className={`product_Wrapper`}>
          <div className={`product_Details`}>
            <div className="order_Product_Left">
              <h4 className={`product_Name`}>
                {productData.name}
              </h4>
              <p className="order_Product_Color">
                Color: <span>{productData.color}</span>
              </p>
            </div>
            <div className="order_Product_Center">
              <p className="order_Product_Price">
                ₹{productPrice}
              </p>
            </div>
            <div className="order_Product_Right">
              <p className={`product_Status product_Arriving ${productDeliveryStatues === 'Delivered' ? 'product_Delivered' : ''}`}>
                {/* {productArrival} */}
              </p>
              {
                productDeliveryStatues === 'Arriving' ? (
                  <p className="order_Product_Status ">
                    Your order is been placed.
                  </p>
                ) : ('')
              }
            </div>
          </div>
          <div className={`product_ImageContainer`}>
            <img src={productData.image} alt="product Name" />
          </div>
        </div>
        {
          productDeliveryStatues === 'Arriving' && (
            <Link to={'/order-details'} state={productData} className={`product_Tracker`}>
              <p className={`product_TrackText`}>Track order</p>
              <img src={arrowRightBlue} alt="" />
            </Link>
          )
        }
      </div>
    </>
  )
}

export default OrderProductCard
