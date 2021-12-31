import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
//CSS
import './Section4.css'

const Section4 = ({ id, heading, productData, link }) => {
  return (
    <div className='section4_container' id={id}>
      <div className="section4_header">
        <h3 className="section4_heading">{heading}</h3>
        <a href={link.link} className="section4_link logo_desk">{link.text}</a>
      </div>
      <div className="section4_card_container">
        {
          productData.map((item, index) => (
            <ProductBox
              key={index}
              product_img={item.product_image}
              card_heading={'Upto'}
              product_name={item.product_name}
              product_price={item.product_price}
              classes={item.classes}
            />
          ))
        }
      </div>
      <a href={link.link} className="section4_link mob_link logo_mob">{link.text}</a>
    </div>
  )
}

export default Section4
