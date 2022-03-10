import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductBox.css'

const ProductBox = ({ product_img, card_heading, product_price, product_name, classes, product }) => {
  console.log(product);
  return (
    <Link to={`/product/1`} className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
      <>
        <img src={product_img} alt="" />
        <div className="productbox_details">
          <p className='box_heading'>{card_heading}</p>
          <p className="box_price">{product_price}</p>
          <p className="box_itemName">{product_name}</p>
        </div>
      </>
    </Link>
  )
}

export default ProductBox
