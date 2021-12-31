import React from 'react'
//CSS
import './ProductBox.css'

const ProductBox = ({ product_img, card_heading, product_price, product_name, classes }) => {
  console.log(classes);
  return (
    <div className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
      <img src={product_img} alt="" />
      <div className="productbox_details">
        <p className='box_heading'>{card_heading}</p>
        <p className="box_price">{product_price}</p>
        <p className="box_itemName">{product_name}</p>
      </div>
    </div>
  )
}

export default ProductBox
