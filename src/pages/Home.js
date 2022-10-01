import React, { useState, useEffect, useContext } from 'react'
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
import Section5 from '../components/Section5/Section5'
import { UserDataContext } from '../Contexts/UserContext'


const Home = ({ setHeaderData }) => {
  const [demoElement, setDemoElement] = useState({
    product_id: '',
    product_image: '',
    product_name: '',
    product_price: '',
  })
  const [modalShow, setModalShow] = useState(false)
  const { allProducts } = useContext(UserDataContext);
  // const [sec2Data, setSec2Data] = useState([])

  useEffect(() => {
    setHeaderData({
      header3Cond: false,
      categoriesCond: true
    })
  }, []);
  //Test comment to include file in commit - 01/10/2022

  const getRandomProductArr = (arr, num) => {
    const shuffledArr = [...arr].sort(() => 0.5 - Math.random())
    return shuffledArr.slice(0, num)
  }

  var sec2ProdArray1 = getRandomProductArr(allProducts.products, 10)
  var sec4ProdArray1 = getRandomProductArr(allProducts.products, 10)
  var sec2ProdArray2 = getRandomProductArr(allProducts.products, 10)
  var sec4ProdArray2 = getRandomProductArr(allProducts.products, 10)

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
          type={'np1'}
          productArray={sec2ProdArray1}
          classes={{
            boxClass: 'bg_pink carousel_card',
          }}
        />
        <Section5 />
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
          productArray={sec4ProdArray1}
          type={'cd1'}
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
          productArray={sec2ProdArray2}
          type={'np2'}
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
          type={'cd2'}
          heading={'Deals of the day'}
          productArray={sec4ProdArray2}
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
