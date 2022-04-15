import React from 'react'
import './AlternateProductBox.css'

const AlternateProductBox = ({ product, imageAndData, dataOnly }) => {
  return (
    <label id={`product-container-${product.id}`} htmlFor={`product-check-${product.id}`} className={`checkbox-label ${product.stock_Available ? '' : 'product_Unavailable'}`} style={{ padding: "0" }}>
      <input type="radio" name="product-box" id={`product-check-${product.id}`} />
      <span className="custom-checkmark" style={{ display: "none" }}></span>
      <div className={`product_Box_Container d-flex flex-column position-relative ${dataOnly ? 'mw-100 min-height-0' : ''} `} id={`product-box-${product.id}`}>
        <div className={`product_Box_Top_Section ${dataOnly ? 'heading_Spacing' : ''} `} id={`product_Image_${product.id}`}>
          {
            product && product.alternate_Image && (<img src={product.alternate_Image} alt="" />)
          }
          {
            product && product.alternate_Heading && (<p className='product_Box_Heading'>{product.alternate_Heading}</p>)
          }
        </div>
        <div className="product_Box_Details">
          <p className="product_Name">
            {product.alternate_Color}
          </p>
          <p className="product_Price">
            ₹{product.alternate_Price}
          </p>
        </div>
      </div>
      <style jsx="true">
        {`
                #product-check-${product.id}:checked ~ #product-box-${product.id} {
                  border: 1px solid #FFCC28
                }

                #product-check-${product.id}:checked ~ #product-box-${product.id} #product_Image_${product.id} {
                  background: #FFF0BF;
                }
              `}
      </style>
    </label>
  )
}

export default AlternateProductBox