import React from 'react'
import { Link } from 'react-router-dom'
import './AlternateProductBox.css'

const AlternateProductBox = ({ product, imageAndData, dataOnly }) => {
  return (

    <Link to={`/product/${product.slug}`} state={{ product: product }}>
      <label id={`product-container-${product._id}`} htmlFor={`product-check-${product._id}`} className={`checkbox-label ${product.qty > 0 ? '' : 'product_Unavailable'}`} style={{ padding: "0" }}>
        <input type="radio" name="product-box" id={`product-check-${product._id}`} />
        <span className="custom-checkmark" style={{ display: "none" }}></span>
        <div className={`product_Box_Container d-flex flex-column position-relative ${dataOnly ? 'mw-100 min-height-0' : ''} `} id={`product-box-${product._id}`}>
          <div className={`product_Box_Top_Section ${dataOnly ? 'heading_Spacing' : ''} `} id={`product_Image_${product.id}`}>
            {
              product && product.images && (<img src={product.images[0]} alt="" />)
            }
            {
              product && product.dynamicHeader && (<p className='product_Box_Heading'>{product.dynamicHeader}</p>)
            }
          </div>
          <div className="product_Box_Details">
            <p className="product_Name">
              {product.color}
            </p>
            <p className="product_Price">
              ₹{product.price.discountPrice ? product.price.discountPrice : product.price.mop}
            </p>
          </div>
        </div>
        <style jsx="true">
          {`
                  #product-check-${product._id}:checked ~ #product-box-${product._id} {
                    border: 1px solid #FFCC28
                  }
                  #product-check-${product._id}:checked ~ #product-box-${product._id} #product_Image_${product._id} {
                    background: #FFF0BF;
                  }
                `}
        </style>
      </label>
    </Link>
  )
}

export default AlternateProductBox