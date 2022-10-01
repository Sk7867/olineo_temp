import { useState, useEffect, useContext, useRef } from 'react'
import './PriceDetailsBox.css'
import { UserDataContext } from '../../Contexts/UserContext'

const PriceDetailsBox = ({ HideDetails, classes }) => {
  const [showDetails, setShowDetails] = useState(true);
  const { cartArray, priceBoxDetails } = useContext(UserDataContext)

  let cartItemsNumber = cartArray.no_of_carts

  return (
    <div className={"cart_Price_details section_Wrapper " + (classes ? classes.containerClass : '')}>
      <div className="cart_Details_Header">
        <p>Price Details</p>
      </div>
      {
        showDetails && (
          <div className="cart_Details_Body">
            <div className="cart_Details_Price">
              <p>Price ({priceBoxDetails.cartItemsNumber} items) </p>
              <p>₹{priceBoxDetails.cartItemsPrice}</p>
            </div>
            <div className="cart_Details_Discount">
              <p>Discount</p>
              <p>-₹{priceBoxDetails.totalDiscount}</p>
            </div>
            <div className="cart_Details_Delivery">
              <p>Delivery Charges</p>
              <p>₹{priceBoxDetails.totalDeliveryCharge}</p>
            </div>
          </div>
        )
      }
      <div className="cart_Details_Footer">
        <p>Total Amount</p>
        <p>₹{priceBoxDetails.totalAmount}</p>
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
