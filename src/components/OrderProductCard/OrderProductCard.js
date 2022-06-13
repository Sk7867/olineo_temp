import React, { useEffect, useState } from 'react'
import './OrderProductCard.css'

//Images
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import { Link } from 'react-router-dom'
import { getIndiProduct } from '../../api/Product'

const OrderProductCard = ({ product, classes, productDeliveryStatues }) => {
  const [productData, setProductData] = useState({})
  console.log(product);

  useEffect(() => {
    if (product) {
      let h1 = product.productId
      h1.forEach(v => {
        getIndiProduct(v)
          .then(res => {
            if (res) {
              // console.log(res);
              setProductData(res)
            }
          })
      })
    }
  }, [product])

  return (
    <>
      {
        productData.name ? (
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
                    ₹{productData.price.discountPrice ? productData.price.discountPrice : productData.price.mop}
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
                <img src={productData.images[0]} alt="product Name" />
              </div>
            </div>
            {
              productDeliveryStatues === 'Arriving' && (
                <Link to={'/order-details'} state={product} className={`product_Tracker`}>
                  <p className={`product_TrackText`}>Track order</p>
                  <img src={arrowRightBlue} alt="" />
                </Link>
              )
            }
          </div>
        ) : ('')
      }
    </>
  )
}

export default OrderProductCard
