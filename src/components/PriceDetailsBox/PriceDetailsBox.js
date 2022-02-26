import { useState, useEffect } from 'react'
import './PriceDetailsBox.css'

const PriceDetailsBox = ({ HideDetails, cartData, classes }) => {
  const [showDetails, setShowDetails] = useState(true);
  //Get Number of cart Items
  let cartItemsNumber = cartData.length

  //Get Price from cart Items
  var cartItemsPrice = 0
  cartData.forEach(item => {
    cartItemsPrice += parseInt(item.productOriginalPrice)
  });

  //Get Discounted Price
  var totalDiscount = 0
  cartData.forEach(item => {
    var itemDiscount
    itemDiscount = parseInt(item.productOriginalPrice) - parseInt(item.productDiscountPrice)
    totalDiscount += itemDiscount
  });

  //Get Delivery Charges
  var totalDeliveryCharge = 0
  cartData.forEach(item => {
    totalDeliveryCharge += parseInt(item.productDeliveryCharge)
  });


  //Get Total Amount
  var totalAmount = cartItemsPrice - totalDiscount + totalDeliveryCharge


  console.log(classes);
  return (
    <div className={"cart_Price_details " + (classes ? classes.containerClass : '')}>
      <div className="cart_Details_Header">
        <p>Price Details</p>
      </div>
      {
        showDetails && (
          <div className="cart_Details_Body">
            <div className="cart_Details_Price">
              <p>Price ({cartItemsNumber} items) </p>
              <p>₹{cartItemsPrice}</p>
            </div>
            <div className="cart_Details_Discount">
              <p>Discount</p>
              <p>-₹{totalDiscount}</p>
            </div>
            <div className="cart_Details_Delivery">
              <p>Delivery Charges</p>
              <p>₹{totalDeliveryCharge}</p>
            </div>
          </div>
        )
      }
      <div className="cart_Details_Footer">
        <p>Total Amount</p>
        <p>₹{totalAmount}</p>
      </div>
      {
        HideDetails && (
          <div className="cart_Details_Hide" onClick={() => setShowDetails(!showDetails)}>
            <p>{showDetails ? ('Hide') : ('Show')} Price Details</p>
          </div>
        )
      }
    </div>
  )
}

export default PriceDetailsBox
