import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './ProductPage.css'
import defaultImage from '../../assets/png/product_2.png'

const ProductPage = () => {
  // console.log(props);
  const productData = {
    product_name: 'JBL C50HI Wired Headset  (Black, In the Ear)',
    product_image: defaultImage,
    product_price: '1,499',
    product_Original_Price: '1,499',

  }

  return (
    <div>ProductPage</div>
  )
}

export default ProductPage