import React, { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'

//Components
import CartProductCard from '../../components/CartProductCard/CartProductCard'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import Section2 from '../../components/Section2/Section2'

const CartSection = ({ featureProducts }) => {
  const nav = useNavigate()
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart, userCart, cartArray } = useContext(UserDataContext)

  let cartItemsNumber = cartArray.no_of_carts
  var cartItemsPrice = 0
  var totalDiscount = 0
  var totalDeliveryCharge = 0
  var totalAmount = 0

  useEffect(() => {
    if (cartArray.no_of_carts !== 0) {
      //Get Price from cart Items
      userCart.forEach(item => {
        cartItemsPrice += parseInt(item.price) + 2000
      });

      //Get Discounted Price
      userCart.forEach(item => {
        var itemDiscount
        itemDiscount = parseInt(item.price)
        totalDiscount += itemDiscount
      });

      //Get Delivery Charges
      userCart.forEach((item, index) => {
        totalDeliveryCharge += (index + 1) * 80
      });

      //Get Total Amount
      totalAmount = cartItemsPrice - totalDiscount + totalDeliveryCharge
    }
  }, [cartArray])



  return (
    <>
      {
        userCart.no_of_carts === 0 ? (
          <>
            <div className="empty_order_sec">
              <p className='empty_order_text'>Your cart is empty</p>
              <button type='submit' className='submit-button' onClick={() => nav('/')} ><p>Start Shopping</p></button>
            </div>
            {/* <Section2
              id={'Top-sellers-sec'}
              heading='Top Sellers'
              productData={featureProducts}
            /> */}
          </>
        ) : (
          <div className='order_Page_Right'>
            <p className="cart_Text section_Wrapper">My Cart</p>
            <div className="cards_Container">
              {
                userCart.map((item, index) => (
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
                      <p>Add more items</p>
                      <img src={arrowRight} alt="" />
                    </div>
                  </div> */}

            {/* cart price detials */}
            <div className={'tab_None'}>
              <PriceDetailsBox HideDetails={false} />
            </div>

            {/* cart carousel section */}
            <Section2
              id={'Top-sellers-sec'}
              heading='Top Sellers'
              productData={featureProducts}
            />

            {/* cart saved for later */}
            <div className="cart_Save_Later">
              <div className="save_Later_Header section_Wrapper">
                <p className=''>Saved for Later</p>
              </div>
              <div className="cards_Container">
                {
                  userCart.map((item, index) => (
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
                  ₹{`${totalAmount}`}
                </p>
                <p className='footer_Left_Text'>View price details</p>
              </div>
              <div className="cart_Footer_Right">
                <button type='submit' className='submit-button' onClick={() => nav('/delivery-option')}><p>Checkout</p></button>
              </div>
            </div>
            <Section2
              id={'Top-sellers-sec'}
              heading='Top Sellers'
              productData={featureProducts}
            />
          </div>
        )
      }
    </>

  )
}

export default CartSection