import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

//CSS
import './BankOffer.css'

const BankOffer = ({ setHeaderData }) => {
  const loc = useLocation()
  const [offerInfo, setOfferInfo] = useState({
    offerHeading: '',
    offerName: '',
    offerAvail: []
  })
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: '',
      categoriesCond: false,
    })
  }, []);

  useEffect(() => {
    if (loc.state) {
      let data = loc.state
      setOfferInfo({
        offerHeading: data.offerHeading,
        offerName: data.offerName,
        offerAvail: data.offerAvail.split('~'),
      })
    }
  }, [loc.state])

  return (
    <div className='page_Wrapper page_Margin_Top  page_Margin_Top_Secondary'>
      <div className='desk_Page_Wrapper'>
        <div className='bank_Offer_Container'>
          <h3 className="bank_Offer_Heading">
            {offerInfo.offerHeading}
          </h3>
          <p className="bank_Offer_Desc">
            {offerInfo.offerName}
          </p>
          <p className="offer_Question">
            How to avail offer?
          </p>
          <ul className='offer_Conditions_List'>
            {
              offerInfo.offerAvail.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BankOffer