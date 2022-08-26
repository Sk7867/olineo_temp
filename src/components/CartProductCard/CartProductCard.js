import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
//CSS
import './CartProductCard.css'

//images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import deleteIconBlack from '../../assets/vector/delete_outline_black.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import saveLaterIcon from '../../assets/vector/save_later_outline.svg'
import addToCartIcon from '../../assets/vector/cart_outline_blue.svg'
import SkeletonElement from '../Skeletons/SkeletonElement'

const CartProductCard = ({
  product,
  handleQuantityInc,
  handleQuantityDec,
  handleRemoveFromCart,
  comboProduct = false,
  saveForLaterItem = false,
  handleAddItemToSaveForLater,
  handleAddToCart,
  handleRemoveFromSaveForLater,
  deliveryEstDays,
}) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [discount, setDiscount] = useState('')
  const [prodData, setProdData] = useState({
    id: '',
    ean: '',
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
    quantity: '',
    deliveryEst: {
      days: '',
      amount: '',
      loaded: false,
      msg: '',
      error: false
    }
  })
  useEffect(() => {
    if (product) {
      setProdData(prev => ({
        ...prev,
        id: product._id,
        ean: product.ean,
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
      setProdData(prev => ({ ...prev, discount: product.discount.flatDiscount.value }))
    } else {
      let mrp = parseInt(product.price.mrp)
      let mop = parseInt(product.price.mop)
      let discount = Math.floor(((mrp - mop) / mrp) * 100)
      setProdData(prev => ({ ...prev, discount: discount }))
    }
  }, [product])

  useEffect(() => {
    var prodDelDay
    var prodDelPrice
    if (prodData && prodData.id && deliveryEstDays && deliveryEstDays.loaded) {
      let prodDelEst = deliveryEstDays.value.find((obj) => obj.skuId === prodData.ean)
      if (prodDelEst && prodDelEst.deliverymodes.length > 0) {
        prodDelPrice = prodDelEst.deliverymodes[0].deliveryCost.value
        let time = prodDelEst.deliverymodes[0].deliveryTime
        prodDelDay = Math.floor(parseInt(time) / 24)
        setProdData((prev) => ({
          ...prev,
          deliveryEst: {
            loaded: true,
            amount: prodDelPrice,
            days: prodDelDay,
            msg: '',
            error: false
          }
        }))
      } else {
        setProdData((prev) => ({
          ...prev,
          deliveryEst: {
            loaded: true,
            error: true,
            msg: 'Product Not Available'
          }
        }))
      }
    }
  }, [deliveryEstDays])

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
          <div className="cart_Product_Delivery_Info">
            {
              prodData.deliveryEst.loaded ? (
                <>
                  {
                    prodData.deliveryEst.error ? (
                      <>
                        <p className="cart_Product_Delivery_Estimate">{prodData.deliveryEst.msg}</p>
                      </>
                    ) : (
                      <>
                        <p className="cart_Product_Delivery_Estimate">Delivery in {prodData.deliveryEst.days} days</p> | <p className="cart_Product_Delivery_Charge">₹{prodData.deliveryEst.amount}</p>
                      </>
                    )
                  }
                </>
              ) : (
                <></>
              )
            }
          </div>
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
            !comboProduct && !saveForLaterItem ? (
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
            <>
              {
                saveForLaterItem ? (
                  <div className="combined_Button_One" onClick={() => handleAddToCart(prodData.id)}>
                    <img src={addToCartIcon} alt="Add To Cart" />
                    <p>Add To Cart</p>
                  </div>
                ) : (
                  <div className="combined_Button_One" onClick={() => handleAddItemToSaveForLater(prodData.id)}>
                    <img src={saveLaterIcon} alt="Save For Later" />
                    <p>Save for Later</p>
                  </div>
                )
              }
            </>
            <>
              {
                saveForLaterItem ? (
                  <div className="combined_Button_Two" onClick={() => handleRemoveFromSaveForLater(prodData.id)} >
                    <img src={deleteIcon} alt="Remove Save For later Item" />
                    <p>Remove</p>
                  </div>
                ) : (
                  <div className="combined_Button_Two" onClick={() => handleRemoveFromCart(prodData.id)} >
                    <img src={deleteIcon} alt="Remove Cart Item" />
                    <p>Remove</p>
                  </div>
                )
              }
            </>
          </div>
        ) : (<></>)
      }
    </div>
  )
}

export default CartProductCard
