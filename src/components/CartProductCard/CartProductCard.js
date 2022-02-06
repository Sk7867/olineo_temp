import React from 'react'
//CSS
import './CartProductCard.css'

//images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import deleteIconBlack from '../../assets/vector/delete_outline_black.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import saveLaterIcon from '../../assets/vector/save_later_outline.svg'

const CartProductCard = ({
  productImage,
  productName,
  productColor,
  productOriginalPrice,
  productDiscount,
  productDiscountPrice,
  productOffersAvailable,
  productDeliveryExpected,
  productDeliveryCharge,
  productAvailabilty,
}) => {
  return (
    <div className='cart_Product_Contianer'>
      <div className="cart_Product_Wrapper">
        <div className="product_Details cart_product_card">
          <div className="cart_Product_Left">
            <h4 className='cart_Product_Name'>
              {productName}
            </h4>
            <p className="cart_Product_Color">
              Color : {productColor}
            </p>
            <div className="cart_Product_Price_Section">
              <p className="cart_Product_Discount_Price">
                {productDiscountPrice}
              </p>
              <p className="cart_Product_Original_Price">
                {productOriginalPrice}
              </p>
              <p className='cart_Product_Discount'>
                {productDiscount} off
              </p>
            </div>
            <p className="cart_Product_Offers">
              {productOffersAvailable}
            </p>
            <p className="cart_Product_Availability">{productAvailabilty}</p>
          </div>
          <div className="cart_Product_Delivery_Info">
            <p className="cart_Product_Delivery_Estimate">{productDeliveryExpected}</p> | <p className="cart_Product_Delivery_Charge">{productDeliveryCharge}</p>
          </div>
          <p className="cart_Product_Availability tab_None">{productAvailabilty}</p>
        </div>
        <div className="cart_Product_Card_Right">
          <div className="cart_Product_Image_Container">
            <img src={productImage} alt="" />
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
      <div className='cart_Card_Buttons'>
        <div className="cart_button_save">
          <img src={saveLaterIcon} alt="Save For Later" />
          <p>Save for Later</p>
        </div>
        <div className="cart_button_remove">
          <img src={deleteIcon} alt="Save For Later" />
          <p>Remove</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
