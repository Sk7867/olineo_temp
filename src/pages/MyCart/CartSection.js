import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'
import { toast } from 'react-toastify'

//Components
import CartProductCard from '../../components/CartProductCard/CartProductCard'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import Section2 from '../../components/Section2/Section2'
import { addToCart, getCartData, removeFromCart } from '../../api/Cart'
import { checkCoupon } from '../../api/couponApi'
import { getProductServiceability, getSearchedProduct } from '../../api/Product'
import { addSaveForLaterItem, deleteSaveForLaterItem, getSaveForLater } from '../../api/SaveForLaterApi'
import getMixedProducts from '../../hooks/getMixedProducts'

toast.configure()
const CartSection = () => {
  const nav = useNavigate()
  const mounted = useRef(false)
  const [couponApplicable, setCouponApplicable] = useState({
    loaded: false,
    applicable: false
  })
  const [couponInput, setCouponInput] = useState('')
  const [couponDetails, setCouponDetails] = useState({})
  const [cartSuggestions, setCartSuggestions] = useState([])
  const [cartSuggestProducts, setCartSuggestProducts] = useState({
    loaded: false,
    products: []
  })
  const [suggesProducts, setSuggesProducts] = useState([])
  const [emptyCartFeaturedProducts, setEmptyCartFeaturedProducts] = useState([])
  const [cartSuggestionArray, setCartSuggestionArray] = useState([])

  const {
    cartArray,
    setCartArray,
    setOrderInit,
    setUserComboCart,
    priceBoxDetails,
    userSaveForLater,
    setUserSaveForLater,
    deliveryEstDays,
    userDefaultAddress,
    setDeliveryEstDays,
    deliveryCharges,
    allProducts
  } = useContext(UserDataContext)

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
    setEmptyCartFeaturedProducts(getMixedProducts(allProducts.products, allProducts.np1, 10))
    setCartSuggestionArray(getMixedProducts(allProducts.products, cartSuggestProducts.products, 10))
  }, [allProducts])

  //suggestions
  useEffect(() => {
    if (cartSuggestions && (cartSuggestions.length > 0)) {
      cartSuggestions.map((category) => {
        let searchTerm = 'hierarchyL2=' + category
        getSearchedProduct(searchTerm)
          .then(res => {
            if (res.no_of_products > 0) {
              let prod = {}
              prod = res.products[0]
              if (prod && res) {
                setSuggesProducts([...suggesProducts, prod])
              }
            }
          })
      })
    }
  }, [cartSuggestions])

  useEffect(() => {
    if (suggesProducts && (suggesProducts.length > 0)) {
      setCartSuggestProducts(prev => ({
        ...prev,
        loaded: true,
        products: suggesProducts
      }))
    }
  }, [suggesProducts])


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
    if (cartArray.no_of_carts > 0) {
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
    } else {
      toast.error('Add Product To Cart')
    }
  }

  //Remove Product from cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id)
      .then(res => res ? (
        setUserComboCart([]),
        toast.error('Product Removed from Cart'),
        getCartData()
          .then(res => {
            if (res) {
              let prod = []
              prod = res?.cart
              if (prod?.length > 0) {
                prod?.forEach((product) => {
                  product["quantity"] = 1;
                })
              }
              setCartArray({
                loaded: true,
                no_of_carts: res.no_of_carts,
                cart: prod,
                combo: res.combo
              })
            }
          })
      ) : (''))
  }

  //Get Coupon Codes
  const handleCoupon = (e) => {
    e.preventDefault();
    if (couponInput !== '') {
      checkCoupon(couponInput)
        .then(res => {
          if (res && res.data && (res.data.status === 'success')) {
            let coupon = res.data.data.coupon
            let couponProducts = [...coupon.products]
            let cartProductsEan = [...cartArray.cart]
            let searchCart = cartProductsEan.find(elem => elem.ean === couponProducts[0])
            if (searchCart) {
              toast.success('Coupon is Applicable')
            } else {
              toast.error('Coupon Not Applicable')
            }
          } else {
            toast.error('Enter Valid Coupon Code')
          }
        }
        )
    } else {
      toast.error('Enter Coupon Code')
    }
  }

  const handleAddItemToSaveForLater = (id) => {
    addSaveForLaterItem(id)
      .then(res => res ? (
        toast.success('Item Added To Save For Later'),
        removeFromCart(id)
          .then(res => res ? (
            setUserComboCart([]),
            toast.error('Product Removed from Cart'),
            getCartData()
              .then(res => {
                if (res) {
                  let prod = []
                  prod = res.cart
                  prod.forEach((product) => {
                    product["quantity"] = 1;
                  })
                  setCartArray({
                    loaded: true,
                    no_of_carts: res.no_of_carts,
                    cart: prod,
                    combo: res.combo
                  })
                }
              })
          ) : ('')),
        getSaveForLater()
          .then(res => {
            setUserSaveForLater({
              loaded: true,
              no_of_save_for_later_items: res.no_of_save_for_later_items,
              save_for_later_items: res.save_for_later_items
            })
          })
      ) : (
        toast.error('Something Went Wrong. Please Try Again Later')
      ))
  }

  const handleAddToCart = (id) => {
    addToCart(id)
      .then(res => res ? (
        toast.success("Product Added to Cart"),
        deleteSaveForLaterItem(id)
          .then(res => {
            getSaveForLater()
              .then(res => {
                setUserSaveForLater({
                  loaded: true,
                  no_of_save_for_later_items: res.no_of_save_for_later_items,
                  save_for_later_items: res.save_for_later_items
                })
              })
          }),
        getCartData()
          .then(res => {
            if (res) {
              let prod = []
              prod = res.cart
              prod.forEach((product) => {
                product["quantity"] = 1;
              })
              setCartArray({
                loaded: true,
                no_of_carts: res.no_of_carts,
                cart: prod,
                combo: res.combo
              })
            }
          })
      ) : (
        toast.success("Something Went Wrong")
      ))
  }

  const handleRemoveFromSaveForLater = (id) => {
    deleteSaveForLaterItem(id)
      .then(res => res ? (
        toast.success('Product Removed from save for later'),
        getSaveForLater()
          .then(res => {
            setUserSaveForLater({
              loaded: true,
              no_of_save_for_later_items: res.no_of_save_for_later_items,
              save_for_later_items: res.save_for_later_items
            })
          })
      ) : (
        toast.error('Something Went Wrong')
      ))
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav("/");
  };

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  //Get Product Delivery Estimate in cart
  useEffect(() => {
    if (cartArray && (cartArray.no_of_carts > 0) && userDefaultAddress.loaded) {
      let itemArray = cartArray.cart.map((item) => {
        let itemObj = {
          skuId: item.ean,
          quantity: item.quantity
        }
        return itemObj
      })
      getProductServiceability(userDefaultAddress.address.zip, itemArray)
        .then(res => {
          if (res) {
            setDeliveryEstDays({
              loaded: true,
              value: res
            })
          }
        })
    }
  }, [cartArray, userDefaultAddress, mounted.current])

  return (
    <>
      {
        (cartArray.no_of_carts === 0) && (userSaveForLater.no_of_save_for_later_items === 0) ? (
          <>
            <div className="order_Page_Right">
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your cart is empty</p>
                <button type='submit' className='submit-button' onClick={() => nav('/')} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={allProducts}
                productArray={emptyCartFeaturedProducts}
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
                      handleAddItemToSaveForLater={handleAddItemToSaveForLater}
                      handleAddToCart={handleAddToCart}
                      handleRemoveFromSaveForLater={handleRemoveFromSaveForLater}
                      deliveryEstDays={deliveryEstDays}
                    />
                  ))) : (
                  <div className="empty_order_sec">
                    <p className="empty_order_text">Your cart is empty</p>
                    <button type="submit" className="submit-button" onClick={pageSwitch}>
                      <p>Start Shopping</p>
                    </button>
                  </div>
                )
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
                      handleAddItemToSaveForLater={handleAddItemToSaveForLater}
                      handleAddToCart={handleAddToCart}
                      handleRemoveFromSaveForLater={handleRemoveFromSaveForLater}
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
              <div className='cart_Coupon_Input'>
                <input type="text" placeholder='Add Coupon Code' className='input-field' value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
              </div>
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
              productData={allProducts}
              productArray={cartSuggestionArray}
            />

            {/* cart saved for later */}
            <div className="cart_Save_Later">
              <div className="save_Later_Header section_Wrapper">
                <p className=''>Saved for Later</p>
              </div>
              <div className="cards_Container">
                {
                  (userSaveForLater.no_of_save_for_later_items > 0) ? (
                    userSaveForLater.save_for_later_items.map((item, index) => (
                      <CartProductCard
                        key={index}
                        product={item}
                        saveForLaterItem={true}
                        handleQuantityInc={handleQuantityInc}
                        handleQuantityDec={handleQuantityDec}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleAddItemToSaveForLater={handleAddItemToSaveForLater}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromSaveForLater={handleRemoveFromSaveForLater}
                      />
                    ))) : (
                    <div className="empty_order_sec">
                      <p className="empty_order_text">Your Save for later is empty</p>
                      <button type="submit" className="submit-button" onClick={pageSwitch}>
                        <p>Start Shopping</p>
                      </button>
                    </div>
                  )
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
              productData={allProducts}
              productArray={cartSuggestionArray}
            />
          </div>
        )
      }
    </>

  )
}

export default CartSection