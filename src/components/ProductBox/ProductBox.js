import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductBox.css'

const ProductBox = ({ card_heading, classes, product }) => {
  return (
    <>
      {
        product && product.images.length > 0 && (
          <Link to={`/product/${product.name}`} state={{ product: product }} className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
            <>
              {product.images.length > 0 && (
                <img src={product.images[0]} alt="" />
              )}
              <div className="productbox_details">
                <p className='box_heading'>{card_heading}</p>
                {product.price && (<p className="box_price">₹{product.price}</p>)}
                {product.name && (<p className="box_itemName">{product.name}</p>)}
              </div>
            </>
          </Link>
        )
      }
    </>
  )
}

export default ProductBox
