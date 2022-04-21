import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
import SkeletonElement from '../Skeletons/SkeletonElement'
//CSS
import './Section4.css'

const Section4 = ({ id, heading, productData, link, classes }) => {
  return (
    <div className='section4_container' id={id}>
      <div className="section4_header">
        <h3 className="section4_heading">{heading}</h3>
        <a href={link.link} className="section4_link">{link.text}</a>
      </div>
      <div className="section4_card_container">
        {(productData.no_of_products > 0) && productData.products.map((item, index) => (
          (index < 4) ? (
            <ProductBox
              key={index}
              card_heading={'Upto'}
              classes={classes}
              product={item}
            />) : ('')
        ))
        }
        {
          (productData.no_of_products === 0) && [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
        }
      </div>
      <a href={link.link} className="section4_link mob_link logo_mob">{link.text}</a>
    </div>
  )
}

export default Section4
