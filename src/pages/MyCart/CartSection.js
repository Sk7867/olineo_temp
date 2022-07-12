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
import { getSearchedProduct } from '../../api/Product'

toast.configure()
const CartSection = ({ featureProducts }) => {
  const nav = useNavigate()
  const [cartProducts, setCartProducts] = useState([])
  const [couponInput, setCouponInput] = useState('')
  const [cartSuggestions, setCartSuggestions] = useState([])
  const [cartSuggestProducts, setCartSuggestProducts] = useState({
    loaded: false,
    products: []
  })
  const [suggesProducts, setSuggesProducts] = useState([])


  const {
    cartArray,
    setCartArray,
    setOrderInit,
    allProducts,
    userComboCart,
    setUserComboCart,
    priceBoxDetails
  } = useContext(UserDataContext)

  // useEffect(() => {
  //   getCoupon()
  //     .then(res => {
  //       // console.log(res);
  //     })
  // }, [])

  useEffect(() => {
    if (cartArray && (cartArray.no_of_carts > 0)) {
      cartArray.cart.map((prod) => {
        let immediatRecom = [...prod.complimentoryCatgories.immediate]
        immediatRecom.forEach((recom) => {
          let ind = cartSuggestions.findIndex((prod) => prod === recom)
          if (ind === -1) {
            setCartSuggestions([...cartSuggestions, recom])
          }
        })
      })
    }
  }, [cartArray])

  useEffect(() => {
    if (cartSuggestions && (cartSuggestions.length > 0)) {
      cartSuggestions.map((category) => {
        let searchTerm = 'hierarchyL2=' + category
        getSearchedProduct(searchTerm)
          .then(res => {
            let prod = {}
            prod = res[0]
            if (prod && res) {
              setSuggesProducts([...suggesProducts, prod])
            }
          })
      })
    }
  }, [cartSuggestions])
  // console.log(suggesProducts);

  useEffect(() => {
    if (suggesProducts && (suggesProducts.length > 0)) {
      setCartSuggestProducts(prev => ({
        ...prev,
        loaded: true,
        products: suggesProducts
      }))
    }
  }, [suggesProducts])
  // console.log(cartSuggestProducts);


  const handleQuantityInc = (id) => {
    let tempState = [...cartArray.cart]
    let index = cartArray.cart.findIndex(x => x._id === id)
    let tempElement = { ...tempState[index] }
    tempElement.quantity = tempElement.quantity + 1
    tempState[index] = tempElement
    setCartArray(prev => ({
      ...prev,
      cart: tempState
    }))
  }

  const handleQuantityDec = (id) => {
    let tempState = [...cartArray.cart]
    let index = cartArray.cart.findIndex(x => x._id === id)
    let tempElement = { ...tempState[index] }
    if (tempElement.quantity === 1) {
      tempElement.quantity = 1
    } else {
      tempElement.quantity = tempElement.quantity - 1
    }
    tempState[index] = tempElement
    setCartArray(prev => ({
      ...prev,
      cart: tempState
    }))
  }

  //ORDER INITIALIZATION CODE+++++++++++++++++++++++++++++++++++++++++
  const handleOrderInit = (e) => {
    e.preventDefault();
    let productId = []
    let quantity = []
    cartArray.cart.forEach(item =>
      productId.push(item._id)
    )
    cartArray.cart.forEach((item) => (
      quantity.push(parseInt(item.quantity))
    ))
    setOrderInit(prev => ({
      ...prev,
      productId: productId,
      quantity: quantity
    }))
    nav('/delivery-option')
  }
  // console.log(userComboCart);

  //Remove Product from cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id)
      .then(res => res ? (
        setUserComboCart([]),
        toast.error('Product Removed from Cart'),
        getCartData()
          .then(res => res ? (
            setCartArray({
              loaded: true,
              no_of_carts: res.no_of_carts,
              cart: res.cart,
              combo: res.combo
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

  // console.log(cartArray);

  return (
    <>
      {
        cartArray.no_of_carts === 0 ? (
          <>
            <div className="order_Page_Right">
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your cart is empty</p>
                <button type='submit' className='submit-button' onClick={() => nav('/')} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={featureProducts}
              />
            </div>
          </>
        ) : (
          <div className='order_Page_Right'>
            <p className="cart_Text section_Wrapper">My Cart</p>
            <div className="cards_Container">
              {
                (cartArray.no_of_carts > 0) ? (
                  cartArray.cart.map((item, index) => (
                    <CartProductCard
                      key={index}
                      product={item}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleQuantityInc={handleQuantityInc}
                      handleQuantityDec={handleQuantityDec}
                    />
                  ))) : ('')
              }
              {/* {
                (userComboCart.length > 0) && userComboCart ? (
                  userComboCart.map((item, index) => (
                    <CartProductCard
                      key={index}
                      product={item}
                      comboProduct={true}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleQuantityInc={handleQuantityInc}
                      handleQuantityDec={handleQuantityDec}
                    />
                  ))) : (<></>)
              } */}
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
              productData={cartSuggestProducts}
            />

            {/* cart saved for later */}
            <div className="cart_Save_Later">
              <div className="save_Later_Header section_Wrapper">
                <p className=''>Saved for Later</p>
              </div>
              <div className="cards_Container">
                {
                  (cartArray.no_of_carts > 0) ? (
                    cartArray.cart.map((item, index) => (
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