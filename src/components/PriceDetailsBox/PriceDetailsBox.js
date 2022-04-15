import { useState, useEffect, useContext } from 'react'
import './PriceDetailsBox.css'
import { UserDataContext } from '../../Contexts/UserContext'

const PriceDetailsBox = ({ HideDetails, classes }) => {
  const [showDetails, setShowDetails] = useState(true);
  const { userCart, setUserCart } = useContext(UserDataContext)

  //Get Price from cart Items
  var cartItemsPrice = 0
  userCart.cart.forEach(item => {
    cartItemsPrice += parseInt(item.productOriginalPrice)
  });

  //Get Discounted Price
  var totalDiscount = 0
  userCart.cartData.forEach(item => {
    var itemDiscount
    itemDiscount = parseInt(item.productOriginalPrice) - parseInt(item.productDiscountPrice)
    totalDiscount += itemDiscount
  });

  //Get Delivery Charges
  var totalDeliveryCharge = 0
  userCart.cart.forEach(item => {
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
              <p>Price ({userCart.no_of_carts} items) </p>
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
