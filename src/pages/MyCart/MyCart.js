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
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart, userCart, allProducts, cartArray, setCartArray } = useContext(UserDataContext)
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
  console.log(cartArray);
  console.log(userCart);

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
                <aside className="side_Section" style={{ padding: '0', background: 'none' }}>
                  <PriceDetailsBox HideDetails={false} classes={{ containerClass: '' }} />
                  <div className="cart_Add_Items section_Wrapper">
                    <div className="add_Items_Wrapper">
                      <p>Add items worth ₹{`600`} to qualify for FREE Delivery</p>
                    </div>
                    <div className="cart_More_Items">
                      <button type='submit' className='submit-button'><p>Add more items</p></button>
                    </div>
                  </div>
                </aside>
                <CartSection featureProducts={allProducts} />
                {/* <Section2
                  id={'Top-sellers-sec'}
                  heading='Top Sellers'
                  productData={allProducts}
                /> */}
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
