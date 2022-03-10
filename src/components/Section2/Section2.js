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
            ) : ('')
          ))
          }
          {
            (productData.no_of_products === 0) && [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
          }
        </div>
      </div>
    </div>
  )
}

export default Section2
