import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import './MyCart.css'

//Images
import product2 from '../../assets/png/product_2.png'
import arrowRight from '../../assets/vector/arrow_right_black.svg'

//Components
import CartProductCard from '../../components/CartProductCard/CartProductCard'
import Section2 from '../../components/Section2/Section2'
import Footer from '../../components/Footer/Footer'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2'

const MyCart = ({ cart, cartData }) => {

  const nav = useNavigate()

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

  let cartItemsNumber = cartData.length

  // console.log(cartItemsNumber);

  return (
    <>
      <HeaderBar2 header3={true} headerText={'My Cart'} />
      <div className='page_Wrapper'>
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
              <PriceDetailsBox HideDetails={false} />

              {/* cart carousel section */}
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={sec5Data}
              />

              {/* cart saved for later */}
              <div className="cart_Save_Later">
                <div className="save_Later_Header">
                  <p>Saved for Later</p>
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

              {/* cart fixed footer */}
              <Footer />

              {/* cart floating Footer */}
              <div className="cart_Footer">
                <div className="cart_Footer_Left">
                  <p className="footer_Price">
                    ₹{`1,280`}
                  </p>
                  <p className='footer_Left_Text'>View price details</p>
                </div>
                <div className="cart_Footer_Right">
                  <button type='submit' className='submit-button'><p>Checkout</p></button>
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
