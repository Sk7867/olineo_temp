//
import { useState } from 'react'

//CSS
import './Payment.css'

//Components
import PriceDetailsBox from "../../components/PriceDetailsBox/PriceDetailsBox"
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2'


//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'

const Payment = () => {
  const [giftCard, setGiftCard] = useState(false)

  const paymentMethods = [
    'UPI',
    'Credit/ Debit/ ATM Card',
    'Net Banking',
    'Cash on Delivery'
  ]

  return (
    <>
      <HeaderBar2 header3={true} headerText={'Payment'} />
      <div className="page_Wrapper">
        <div className="payment_Header">
          <p>Subtotal ₹{`1,280`}</p>
        </div>

        {/* cart price detials */}
        <PriceDetailsBox HideDetails={true} />

        <div className='payment_Methods'>
          <div className="payment_Methods_Header">
            Payment Methods
          </div>
          <div className="payment_Methods_Body">
            {
              paymentMethods.map((item, index) => (
                <div>
                  <label htmlFor={item} className="radiobtn-label" key={index}>
                    <input type="radio" name='payment' id={item} value={item} />
                    <span className="radio-custom"></span>{item}
                  </label>
                </div>
              ))
            }
          </div>
        </div>

        <div className="gift_card">
          {
            giftCard ? (
              <div className="gift_Card_Details">
                <div className="gift_Card_Header">
                  Gift Card
                </div>
                <div className="gift_Card_Body">
                  <input type="text" placeholder='Coupon code' />
                </div>
                <div className="gift_Card_Footer">
                  <div onClick={() => setGiftCard(false)}><p>Cancel</p></div>
                  <div><p>Apply</p></div>
                </div>
              </div>
            ) : (
              <div className='add_Gift_Card' onClick={() => setGiftCard(true)}>
                <img src={addIcon} alt="" />
                <p>Add Gift Card </p>
              </div>
            )
          }
        </div>

        <div className="address_Footer">
          <button type='submit' className='submit-button'><p>Continue</p></button>
        </div>
      </div>

    </>
  )
}

export default Payment
