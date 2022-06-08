import React, { useState } from 'react'
import './OfferCard.css'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

//Images
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import BankOfferModal from '../ModalComponenr/BankOfferModal'

const OfferCard = ({ offer }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [modalShow, setModalShow] = useState(false)
  // console.log(toggleDescription);

  return (
    <>
      {  /*
        matches && toggleDescription ? ('') : ('')
      */  }
      <div className='offer_Card_Container'>
        <div>
          <p className="offer_Card_Name">Bank Offer</p>
          <p className="offer_Card_Desc">{offer.offerName}</p>
        </div>
        {
          matches ? (
            <div className="offer_Card_Link" onClick={() => setModalShow(true)} >
              <p>See more</p>
              <img src={arrowRightBlue} alt="" />
            </div>
          ) : (
            <Link to={'/bank-offer'} state={offer} className="offer_Card_Link">
              <p>See more</p>
              <img src={arrowRightBlue} alt="" />
            </Link>
          )
        }
        {  /*
          matches ? (
            <>
              <div className="offer_Tooltip_Backdrop"></div>
              <div className="offer_Tooltip_Container">
                <p className="offer_Card_Name offer_Tooltip_Heading">
                  {offer.offer_Name}
                </p>
                <p className='offer_Card_Desc offer_Tooltip_Desc'>
                  {offer.offer_desc}
                </p>
                <p className='offer_Tooltip_ListHeading'>
                  <ul>
                    {
                      offer.offerAvail.map((elem, index) => (
                        <li key={index}>{elem}</li>
                      ))
                    }
                  </ul>
                </p>
              </div>
            </>
          ) : ('')
                  */  }
      </div>
      <BankOfferModal modalShow={modalShow} setModalShow={setModalShow} offerModalData={offer} />
    </>
  )
}

export default OfferCard