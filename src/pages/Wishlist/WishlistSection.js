import React, { useContext } from 'react'
import Section2 from '../../components/Section2/Section2'
import WishlistProductCard from '../../components/WishlistProductCard/WishlistProductCard'
import { UserDataContext } from '../../Contexts/UserContext'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { deleteFromWishlist, getAllWishlistItems } from '../../api/wishlistApi'
import { useNavigate } from 'react-router-dom'
import { addToCart, getCartData } from '../../api/Cart'

toast.configure()
const WishlistSection = () => {
  const {
    userWishlist,
    setUserWishlist,
    allProducts,
    setCartArray
  } = useContext(UserDataContext)
  const nav = useNavigate()

  const handleAddToCart = (id) => {
    addToCart(id)
      .then(res => res ? (
        toast.success("Product Added to Cart"),
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
      ) : (''))
  }

  const handleRemoveFromWishlist = (id) => {
    deleteFromWishlist(id)
      .then(res => res ? (
        toast.error('Product Removed from Wishlist'),
        getAllWishlistItems()
          .then(res => {
            if (res) {
              setUserWishlist({
                loaded: true,
                no_of_wishlist_items: res.no_of_wishlist_items,
                wishlist_items: [...res.wishlist_items]
              })
            }
          })
      ) : (''))
  }

  return (
    <>
      {
        userWishlist.no_of_wishlist_items === 0 ? (
          <>
            <div className="order_Page_Right">
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your Wishlist is empty</p>
                <button type='submit' className='submit-button' onClick={() => nav('/')} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={allProducts}
              />
            </div>
          </>
        ) : (
          <div className='order_Page_Right'>
            <p className="cart_Text section_Wrapper">My Wishlist</p>
            <div className="cards_Container">
              {
                userWishlist.wishlist_items.map((item, index) => (
                  <WishlistProductCard
                    key={index}
                    product={item}
                    handleRemoveFromWishlist={handleRemoveFromWishlist}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              }
            </div>

            {/* <div className='cart_Subtotal_Section section_Wrapper'>
                <p>Subtotal ({priceBoxDetails.cartItemsNumber} items): <span> ₹{priceBoxDetails.totalAmount}</span></p>
                <div className="cart_Footer_Right">
                  <button type='submit' className='submit-button' onClick={handleOrderInit}><p>Checkout</p></button>
                </div>
              </div> */}
            {/* <div className="cart_Coupon_Section section_Wrapper">
                <input type="text" placeholder='Add Coupon Code' className='input-field' value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                <div className="cart_Coupon_Button">
                  <button type='submit' className='submit-button' onClick={handleCoupon}><p>Apply Coupon</p></button>
                </div>
              </div> */}

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
            {/* <div className={'tab_None'}>
                <PriceDetailsBox HideDetails={false} />
              </div> */}

            {/* cart carousel section */}
            {/* <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={featureProducts}
              /> */}

            {/* cart saved for later */}
            {/* <div className="cart_Save_Later">
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
              </div> */}

            {/* cart floating Footer */}
            {/* <div className="cart_Footer ">
                <div className="cart_Footer_Left">
                  <p className="footer_Price">
                    ₹{`${priceBoxDetails.totalAmount}`}
                  </p>
                  <p className='footer_Left_Text'>View price details</p>
                </div>
                <div className="cart_Footer_Right">
                  <button type='submit' className='submit-button' onClick={handleOrderInit}><p>Checkout</p></button>
                </div>
              </div> */}
            <Section2
              id={'Top-sellers-sec'}
              heading='Top Sellers'
              productData={allProducts}
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

export default WishlistSection