import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderStatus } from '../../api/OrdersApi'
import { getIndiProduct } from '../../api/Product'
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
    setOrderTypes,
    statusesArrayHold,
    setStatusesArrayHold
  } = useContext(UserDataContext)
  const [ordersOnTheWay, setOrdersOnTheWay] = useState([])
  const [cancelledOrders, setCancelledOrders] = useState([])
  const [productHold, setProductHold] = useState([])
  const [productDataHold, setProductDataHold] = useState([])

  let ordersNumber = userOrderData.no_of_orders
  const [orderLoaded, setOrderLoaded] = useState(false)

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  useEffect(() => {
    getAllOrder()
      .then(res => {
        if (res) {
          let orders = [...res.orders]
          let newOrders = orders.filter(obj => (obj.itemId.length > 0))
          setUserOrderData({
            loaded: true,
            no_of_orders: res.no_of_orders,
            orders: newOrders
          })
        }
      })
  }, [])


  // console.log(userOrderData.orders, statusesArrayHold);


  //Order Filtering Function=========================
  // useEffect(() => {

  // }, [orderLoaded])

  // useEffect(() => {
  //   let prodDataHold = []
  //   productHold.forEach(prodLevel1 => {
  //     prodLevel1.forEach(prodLevel2 => {
  //       let prodId = prodLevel2[0]
  //       prodLevel2[1].forEach(prodLevel3 => {
  //         getIndiProduct(prodId)
  //           .then(res => {
  //             if (res) {
  //               let proResponse = res
  //               proResponse.OrderPrice = prodLevel2[2]
  //               proResponse.OrderItemsArray = prodLevel3
  //               prodDataHold.push(proResponse)
  //             }
  //           })
  //       })
  //     })
  //   })
  //   setProductDataHold(prodDataHold)
  // }, [productHold])

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
              <div className='order_arriving_section'>
                <p className="order_Text section_Wrapper">Orders on the way</p>
                {
                  statusesArrayHold.map((item, index) => (
                    item.items && item.items.map((order => (
                      (order.status === 'NOSTORETOSERVICE') ? (
                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Arriving'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ) : ('')
                    )))
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
              <di
                v className="order_delivered_section">
                <p className="order_Text section_Wrapper">Orders delivered</p>
                {
                  statusesArrayHold.map((item, index) => (
                    item.items && item.items.map((order => (
                      (order.status === 'DELIVERED') ? (
                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Delivered'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ) : ('')
                    )))
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
              </di>
              <div className="order_delivered_section">
                <p className="order_Text section_Wrapper">Orders Cancelled</p>
                {
                  statusesArrayHold.map((item, index) => (
                    item.items && item.items.map((order => (
                      (order.status === 'CANCELLED') ? (
                        <OrderProductCard
                          key={index}
                          product={order}
                          productDeliveryStatues='Delivered'
                          classes={{
                            boxClass: 'section_Wrapper'
                          }}
                        />
                      ) : ('')
                    )))
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
            </div>
          </>
        )
      }
    </>
  )
}

export default OrderSection