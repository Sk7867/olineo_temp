import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderStatus } from '../../api/OrdersApi'
import { getIndiProduct } from '../../api/Product'
import BankOfferModal from '../../components/ModalComponenr/BankOfferModal'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'
import Section2 from '../../components/Section2/Section2'
import { UserDataContext } from '../../Contexts/UserContext'

const OrderSection = ({ featureProducts, onTheWay, delivered, cancelled }) => {
  const nav = useNavigate()
  const [demo, setDemo] = useState([])
  const {
    userOrderData,
  } = useContext(UserDataContext)

  let ordersNumber = userOrderData.no_of_orders

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  console.log(userOrderData);
  return (
    <>
      {
        ordersNumber === 0 ? (
          <>
            <div className="order_Page_Right">
              <div className="empty_order_sec">
                <p className='empty_order_text'>You have no orders</p>
                <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
              </div>
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
          </>
        ) : (
          <>
            <div className='order_Page_Right'>
              <div className={`order_arriving_section ${onTheWay ? '' : 'd-none'}`}>
                <p className="order_Text section_Wrapper">Orders on the way</p>
                {
                  userOrderData.orders.map((order, index) => (
                    order.productId.map((prod, indx) => (
                      order.itemId.map((item, idx) => (
                        (order.item[indx] >= idx) ? (
                          (order.itemStatus[idx] !== 'DELIVERED' && order.itemStatus[idx] !== 'CANCELLED') ? (
                            <OrderProductCard
                              key={idx}
                              orderId={order._id}
                              itemId={item}
                              product={order.productDetails[indx]}
                              productStatus={order.itemStatus[idx]}
                              productPrice={order.productPrice[indx]}
                              productDeliveryStatues='Arriving'
                              classes={{
                                boxClass: 'section_Wrapper'
                              }}
                            />
                          ) : (<></>)
                        ) : (<></>)
                      ))
                    ))
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
              <div className={`order_delivered_section ${delivered ? '' : 'd-none'}`}>
                <p className="order_Text section_Wrapper">Orders delivered</p>
                {
                  userOrderData.orders.map((order, index) => (
                    order.productId.map((prod, indx) => (
                      order.itemId.map((item, idx) => (
                        (order.item[indx] <= idx) ? (
                          (order.itemStatus[idx] === 'DELIVERED') ? (
                            <OrderProductCard
                              key={idx}
                              orderId={order._id}
                              itemId={item}
                              product={order.productDetails[indx]}
                              productStatus={order.itemStatus[idx]}
                              productPrice={order.productPrice[indx]}
                              productDeliveryStatues='Arriving'
                              classes={{
                                boxClass: 'section_Wrapper'
                              }}
                            />
                          ) : (<></>)
                        ) : (<></>)
                      ))
                    ))
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
              <div className={`order_delivered_section ${cancelled ? '' : 'd-none'}`}>
                <p className="order_Text section_Wrapper">Orders Cancelled</p>
                {
                  userOrderData.orders.map((order, index) => (
                    order.productId.map((prod, indx) => (
                      order.itemId.map((item, idx) => (
                        (order.item[indx] <= idx) ? (
                          (order.itemStatus[idx] === 'CANCELLED') ? (
                            <OrderProductCard
                              key={idx}
                              orderId={order._id}
                              itemId={item}
                              product={order.productDetails[indx]}
                              productStatus={order.itemStatus[idx]}
                              productPrice={order.productPrice[indx]}
                              productDeliveryStatues='Arriving'
                              classes={{
                                boxClass: 'section_Wrapper'
                              }}
                            />
                          ) : (<></>)
                        ) : (<></>)
                      ))
                    ))
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