import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
//CSS
import './CartProductCard.css'

//images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import deleteIconBlack from '../../assets/vector/delete_outline_black.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import saveLaterIcon from '../../assets/vector/save_later_outline.svg'

const CartProductCard = ({
  product,
}) => {
  const matches = useMediaQuery("(min-width:768px)")
  // console.log(product);
  return (
    <div className='cart_Product_Contianer section_Wrapper'>
      <div className="cart_Product_Wrapper">
        <div className="product_Details cart_product_card">
          <div className="cart_Product_Left">
            <h4 className='cart_Product_Name'>
              {product.name}
            </h4>
            <p className="cart_Product_Color">
              Color : {product.productColor}
            </p>
            <div className="cart_Product_Price_Section">
              <p className="cart_Product_Discount_Price">
                ₹{product.price}
              </p>
              <p className="cart_Product_Original_Price">
                ₹{parseInt(product.price) + 2000}
              </p>
              <p className='cart_Product_Discount'>
                {product.productDiscount}% off
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
          <div className="cart_Product_Delivery_Info">
            <p className="cart_Product_Delivery_Estimate">{product.productDeliveryExpected}</p> | <p className="cart_Product_Delivery_Charge">₹{product.productDeliveryCharge}</p>
          </div>
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
            <div className='counter_Icon_Container'>
              <img src={deleteIconBlack} alt="Delete" />
            </div>
            <p className='cart_Product_Counter'>1</p>
            <div className='counter_Icon_Container'>
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
        <div className="combined_Button_Two">
          <img src={deleteIcon} alt="Save For Later" />
          <p>Remove</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
