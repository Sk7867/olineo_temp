import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

//CSS
import './ProductPage.css'
//Images
import defaultImage from '../../assets/png/product_2.png'

//Components
import Section2 from '../../components/Section2/Section2'


const ProductPage = ({ setHeaderData }) => {
  const loc = useLocation()

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: '',
      categoriesCond: false,
    })
  }, []);

  const sec5Data = [
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
  ]

  const productData = {
    product_name: 'JBL C50HI Wired Headset  (Black, In the Ear)',
    product_image: defaultImage,
    product_price: '1,499',
    product_Original_Price: '1,499',

  }

  return (
    <div className='homepage_wrapper page_Margin_Top  page_Margin_Top_Secondary'>

      <Section2
        id={'Top-sellers-sec'}
        heading='Suggested products'
        productData={sec5Data}
      />
    </div>
  )
}

export default ProductPage