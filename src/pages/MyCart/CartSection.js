import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'
import { Slide, toast, ToastContainer } from 'react-toastify'

//Components
import CartProductCard from '../../components/CartProductCard/CartProductCard'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import Section2 from '../../components/Section2/Section2'
import { initOrder } from '../../api/OrdersApi'
import { getCartData, removeFromCart } from '../../api/Cart'
import { getCoupon } from '../../api/couponApi'

toast.configure()
const CartSection = ({ featureProducts }) => {
  const nav = useNavigate()
  const [cartProducts, setCartProducts] = useState([])
  const [couponInput, setCouponInput] = useState('')


  const {
    setUserCart,
    userCart,
    cartArray,
    setCartArray,
    setOrderInit,
    priceBoxDetails } = useContext(UserDataContext)

  useEffect(() => {
    getCoupon()
      .then(res => {
        console.log(res);
      })
  }, [])

  const handleQuantityInc = (id) => {
    let tempState = [...userCart]
    let index = userCart.findIndex(x => x._id === id)
    let tempElement = { ...tempState[index] }
    tempElement.quantity = tempElement.quantity + 1
    tempState[index] = tempElement
    setUserCart(tempState)
  }

  const handleQuantityDec = (id) => {
    let tempState = [...userCart]
    let index = userCart.findIndex(x => x._id === id)
    let tempElement = { ...tempState[index] }
    if (tempElement.quantity === 1) {
      tempElement.quantity = 1
    } else {
      tempElement.quantity = tempElement.quantity - 1
    }
    tempState[index] = tempElement
    setUserCart(tempState)
  }

  //ORDER INITIALIZATION CODE+++++++++++++++++++++++++++++++++++++++++
  const handleOrderInit = (e) => {
    e.preventDefault();
    let productId = []
    let quantity = []
    userCart.forEach(item =>
      productId.push(item._id)
    )
    userCart.forEach((item) => (
      quantity.push(parseInt(item.quantity))
    ))
    setOrderInit(prev => ({
      ...prev,
      productId: productId,
      quantity: quantity
    }))
    nav('/delivery-option')
    // console.log(data);
  }

  //Remove Product from cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id)
      .then(res => res ? (
        setUserCart([]),
        toast.error('Product Removed from Cart'),
        getCartData()
          .then(res => res ? (
            setCartArray({
              loaded: true,
              no_of_carts: res.no_of_carts,
              cart: res.cart
            })
          ) : (
            ''
          )
          )
      ) : (''))
  }

  //Get Coupon Codes
  const handleCoupon = (e) => {
    e.preventDefault();
    setOrderInit(prev => ({
      ...prev,
      coupon: couponInput
    }))
  }

  // console.log(userCart);

  return (
    <>
      {
        cartArray.no_of_carts === 0 ? (
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
                (userCart.length > 0) && userCart ? (
                  userCart.map((item, index) => (
                    <CartProductCard
                      key={index}
                      product={item}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleQuantityInc={handleQuantityInc}
                      handleQuantityDec={handleQuantityDec}
                    />
                  ))) : ('')
              }
            </div>

            <div className='cart_Subtotal_Section section_Wrapper'>
              <p>Subtotal ({priceBoxDetails.cartItemsNumber} items): <span> ₹{priceBoxDetails.totalAmount}</span></p>
              <div className="cart_Footer_Right">
                <button type='submit' className='submit-button' onClick={handleOrderInit}><p>Checkout</p></button>
              </div>
            </div>
            <div className="cart_Coupon_Section section_Wrapper">
              <input type="text" placeholder='Add Coupon Code' className='input-field' value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
              <div className="cart_Coupon_Button">
                <button type='submit' className='submit-button' onClick={handleCoupon}><p>Apply Coupon</p></button>
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
                  (userCart.length > 0) && userCart ? (
                    userCart.map((item, index) => (
                      <CartProductCard
                        key={index}
                        product={item}
                        handleQuantityInc={handleQuantityInc}
                        handleQuantityDec={handleQuantityDec}
                        handleRemoveFromCart={handleRemoveFromCart}
                      />
                    ))) : ('')
                }
              </div>
            </div>

            {/* cart floating Footer */}
            <div className="cart_Footer ">
              <div className="cart_Footer_Left">
                <p className="footer_Price">
                  ₹{`${priceBoxDetails.totalAmount}`}
                </p>
                <p className='footer_Left_Text'>View price details</p>
              </div>
              <div className="cart_Footer_Right">
                <button type='submit' className='submit-button' onClick={handleOrderInit}><p>Checkout</p></button>
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>

  )
}

export default CartSection