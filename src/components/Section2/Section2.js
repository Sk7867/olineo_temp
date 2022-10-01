import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
import SkeletonElement from '../Skeletons/SkeletonElement'
//CSS
import './Section2.css'

const Section2 = ({ id, heading, productData, classes, type, productArray }) => {
  // console.log(productData);
  return (
    <div className={'section2_container section_Wrapper ' + (classes ? classes.containerClass : '')} id={id}>
      <h3 className="section2_heading">{heading}</h3>
      <div className="section2_card_container">
        <div className="section2_card_wrapper">
          {
            productData.loaded ? (
              // productData[type]?.map((item, index) => ( keep commented do not delete
              productArray?.map((item, index) => (
                <ProductBox
                  key={index}
                  card_heading={'STARTING AT'}
                  classes={classes}
                  product={item}
                />
              ))) : (
              [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
            )
          }
          <div className="scroll_Buffer"></div>
        </div>
      </div>
    </div>
  )
}

export default Section2
