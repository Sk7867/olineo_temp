import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'
import { getIndiProduct } from '../../api/Product'

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
import CartSection from './CartSection'
import { getCartData } from '../../api/Cart'

const MyCart = ({ setHeaderData }) => {
  const { setUserCart, userCart, allProducts, cartArray, setCartArray, } = useContext(UserDataContext)
  const nav = useNavigate()


  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'My Cart',
      categoriesCond: true,
      header3Store: true,
      header3Cart: false,
      header3Profile: true,
    })
  }, []);

  useEffect(() => {
    getCartData()
      .then(res => {
        if (res) {
          setCartArray({
            loaded: true,
            no_of_carts: res.no_of_carts,
            cart: res.cart
          })
          // console.log(res);
        }
      })
  }, [])




  const pageSwitch = (e) => {
    e.preventDefault();
    // console.log(e);
    nav('/')
  }

  useEffect(() => {
    cartArray.cart.map((product) => (
      getIndiProduct(product)
        .then(res => {
          if (res) {
            // console.log(res);
            let ind = userCart.findIndex(obj => obj._id === res._id)
            if (ind === -1) {
              setUserCart([...userCart, res])
            }
          }
        })
    ))
  }, [cartArray])


  const pageSwitch = (e) => {
    e.preventDefault();
    // console.log(e);
    nav('/')
  }

  //Get Price from cart Items
  var cartItemsPrice = 0
  cartData.forEach(item => {
    cartItemsPrice += parseInt(item.productOriginalPrice)
  });

  //Get Discounted Price
  var totalDiscount = 0
  cartData.forEach(item => {
    var itemDiscount
    itemDiscount = parseInt(item.productOriginalPrice) - parseInt(item.productDiscountPrice)
    totalDiscount += itemDiscount
  });

  //Get Delivery Charges
  var totalDeliveryCharge = 0
  cartData.forEach(item => {
    totalDeliveryCharge += parseInt(item.productDeliveryCharge)
  });


  //Get Total Amount
  var totalAmount = cartItemsPrice - totalDiscount + totalDeliveryCharge

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
  // console.log(cartData);

  return (
    <>
      <div className='page_Wrapper page_Margin_Top'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          cartArray.no_of_carts === 0 ? (
            <>
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your cart is empty</p>
                <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={allProducts}
              />
            </>
          ) : (
            <>
              <div className='desk_Page_Wrapper'>
                <aside className="side_Section section_Wrapper" style={{ padding: '0', background: 'none' }}>
                  <PriceDetailsBox HideDetails={false} cartData={cartData} classes={{ containerClass: '' }} />
                  <div className="cart_Add_Items section_Wrapper">
                    <div className="add_Items_Wrapper">
                      <p>Add items worth ₹{`600`} to qualify for FREE Delivery</p>
                    </div>
                    <div className="cart_More_Items">
                      <button type='submit' className='submit-button'><p>Add more items</p></button>
                    </div>
                  </div>
                </aside>
                <div className='order_Page_Right'>
                  <p className="cart_Text section_Wrapper">My Cart</p>
                  <div className="cards_Container">
                    {
                      cartData.map((item, index) => (
                        <CartProductCard
                          key={index}
                          product={item}
                        />
                      ))
                    }
                  </div>

                  <div className='cart_Subtotal_Section section_Wrapper'>
                    <p>Subtotal ({cartItemsNumber} items): <span> ₹{totalAmount}</span></p>
                    <div className="cart_Footer_Right">
                      <button type='submit' className='submit-button' onClick={() => nav('/delivery-option')}><p>Checkout</p></button>
                    </div>
                  </div>

                  {/* <div className="cart_Add_Items">
                    <div className="add_Items_Wrapper">
                      <p>Add items worth ₹{`600`} to qualify for FREE Delivery</p>
                    </div>
                    <div className="cart_More_Items">
                      <button type='submit' className='submit-button'><p>Add more items</p></button>
                    </div>
                  </div> */}

                  {/* cart price detials */}
                  <div className={'tab_None'}>
                    <PriceDetailsBox HideDetails={false} cartData={cartData} />
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
                            product={item}
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
