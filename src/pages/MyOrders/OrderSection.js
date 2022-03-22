import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'
import Section2 from '../../components/Section2/Section2'

const OrderSection = ({ ordersList, featureProducts, onTheWay, delivered }) => {
  const nav = useNavigate()

  let ordersNumber = ordersList.length

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }
  return (
    <>
      {
        ordersNumber === 0 ? (
          <>
            <div className="empty_order_sec">
              <p className='empty_order_text'>You have no orders</p>
              <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
            </div>

          </>
        ) : (
          <>
            <div className='order_Page_Right'>
              {
                onTheWay && (
                  <div className='order_arriving_section'>
                    <p className="order_Text section_Wrapper">Orders on the way</p>
                    {
                      ordersList.map((order, index) => (
                        order.productDeliveryStatues === 'Arriving' ?
                          (
                            <OrderProductCard
                              key={index}
                              productName={order.productName}
                              productArrival={order.productArrival}
                              productDeliveryStatues={order.productDeliveryStatues}
                              productImage={order.productImage}
                              productPrice={order.productPrice}
                            />
                          ) : ('')
                      ))
                    }
                    <Section2
                      id={'Top-sellers-sec'}
                      heading='Suggested products'
                      productData={featureProducts}
                    />
                  </div>
                )
              }
              {
                delivered && (
                  <div className="order_delivered_section">
                    <p className="order_Text section_Wrapper">Orders delivered</p>
                    {
                      ordersList.map((order, index) => (
                        order.productDeliveryStatues !== 'Arriving' ?
                          (
                            <OrderProductCard
                              key={index}
                              productName={order.productName}
                              productArrival={order.productArrival}
                              productDeliveryStatues={order.productDeliveryStatues}
                              productImage={order.productImage}
                              productPrice={order.productPrice}
                            />
                          ) : ('')
                      ))
                    }
                    <Section2
                      id={'Top-sellers-sec'}
                      heading='Suggested products'
                      productData={featureProducts}
                    />
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </>
  )
}

export default OrderSection