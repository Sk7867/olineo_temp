import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductBox.css'

const ProductBox = ({ card_heading, classes, product }) => {
  // console.log(product);
  return (
    <>
      {
        product && product.imagePath && (
          <Link to={`/`} state={product} className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
            <>
              <img src={product.imagePath} alt="" />
              <div className="productbox_details">
                <p className='box_heading'>{card_heading}</p>
                <p className="box_price">₹{product.sellingPriceRange.min}</p>
                <p className="box_itemName">{product.name}</p>
              </div>
            </>
          </Link>
        )
      }
    </>
  )
}

export default ProductBox
