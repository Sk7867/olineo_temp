import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderStatus } from '../../api/OrdersApi'
import BankOfferModal from '../../components/ModalComponenr/BankOfferModal'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'
import Section2 from '../../components/Section2/Section2'
import { UserDataContext } from '../../Contexts/UserContext'

const OrderSection = ({ ordersList, featureProducts, onTheWay, delivered, cancelled }) => {
  const nav = useNavigate()
  const {
    userOrderData,
    setUserOrderData,
    orderTypes,
    setOrderTypes
  } = useContext(UserDataContext)

  let ordersNumber = userOrderData.no_of_orders

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  useEffect(() => {
    getAllOrder()
      .then(res => {
        if (res) {
          let orders = [...res.orders]
          orders.forEach(item => {
            getOrderStatus(item._id)
              .then(res => {
                let status = res.items[0].status
                item.status = status
              })
          })
          setUserOrderData({
            loaded: true,
            no_of_orders: res.no_of_orders,
            orders: orders
          })
        }
      })
  }, [])

  // useEffect(() => {
  //   if (userOrderData.no_of_orders > 0) {
  //     // setOnTheWayOrders([])
  //     // setDeliveredOrders([])
  //     // setCancelledOrders([])
  //     userOrderData.orders.forEach(item => {
  //       if (item.status === 'UNASSIGNED' && item.status === 'NOSTORETOSERVICE') {
  //         if (onTheWayOrders.length === 0) {
  //           setOnTheWayOrders([...onTheWayOrders, item])
  //         } else {
  //           let ind = onTheWayOrders.findIndex(obj => obj._id === item._id)
  //           if (ind === -1) {
  //             setOnTheWayOrders([...onTheWayOrders, item])
  //           }
  //         }
  //       } else if (item.status === 'DELIVERED') {
  //         if (deliveredOrders.length === 0) {
  //           setDeliveredOrders([...deliveredOrders, item])
  //         } else {
  //           let ind = deliveredOrders.findIndex(obj => obj._id === item._id)
  //           if (ind === -1) {
  //             setDeliveredOrders([...deliveredOrders, item])
  //           }
  //         }
  //       } else if (item.status === 'CANCELLED') {
  //         if (cancelledOrders.length === 0) {
  //           // console.log(item)
  //           setCancelledOrders([...cancelledOrders, item])
  //         } else {
  //           // console.log(item)
  //           let ind = cancelledOrders.findIndex(obj => obj._id === item._id)
  //           if (ind === -1) {
  //             setCancelledOrders([...cancelledOrders, item])
  //           }
  //         }
  //       }
  //     })
  //   }
  // }, [userOrderData])
  // console.log(userOrderData);

  // useEffect(() => {
  //   cancelledOrders.map(item => console.log(item))
  // }, [userOrderData])

  // console.log(orderTypes);

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
                      orderTypes.onThewayOrders.map((order, index) => (

                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Arriving'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ))
                    }
                    <Section2
                      id={'Top-sellers-sec'}
                      heading='Suggested products'
                      productData={featureProducts}
                      classes={{
                        containerClass: 'section_Wrapper',
                        boxClass: 'section_Wrapper'
                      }}
                    />
                  </div>
                )
              }
              {
                delivered && (
                  <div className="order_delivered_section">
                    <p className="order_Text section_Wrapper">Orders delivered</p>
                    {
                      orderTypes.deliveredOrders.map((order, index) => (

                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Delivered'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ))
                    }
                    <Section2
                      id={'Top-sellers-sec'}
                      heading='Suggested products'
                      productData={featureProducts}
                      classes={{
                        containerClass: 'section_Wrapper',
                      }}
                    />
                  </div>
                )
              }
              {
                cancelled && (
                  <div className="order_delivered_section">
                    <p className="order_Text section_Wrapper">Orders Cancelled</p>
                    {
                      orderTypes.cancelledOrders.map((order, index) => (
                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Cancelled'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ))
                    }
                    <Section2
                      id={'Top-sellers-sec'}
                      heading='Suggested products'
                      productData={featureProducts}
                      classes={{
                        containerClass: 'section_Wrapper',
                      }}
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