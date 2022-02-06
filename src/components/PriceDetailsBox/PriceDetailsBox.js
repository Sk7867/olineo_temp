import { useState } from 'react'
import './PriceDetailsBox.css'

const PriceDetailsBox = ({ HideDetails }) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="cart_Price_details">
      <div className="cart_Details_Header">
        <p>Price Details</p>
      </div>
      {
        showDetails && (
          <div className="cart_Details_Body">
            <div className="cart_Details_Price">
              <p>Price (2 items) </p>
              <p>₹{`2000`}</p>
            </div>
            <div className="cart_Details_Discount">
              <p>Discount</p>
              <p>-₹{`800`}</p>
            </div>
            <div className="cart_Details_Delivery">
              <p>Delivery Charges</p>
              <p>₹{`80`}</p>
            </div>
          </div>
        )
      }
      <div className="cart_Details_Footer">
        <p>Total Amount</p>
        <p>₹{`1,280`}</p>
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
