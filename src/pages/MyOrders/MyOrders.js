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
import OrderSection from './OrderSection'


const MyOrders = ({ ordersList, setHeaderData, featureProducts }) => {
  const [onTheWay, setOnTheWay] = useState(true)
  const [delivered, setDelivered] = useState(true)

  const nav = useNavigate()

  // console.log(onTheWay);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'My Orders ',
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
                productData={featureProducts}
              />
            </>
          ) : (
            <>
              <div className='desk_Page_Wrapper'>
                <aside className="side_Section section_Wrapper" style={{ maxHeight: '150px' }}>
                  <p className="side_Section_Heading">
                    Filters
                  </p>
                  <label htmlFor={`On the way`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox" onClick={() => { setOnTheWay(!onTheWay) }}>
                    <input type="checkbox" name="On the way" id={`On the way`} defaultChecked={onTheWay} />
                    <span className="custom-checkmark"></span>
                    On the way
                  </label>
                  <label htmlFor={`Delivered`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox" onClick={() => { setDelivered(!delivered) }} >
                    <input type="checkbox" name="Delivered" id={`Delivered`} defaultChecked={delivered} />
                    <span className="custom-checkmark"></span>
                    Delivered
                  </label>
                </aside>
                <OrderSection ordersList={ordersList} featureProducts={featureProducts} onTheWay={onTheWay} delivered={delivered} />
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default MyOrders
