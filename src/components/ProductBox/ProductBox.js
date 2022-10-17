import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//CSS
import './ProductBox.css'

const ProductBox = ({ card_heading, classes, product }) => {
  const [productInfo, setProductInfo] = useState({
    image: '',
    name: '',
    price: ''
  })

  useEffect(() => {
    var handlePrice = (product?.price?.discountPrice ? product?.price?.discountPrice : product?.price?.mop)
    if (product) {
      // if (product.price.discountPrice) {
      //   handlePrice = product.price.discountPrice
      // } else {
      //   handlePrice = product.price.mop
      // }
      setProductInfo(prev => ({
        ...prev,
        image: ((product?.images?.length > 0) ? product?.images[0] : product?.images),
      }))
      setProductInfo(prev => ({
        ...prev,
        name: product?.name,
        price: handlePrice
      }))
    }


  }, [product])

  // console.log(product);
  return (
    <>
      {
        product && (
          <Link to={`/product/${product?.slug}`} className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
            <>
              {product?.images?.length > 0 && (
                <img src={productInfo.image} alt="" />
              )}
              <div className="productbox_details">
                <p className='box_heading'>{card_heading}</p>
                {productInfo?.price && (<p className="box_price">₹{productInfo?.price}</p>)}
                {productInfo?.name && (<p className="box_itemName">{productInfo?.name}</p>)}
              </div>
            </>
          </Link>
        )
      }
    </>
  )
}

export default ProductBox
