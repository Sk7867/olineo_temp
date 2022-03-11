import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

//CSS
import './MyOrders.css'

//Images
import product2 from '../../assets/png/product_2.png'


//Components
import Section2 from '../../components/Section2/Section2'
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'


const MyOrders = ({ ordersList, setHeaderData }) => {
  const [checked, setChecked] = useState(true)
  const [onTheWay, setOnTheWay] = useState(true)
  const [delivered, setDelivered] = useState(true)

  const nav = useNavigate()

  // console.log(onTheWay);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'My Orders',
      categoriesCond: true,
    })
  }, []);

  // console.log(ordersList);

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

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'My Orders',
      url: ''
    },
  ]

  let ordersNumber = ordersList.length

  return (
    <>
      {/* <HeaderBar2 header3={true} headerText={'My Orders'} /> */}
      <div className='page_Wrapper page_Margin_Top'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          ordersNumber === 0 ? (
            <>
              <div className="empty_order_sec">
                <p className='empty_order_text'>You have no orders</p>
                <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Suggested products'
                productData={sec5Data}
              />
            </>
          ) : (
            <>
              <div className='desk_Page_Wrapper'>
                <aside className="side_Section section_Wrapper" style={{ maxHeight: '150px' }}>
                  <p className="side_Section_Heading">
                    Filters
                  </p>
                  <label htmlFor={`On the way`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox" onClick={() => { setOnTheWay(!onTheWay); setChecked(!checked) }}>
                    <input type="checkbox" name="On the way" id={`On the way`} defaultChecked={checked} />
                    <span className="custom-checkmark"></span>
                    On the way
                  </label>
                  <label htmlFor={`Delivered`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox" onClick={() => { setDelivered(!delivered); setChecked(!checked) }} >
                    <input type="checkbox" name="Delivered" id={`Delivered`} defaultChecked={checked} />
                    <span className="custom-checkmark"></span>
                    Delivered
                  </label>
                </aside>
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
                          productData={sec5Data}
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
                          productData={sec5Data}
                        />
                      </div>
                    )
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default MyOrders
