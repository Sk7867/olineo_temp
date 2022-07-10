import React from 'react'
import './OfferTemplate.css'
import commerceIcon from '../../assets/vector/commerce_icon.svg'
import olineoIcon from '../../assets/vector/olineo_logo.svg'

const OfferTemplate = () => {

  const handleClick = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="offerTemplate_Container">

        <div className="offerTemplate_Left">
          <div className="logo_Image_Wrapper">
            <img src={olineoIcon} alt="" />
          </div>
          <div className="offerTemplate_Left_Content">
            <div className="offerTemplate_Left_Heading">
              Buy a laptop at best price.
            </div>
            <div className="offerTemplate_Left_Subheading">
              Its okay to care about money
            </div>
          </div>
          <div className="offerTemplate_Button">
            <button type='submit' className='submit-button' onClick={handleClick} ><p>Buy Now</p></button>
          </div>
        </div>
        <div className="offerTemplate_Right">
          <div className="offerTemplate_Image_Wrapper">
            <img src={commerceIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default OfferTemplate