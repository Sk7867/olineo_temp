import React, { useEffect, useState } from 'react'
import './WishlistProductCard.css'
import addToCartIcon from '../../assets/vector/cart_outline_blue.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'

const WishlistProductCard = ({ product, handleRemoveFromWishlist, handleAddToCart }) => {
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    color: '',
    price: {},
    image: ''
  })
  const [discount, setDiscount] = useState('')
  useEffect(() => {
    if (product) {
      setProductData({
        id: product._id,
        name: product.name,
        color: product.color,
        price: product.price,
        image: product.images[0]
      })
    }
  }, [product])
  useEffect(() => {
    if (product && product.discount.flatDiscount && product.discount.flatDiscount.value) {
      setDiscount(product.discount.flatDiscount.value)
    } else {
      let mrp = parseInt(product.price.mrp)
      let mop = parseInt(product.price.mop)
      let discount = Math.floor(((mrp - mop) / mrp) * 100)
      setDiscount(discount)
    }
  }, [product])

  // console.log(product);

  return (
    <div className='cart_Product_Contianer section_Wrapper'>
      <div className="cart_Product_Wrapper">
        <div className="product_Details cart_product_card">
          <div className="cart_Product_Left">
            <h4 className='cart_Product_Name'>
              {productData.name}
            </h4>
            <p className="cart_Product_Color">
              Color : {productData.color}
            </p>
            <div className="cart_Product_Price_Section">
              <p className="cart_Product_Discount_Price">
                ₹{product.price.discountPrice ? product.price.discountPrice : product.price.mop}
              </p>
              <p className="cart_Product_Original_Price">
                ₹{product.price.mrp}
              </p>
              <p className='cart_Product_Discount'>
                {discount}% off
              </p>
            </div>
            {/* <p className="cart_Product_Offers">
              {product.productOffersAvailable}
            </p> */}
            {/* {
              matches && (
                <p className={`cart_Product_Availability ${product.productQuantityAvailable <= 10 ? ('color_Red') : ('')} `}>{product.productAvailabilty}</p>
              )
            } */}
          </div>
          {/* {
            !matches && (
              <p className={`cart_Product_Availability ${product.productQuantityAvailable <= 1 ? ('color_Red') : ('')}`}>{product.productAvailabilty}</p>
            )
          } */}
        </div>
        <div className="cart_Product_Card_Right">
          <div className="cart_Product_Image_Container">
            <img src={productData.image} alt="" />
          </div>
        </div>
      </div>
      <div className='combined_Button_Container'>
        <div className="combined_Button_One" onClick={() => handleAddToCart(productData.id)} >
          <img src={addToCartIcon} alt="Save For Later" />
          <p>Add To Cart</p>
        </div>
        <div className="combined_Button_Two" onClick={() => handleRemoveFromWishlist(productData.id)} >
          <img src={deleteIcon} alt="Save For Later" />
          <p>Remove</p>
        </div>
      </div>
    </div>
  )
}

export default WishlistProductCard