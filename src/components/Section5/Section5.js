import React from 'react'
import OfferTemplate from '../OfferTemplate/OfferTemplate'
import './Section5.css'

const Section5 = () => {
  return (
    <>
      <div className="section5_Container">
        <div className="section5_Wrapper">
          <OfferTemplate />
          <OfferTemplate />
          <OfferTemplate />
          <div className='scroll_Buffer'></div>
        </div>
      </div>
    </>
  )
}

export default Section5