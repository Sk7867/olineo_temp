import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

//CSS
import './MyCart.css'

//Images
import product2 from '../../assets/png/product_2.png'
import arrowRight from '../../assets/vector/arrow_right_black.svg'


//Components
import CartProductCard from '../../components/CartProductCard/CartProductCard'
import Section2 from '../../components/Section2/Section2'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

const MyCart = ({ cart, cartData, setHeaderText, setHeader3Cond }) => {

  const nav = useNavigate()
  useEffect(() => {
    setHeaderText('My Cart')
    setHeader3Cond(true)
  }, []);

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
    console.log(e);
    nav('/')
  }

  let cartItemsNumber = cartData.length

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'My Cart',
      url: ''
    },
  ]

  // console.log(cartItemsNumber);

  return (
    <>
      <div className='page_Wrapper'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          cartItemsNumber === 0 ? (
            <>
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your cart is empty</p>
                <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={sec5Data}
              />
            </>
          ) : (
            <>
              <div className='desk_Page_Wrapper'>
                <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
                  <PriceDetailsBox HideDetails={false} />
                </aside>
                <div className='order_Page_Right'>
                  <p className="cart_Text section_Wrapper">My Cart</p>
                  <div className="cards_Container">
                    {
                      cartData.map((item, index) => (
                        <CartProductCard
                          key={index}
                          productImage={item.productImage}
                          productName={item.productName}
                          productColor={item.productColor}
                          productOriginalPrice={item.productOriginalPrice}
                          productDiscount={item.productDiscount}
                          productDiscountPrice={item.productDiscountPrice}
                          productOffersAvailable={item.productOffersAvailable}
                          productDeliveryExpected={item.productDeliveryExpected}
                          productDeliveryCharge={item.productDeliveryCharge}
                          productAvailabilty={item.productAvailabilty}
                        />
                      ))
                    }
                  </div>

                  <div className='cart_Subtotal_Section section_Wrapper'>
                    <p>Subtotal (2 items): <span> ₹1,280</span></p>
                    <div className="cart_Footer_Right">
                      <button type='submit' className='submit-button' onClick={() => nav('/delivery-option')}><p>Checkout</p></button>
                    </div>
                  </div>

                  <div className="cart_Add_Items">
                    <div className="add_Items_Wrapper">
                      <p>Add items worth ₹{`600`} to qualify for FREE Delivery</p>
                    </div>
                    <div className="cart_More_Items">
                      <p>Add more items</p>
                      <img src={arrowRight} alt="" />
                    </div>
                  </div>

                  {/* cart price detials */}
                  <div className={'tab_None'}>
                    <PriceDetailsBox HideDetails={false} />
                  </div>

                  {/* cart carousel section */}
                  <Section2
                    id={'Top-sellers-sec'}
                    heading='Top Sellers'
                    productData={sec5Data}
                  />

                  {/* cart saved for later */}
                  <div className="cart_Save_Later">
                    <div className="save_Later_Header section_Wrapper">
                      <p className=''>Saved for Later</p>
                    </div>
                    <div className="cards_Container">
                      {
                        cartData.map((item, index) => (
                          <CartProductCard
                            key={index}
                            productImage={item.productImage}
                            productName={item.productName}
                            productColor={item.productColor}
                            productOriginalPrice={item.productOriginalPrice}
                            productDiscount={item.productDiscount}
                            productDiscountPrice={item.productDiscountPrice}
                            productOffersAvailable={item.productOffersAvailable}
                            productDeliveryExpected={item.productDeliveryExpected}
                            productDeliveryCharge={item.productDeliveryCharge}
                            productAvailabilty={item.productAvailabilty}
                          />
                        ))
                      }
                    </div>
                  </div>

                  {/* cart floating Footer */}
                  <div className="cart_Footer ">
                    <div className="cart_Footer_Left">
                      <p className="footer_Price">
                        ₹{`1,280`}
                      </p>
                      <p className='footer_Left_Text'>View price details</p>
                    </div>
                    <div className="cart_Footer_Right">
                      <button type='submit' className='submit-button' onClick={() => nav('/delivery-option')}><p>Checkout</p></button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
        {/* <Section2
          id={'Top-sellers-sec'}
          heading='Top Sellers'
          productData={sec5Data}
        /> */}
      </div>
    </>
  )
}

export default MyCart
