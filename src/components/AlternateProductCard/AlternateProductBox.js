import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AlternateProductBox.css'

const AlternateProductBox = ({ product, imageAndData, dataOnly }) => {
  const [productData, setProductData] = useState({
    product_loaded: false
  })
  useEffect(() => {
    if (product) {
      setProductData(prev => ({
        ...prev,
        product_loaded: true,
        ...product
      }))
    }
  }, [product])
  console.log(productData);

  return (
    <Link to={`/product/${productData.slug}`} className='alternate_link' >
      <label id={`product-container-${productData._id}`} htmlFor={`product-check-${productData._id}`} className={`checkbox-label ${productData.qty > 0 ? '' : 'product_Unavailable'}`} style={{ padding: "0" }}>
        <input type="radio" name="product-box" id={`product-check-${productData._id}`} />
        <span className="custom-checkmark" style={{ display: "none" }}></span>
        <div className={`product_Box_Container d-flex flex-column position-relative ${dataOnly ? 'mw-100 min-height-0' : ''} `} id={`product-box-${productData._id}`}>
          <div className={`product_Box_Top_Section ${dataOnly ? 'heading_Spacing' : ''} `} id={`product_Image_${productData._id}`}>
            {
              dataOnly ? (
                productData && productData.product_loaded && productData.productInfo.specText && (<p className='product_Name'>{productData.productInfo.specText}</p>)
              ) : (
                <>
                  {productData && productData.product_loaded && productData.images && (<img src={productData.images[0]} alt="" />)}
                  {productData && productData.product_loaded && productData.dynamicHeader && (<p className='product_Box_Heading'>{productData.dynamicHeader}</p>)}
                </>
              )
            }
          </div>
          <div className="product_Box_Details">
            {
              productData && productData.product_loaded && productData.color && (
                <p className="product_Name">
                  {productData.color}
                </p>
              )
            }
            {
              productData.product_loaded && (
                <p className="product_Price">
                  ₹{productData.price.discountPrice ? productData.price.discountPrice : productData.price.mop}
                </p>
              )
            }
          </div>
        </div>
        <style jsx="true">
          {`
                  #product-check-${productData._id}:checked ~ #product-box-${productData._id} {
                    border: 1px solid #FFCC28
                  }
                  #product-check-${productData._id}:checked ~ #product-box-${productData._id} #product_Image_${productData._id} {
                    background: #FFF0BF;
                  }
                `}
        </style>
      </label>
    </Link>
  )
}

export default AlternateProductBox