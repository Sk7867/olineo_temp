import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'

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
import { getSaveForLater } from '../../api/SaveForLaterApi'
import getMixedProducts from '../../hooks/getMixedProducts'

const MyCart = ({ setHeaderData }) => {
  const {
    allProducts,
    cartArray,
    setCartArray,
    userSaveForLater,
    setUserSaveForLater,
  } = useContext(UserDataContext)
  const [emptyCartFeaturedProducts, setEmptyCartFeaturedProducts] = useState([])
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
    setEmptyCartFeaturedProducts(getMixedProducts(allProducts.products, allProducts.np1, 10))
  }, [allProducts])


  useEffect(() => {
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
  }, [])

  useEffect(() => {
    getSaveForLater()
      .then(res => {
        if (res) {
          setUserSaveForLater({
            loaded: true,
            no_of_save_for_later_items: res.no_of_save_for_later_items,
            save_for_later_items: res.save_for_later_items
          })
        }
      })
  }, [])

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }
  //Test comment to include file in commit - 01/10/2022

  const getRandomProductArr = (arr, num) => {
    const shuffledArr = [...arr].sort(() => 0.5 - Math.random())
    return shuffledArr.slice(0, num)
  }

  const featureProducts = getRandomProductArr(allProducts.products, 10)

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

  return (
    <>
      <div className='page_Wrapper page_Margin_Top'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          (cartArray.no_of_carts === 0) && (userSaveForLater.no_of_save_for_later_items === 0) ? (
            <>
              <div className="empty_order_sec">
                <p className='empty_order_text'>Your cart is empty</p>
                <button type='submit' className='submit-button' onClick={pageSwitch} ><p>Start Shopping</p></button>
              </div>
              <Section2
                id={'Top-sellers-sec'}
                heading='Top Sellers'
                productData={allProducts}
                productArray={emptyCartFeaturedProducts}
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
                <CartSection />
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
