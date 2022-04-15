import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BankOfferModal from '../../components/ModalComponenr/BankOfferModal'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'
import Section2 from '../../components/Section2/Section2'

const OrderSection = ({ ordersList, featureProducts, onTheWay, delivered }) => {
  const nav = useNavigate()
  const [modalShow, setModalShow] = useState(false)

  let ordersNumber = ordersList.length

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  const offerModalData = {
    offer_Name: 'Bank Offer',
    offer_desc: '₹499 discount on HDFC Bank Credit Cards',
    offerAvail: [
      'Select eligible card at the time of checkout.',
      'No promo code required to avail the offer.'
    ],
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
                              classes={{
                                boxClass: 'section_Wrapper'
                              }}
                              setModalShow={setModalShow}
                            />
                          ) : ('')
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
                              classes={{
                                boxClass: 'section_Wrapper'
                              }}
                              setModalShow={setModalShow}
                            />
                          ) : ('')
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
      <BankOfferModal modalShow={modalShow} setModalShow={setModalShow} offerModalData={offerModalData} />
    </>
  )
}

export default OrderSection