import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
//CSS
import './CartProductCard.css'

//images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import deleteIconBlack from '../../assets/vector/delete_outline_black.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import saveLaterIcon from '../../assets/vector/save_later_outline.svg'

const CartProductCard = ({
  product, handleQuantityInc, handleQuantityDec, handleRemoveFromCart
}) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [discount, setDiscount] = useState('')
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
  return (
    <div className='cart_Product_Contianer section_Wrapper'>
      <div className="cart_Product_Wrapper">
        <div className="product_Details cart_product_card">
          <div className="cart_Product_Left">
            <h4 className='cart_Product_Name'>
              {product.name}
            </h4>
            <p className="cart_Product_Color">
              Color : {product.color}
            </p>
            <div className="cart_Product_Price_Section">
              <p className="cart_Product_Discount_Price">
                ₹{product.price.mop}
              </p>
              <p className="cart_Product_Original_Price">
                ₹{product.price.mrp}
              </p>
              <p className='cart_Product_Discount'>
                {discount}% off
              </p>
            </div>
            <p className="cart_Product_Offers">
              {product.productOffersAvailable}
            </p>
            {
              matches && (
                <p className={`cart_Product_Availability ${product.productQuantityAvailable <= 10 ? ('color_Red') : ('')} `}>{product.productAvailabilty}</p>
              )
            }
          </div>
          {/* <div className="cart_Product_Delivery_Info">
            <p className="cart_Product_Delivery_Estimate">{product.productDeliveryExpected}</p> | <p className="cart_Product_Delivery_Charge">₹{product.productDeliveryCharge}</p>
          </div> */}
          {
            !matches && (
              <p className={`cart_Product_Availability ${product.productQuantityAvailable <= 1 ? ('color_Red') : ('')}`}>{product.productAvailabilty}</p>
            )
          }
        </div>
        <div className="cart_Product_Card_Right">
          <div className="cart_Product_Image_Container">
            <img src={product.images[0]} alt="" />
          </div>
          <div className="cart_Product_Counter_Container">
            <div className='counter_Icon_Container' onClick={() => handleQuantityDec(product._id)} >
              <img src={deleteIconBlack} alt="Delete" />
            </div>
            <p className='cart_Product_Counter'>{product.quantity}</p>
            <div className='counter_Icon_Container' onClick={() => handleQuantityInc(product._id)} >
              <img src={addIcon} alt="Add" />
            </div>
          </div>
        </div>
      </div>
      <div className='combined_Button_Container'>
        <div className="combined_Button_One">
          <img src={saveLaterIcon} alt="Save For Later" />
          <p>Save for Later</p>
        </div>
        <div className="combined_Button_Two" onClick={() => handleRemoveFromCart(product._id)} >
          <img src={deleteIcon} alt="Save For Later" />
          <p>Remove</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
