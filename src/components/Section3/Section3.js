import React from 'react'
//CSS
import './Section3.css'
//images
import productCard from '../../assets/png/product_1.png'
import productBanner from '../../assets/png/product_banner.png'
import SkeletonElement from '../Skeletons/SkeletonElement'

const Section3 = ({ id, heading, cardButton, productData }) => {

  return (
    <div id={id} className='section3_container'>
      <h3 className="section3_heading">{heading}</h3>
      <div className="section3_content">
        {(productData.no_of_products > 0) && (
          <>
            <img src={productCard} alt="" className='section3_card_img logo_mob' />
            <img src={productBanner} alt="" className='section3_banner logo_tab logo_desk' />
          </>
        )}
        {
          (productData.no_of_products === 0) && (<SkeletonElement type={'productBannerSmall'} />)
        }
        {
          cardButton && (
            <button type='submit' className='submit-button logo_mob' ><p>Notify Me</p></button>
          )
        }
      </div>
    </div>
  )
}

export default Section3
