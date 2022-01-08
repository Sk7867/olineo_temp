import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import './MyOrders.css'

//Images
import product2 from '../../assets/png/product_2.png'

//Components
import HeaderBar3 from '../../components/HeaderBar3/HeaderBar3'
import Section2 from '../../components/Section2/Section2'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'

const MyOrders = ({ orders, ordersList }) => {

  const nav = useNavigate()

  console.log(ordersList);

  const sec5Data = [
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
  ]

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  return (
    <>
      <HeaderBar3 headerText={'My Orders'} />
      <div className='page_Wrapper'>
        {
          orders === 0 ? (
            <div className="empty_order_sec">
              <p className='empty_order_text'>You have no orders</p>
              <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
            </div>
          ) : (
            <>
              <div className='order_arriving_section'>
                <p className="order_Text">Orders on the way</p>
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
                        />
                      ) : ('')
                  ))
                }
                <Section2
                  id={'Top-sellers-sec'}
                  heading='Suggested products'
                  productData={sec5Data}
                />
              </div>
              <div className="order_delivered_section">
                <p className="order_Text">Orders delivered</p>
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
                        />
                      ) : ('')
                  ))
                }
              </div>
            </>
          )
        }
        <Section2
          id={'Top-sellers-sec'}
          heading='Suggested products'
          productData={sec5Data}
        />
      </div>
    </>
  )
}

export default MyOrders
