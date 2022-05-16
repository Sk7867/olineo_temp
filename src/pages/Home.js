import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Section2 from '../components/Section2/Section2'
import Sidebar from '../components/Sidebar/Sidebar'
import Section3 from '../components/Section3/Section3'
import Section4 from '../components/Section4/Section4'
import Section1 from '../components/Section1/Section1'

//Images 
import product1 from '../assets/png/product_1.png'
import product2 from '../assets/png/product_2.png'
import bannerImage from '../assets/png/hero_banner.png'


const Home = ({ setHeaderData, allProducts }) => {
  const [demoElement, setDemoElement] = useState({
    product_id: '',
    product_image: '',
    product_name: '',
    product_price: '',
  })
  // const [sec2Data, setSec2Data] = useState([])

  useEffect(() => {
    setHeaderData({
      header3Cond: false,
      categoriesCond: true
    })
  }, []);
  // console.log(allProducts);

  // useEffect(() => {
  //   for (let index = 0; index < 9; index++) {
  //     let newElem = allProducts[index]
  //     setSec2Data(oldElem => [...oldElem, newElem])
  //   }
  // }, [allProducts])
  // console.log(sec2Data);

  // let sec2Data = []
  // for (let index = 0; index < 9; index++) {
  //   sec2Data.push(allProducts[index])
  // }

  // let gridCardProducts = []
  // for (let index = 0; index < 4; index++) {
  //   gridCardProducts.push(allProducts[index + 9])
  // }

  // let sec5Data = []
  // for (let index = 0; index < 9; index++) {
  //   sec5Data.push(allProducts[index + 13])
  // }

  // let gridCardProducts2 = []
  // for (let index = 0; index < 4; index++) {
  //   gridCardProducts2.push(allProducts[index + 20])
  // }

  const sec1Data = [
    {
      carousel_image: bannerImage,
      carousel_name: 'First Product',
      carousel_link: 'First Product Link',
    },
    {
      carousel_image: bannerImage,
      carousel_name: 'Second Product',
      carousel_link: 'Second Product Link',
    },
    {
      carousel_image: bannerImage,
      carousel_name: 'Third Product',
      carousel_link: 'Third Product Link',
    },
    {
      carousel_image: bannerImage,
      carousel_name: 'Fourth Product',
      carousel_link: 'Fourth Product Link',
    },
    {
      carousel_image: bannerImage,
      carousel_name: 'Fifth Product',
      carousel_link: 'Fifth Product Link',
    },
  ]

  // const sec2Data = [
  //   {
  //     product_id: 1,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 2,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',

  //   },
  //   {
  //     product_id: 3,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 4,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 5,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 6,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 7,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 8,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 9,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  // ]

  const sec4Data = [
    {
      product_id: 1,
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
    },
    {
      product_id: 2,
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
    },
    {
      product_id: 3,
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
    },
    {
      product_id: 4,
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
    },
  ]

  // const sec5Data = [
  //   {
  //     product_id: 1,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 2,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 3,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 4,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 5,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 6,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 7,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 8,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  //   {
  //     product_id: 9,
  //     product_image: product2,
  //     product_name: 'Item name',
  //     product_price: '₹1000',
  //   },
  // ]

  const sec7Data = [
    {
      product_id: 1,
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
    },
    {
      product_id: 2,
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
    },
    {
      product_id: 3,
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
    },
    {
      product_id: 4,
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
    },
  ]

  return (
    <>
      <div className='homepage_wrapper page_Margin_Top'>
        <Section1
          id={'homepage_hero'}
          carouselData={sec1Data}
          productData={allProducts}
        />
        <Section2
          id={'section2'}
          heading='Normal products'
          productData={allProducts}
          classes={{
            boxClass: 'bg_pink carousel_card',
          }}
        />
        <Section3
          id={'section3'}
          heading={'Pre-order product'}
          productData={allProducts}
          cardButton={true}
        />
        <Section4
          id={'section4'}
          heading={'Upto 40% off'}
          productData={allProducts}
          link={{
            text: 'See more',
            link: '/category1'
          }}
          classes={{
            boxClass: 'grid_card',
          }}
        />
        <Section2
          id={'section5'}
          heading='Items for you'
          productData={allProducts}
          classes={{
            boxClass: 'bg_blue carousel_card',
          }}
        />
        <Section3
          id={'section6'}
          heading={'Out-of-stock product'}
          cardButton={false}
          productData={allProducts}
        />
        <Section4
          id={'section7'}
          heading={'Deals of the day'}
          productData={allProducts}
          link={{
            text: 'See more',
            link: '/category1'
          }}
          classes={{
            boxClass: 'grid_card',
          }}
        />
      </div>

    </>
  )
}

export default Home
