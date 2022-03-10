import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
//CSS
import './Section2.css'

const Section2 = ({ id, heading, productData }) => {

  return (
    <div className='section2_container' id={id}>
      <h3 className="section2_heading">{heading}</h3>
      <div className="section2_card_container">
        <div className="section2_card_wrapper">
          {
            productData.map((item, index) => (
              <ProductBox
                key={index}
                product_img={item.product_image}
                card_heading={'STARTING AT'}
                product_price={item.product_price}
                product_name={item.product_name}
                classes={item.classes}
                product={item}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Section2
