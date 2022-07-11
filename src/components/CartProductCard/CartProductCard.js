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
  product, handleQuantityInc, handleQuantityDec, handleRemoveFromCart, comboProduct = false
}) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [discount, setDiscount] = useState('')
  const [prodData, setProdData] = useState({
    id: '',
    name: '',
    color: '',
    price: {
      mrp: '',
      mop: '',
      discountPrice: ''
    },
    discount: '',
    productOffersAvailable: '',
    productQuantityAvailable: '',
    productAvailabilty: '',
    image: '',
    quantity: ''
  })
  useEffect(() => {
    if (product) {
      setProdData(prev => ({
        ...prev,
        id: product._id,
        name: product.name,
        color: product.color,
        price: product.price,
        productOffersAvailable: product.productOffersAvailable,
        productAvailabilty: product.productAvailabilty,
        productQuantityAvailable: product.productQuantityAvailable,
        image: product.images[0],
        quantity: product.quantity
      }))
    }
  }, [product])

  useEffect(() => {
    if (product && product.discount.flatDiscount && product.discount.flatDiscount.value) {
      setDiscount(product.discount.flatDiscount.value)
    } else {
      let mrp = parseInt(product.price.mrp)
      let mop = parseInt(product.price.mop)
      let discount = Math.floor(((mrp - mop) / mrp) * 100)
      setProdData(prev => ({ ...prev, discount: discount }))
    }
  }, [product])
  // console.log(prodData);
  return (
    <div className='cart_Product_Contianer section_Wrapper'>
      <div className={`cart_Product_Wrapper ${comboProduct ? 'border-0' : ''}`}>
        <div className="product_Details cart_product_card">
          <div className="cart_Product_Left">
            <h4 className='cart_Product_Name'>
              {prodData.name}
            </h4>
            <p className="cart_Product_Color">
              Color : {prodData.color}
            </p>
            <div className="cart_Product_Price_Section">
              <p className="cart_Product_Discount_Price">
                ₹{prodData.price.discountPrice ? prodData.price.discountPrice : prodData.price.mop}
              </p>
              <p className="cart_Product_Original_Price">
                ₹{prodData.price.mrp}
              </p>
              <p className='cart_Product_Discount'>
                {prodData.discount}% off
              </p>
            </div>
            <p className="cart_Product_Offers">
              {prodData.productOffersAvailable}
            </p>
            {
              matches && (
                <p className={`cart_Product_Availability ${prodData.productQuantityAvailable <= 10 ? ('color_Red') : ('')} `}>{prodData.productAvailabilty}</p>
              )
            }
          </div>
          {/* <div className="cart_Product_Delivery_Info">
            <p className="cart_Product_Delivery_Estimate">{product.productDeliveryExpected}</p> | <p className="cart_Product_Delivery_Charge">₹{product.productDeliveryCharge}</p>
          </div> */}
          {
            !matches && (
              <p className={`cart_Product_Availability ${prodData.productQuantityAvailable <= 1 ? ('color_Red') : ('')}`}>{prodData.productAvailabilty}</p>
            )
          }
        </div>
        <div className="cart_Product_Card_Right">
          <div className="cart_Product_Image_Container">
            <img src={prodData.image} alt="" />
          </div>
          {
            !comboProduct ? (
              <div className="cart_Product_Counter_Container">
                <div className='counter_Icon_Container' onClick={() => handleQuantityDec(prodData.id)} >
                  <img src={deleteIconBlack} alt="Delete" />
                </div>
                <p className='cart_Product_Counter'>{prodData.quantity}</p>
                <div className='counter_Icon_Container' onClick={() => handleQuantityInc(prodData.id)} >
                  <img src={addIcon} alt="Add" />
                </div>
              </div>
            ) : (<></>)
          }
        </div>
      </div>
      {
        !comboProduct ? (
          <div className='combined_Button_Container'>
            <div className="combined_Button_One">
              <img src={saveLaterIcon} alt="Save For Later" />
              <p>Save for Later</p>
            </div>
            <div className="combined_Button_Two" onClick={() => handleRemoveFromCart(prodData.id)} >
              <img src={deleteIcon} alt="Save For Later" />
              <p>Remove</p>
            </div>
          </div>
        ) : (<></>)
      }
    </div>
  )
}

export default CartProductCard
