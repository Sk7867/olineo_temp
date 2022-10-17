import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Section2 from '../components/Section2/Section2'
import Sidebar from '../components/Sidebar/Sidebar'
import Section3 from '../components/Section3/Section3'
import Section4 from '../components/Section4/Section4'
import Section1 from '../components/Section1/Section1'
import getMixedProducts from '../hooks/getMixedProducts'

//Images 
import product1 from '../assets/png/product_1.png'
import product2 from '../assets/png/product_2.png'
import bannerImage from '../assets/png/hero_banner.png'
import Section5 from '../components/Section5/Section5'
import { UserDataContext } from '../Contexts/UserContext'


const Home = ({ setHeaderData }) => {
  const { allProducts } = useContext(UserDataContext);
  const [sec2ProdArray1, setSec2ProdArray1] = useState()
  const [sec2ProdArray2, setSec2ProdArray2] = useState()
  const [sec4ProdArray1, setSec4ProdArray1] = useState()
  const [sec4ProdArray2, setSec4ProdArray2] = useState()

  useEffect(() => {
    setHeaderData({
      header3Cond: false,
      categoriesCond: true
    })
  }, []);

  useEffect(() => {
    setSec2ProdArray1(getMixedProducts(allProducts.products, allProducts.np1, 10))
    setSec2ProdArray2(getMixedProducts(allProducts.products, allProducts.np2, 10))
    setSec4ProdArray1(getMixedProducts(allProducts.products, allProducts.cd1, 10))
    setSec4ProdArray2(getMixedProducts(allProducts.products, allProducts.cd2, 10))
  }, [allProducts])

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
