import React from 'react'
import { Link } from 'react-router-dom'
import ProductBox from '../ProductBox/ProductBox'
import SkeletonElement from '../Skeletons/SkeletonElement'
//CSS
import './Section4.css'

const Section4 = ({ id, heading, productData, link, classes }) => {
  return (
    <div className='section4_container' id={id}>
      <div className="section4_header">
        <h3 className="section4_heading">{heading}</h3>
        <Link to={link.link} className="section4_link">{link.text}</Link>
      </div>
      <div className="section4_card_container">
        {
          productData.loaded ? (
            productData.products.map((item, index) => (
              (index < 4) ? (
                <ProductBox
                  key={index}
                  card_heading={'Upto'}
                  classes={classes}
                  product={item}
                />
              ) : ('')
            ))
          ) : (
            [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
          )
        }
      </div>
      <a href={link.link} className="section4_link mob_link logo_mob">{link.text}</a>
    </div>
  )
}

export default Section4
