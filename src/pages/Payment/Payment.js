//
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './Payment.css'

//Components
import PriceDetailsBox from "../../components/PriceDetailsBox/PriceDetailsBox"
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import dashGreyIcon from '../../assets/vector/dash_grey.svg'

const Payment = ({ setHeaderData, cartData }) => {
  const [giftCard, setGiftCard] = useState(false)
  const [disable, setDisable] = useState(true);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');
  const matches = useMediaQuery("(min-width:768px)")
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart, userCart } = useContext(UserDataContext)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Payment',
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  const paymentMethods = [
    'UPI',
    'Credit/ Debit/ ATM Card',
    'Net Banking',
    'Cash on Delivery'
  ]

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'My Cart',
      url: '/mycart'
    },
    {
      text: 'Payment',
      url: ''
    },
  ]
  // console.log(paymentMethodSelected);

  return (
    <>
      <div className="page_Wrapper page_Margin_Top_Secondary">
        <BreadCrumbs data={breadCrumbsData} />
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
            <PriceDetailsBox HideDetails={false} />
          </aside>
          <div className='order_Page_Right'>
            <div className="payment_Header">
              <p>Subtotal ₹{`1,280`}</p>
              <p>Payment Methods</p>
            </div>

            {/* cart price detials */}
            <div className='tab_None'>
              <PriceDetailsBox HideDetails={true} />
            </div>

            <div className='payment_Methods'>
              <div className="payment_Methods_Header">
                Payment Methods
              </div>
              <div className="payment_Methods_Body">
                {
                  paymentMethods.map((item, index) => (
                    <div key={index}>
                      <label htmlFor={item} className={`radiobtn-label payment_Methods_Labels ${paymentMethodSelected === index ? ('payment_Methods_Selected') : ('')}`} onClick={() => { setPaymentMethodSelected(index); setDisable(false) }}>
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
                    <div className="gift_Card_Header tab_None">
                      Gift Card
                    </div>
                    <div className="gift_Card_Header mobile_None tab_Display_Flex" onClick={() => setGiftCard(false)}>
                      <span><img src={dashGreyIcon} alt="" /></span>
                      Gift Card
                    </div>
                    <div className="gift_Card_Body">
                      <input type="text" placeholder='Coupon code' />
                      <div className='gift_Card_Submit mobile_None tab_Display_Flex'>
                        <button type='submit' className='submit-button'><p>Apply</p></button>
                      </div>
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

            {
              matches && (
                <div className='home_Delivery_Submit'>
                  <button type='submit' className='submit-button ' disabled={disable}><p>Continue to pay</p></button>
                </div>
              )
            }

            {
              !matches && (
                <div className="address_Footer">
                  <button type='submit' className='submit-button' disabled={disable}><p>Continue</p></button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
