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
    var handlePrice
    if (product) {
      // if (product.price.discountPrice) {
      //   handlePrice = product.price.discountPrice
      // } else {
      //   handlePrice = product.price.mop
      // }
      setProductInfo({
        image: product.images[0],
        name: product.name
        // price: handlePrice
      })
    }


  }, [product])

  // console.log(product);
  return (
    <>
      {
        product && (
          <Link to={`/product/${product.slug}`} state={{ product: product }} className={'productbox_Container ' + (classes ? classes.boxClass : '')}>
            <>
              {product.images.length > 0 && (
                <img src={productInfo.image} alt="" />
              )}
              <div className="productbox_details">
                <p className='box_heading'>{card_heading}</p>
                {/* {product.price.mop && (<p className="box_price">₹{productInfo.price}</p>)} */}
                {product.name && (<p className="box_itemName">{productInfo.name}</p>)}
              </div>
            </>
          </Link>
        )
      }
    </>
  )
}

export default ProductBox
