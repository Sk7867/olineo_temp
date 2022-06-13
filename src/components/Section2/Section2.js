import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
import SkeletonElement from '../Skeletons/SkeletonElement'
//CSS
import './Section2.css'

const Section2 = ({ id, heading, productData, classes }) => {

  return (
    <div className={'section2_container section_Wrapper ' + (classes ? classes.containerClass : '')} id={id}>
      <h3 className="section2_heading">{heading}</h3>
      {/* <SkeletonElement type={'productBannerSmall'} /> */}
      <div className="section2_card_container">
        <div className="section2_card_wrapper">
          {(productData.no_of_products > 0) && productData.products.map((item, index) => (
            (index < 9) ? (
              <ProductBox
                key={index}
                card_heading={'STARTING AT'}
                classes={classes}
                product={item}
              />
            ) : ('')
          ))
          }
          {
            (productData.no_of_products === 0) && [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
          }
          <div className="scroll_Buffer"></div>
        </div>
      </div>
    </div>
  )
}

export default Section2
