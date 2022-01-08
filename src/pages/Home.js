import React from 'react'
import Section2 from '../components/Section2/Section2'
import Sidebar from '../components/Sidebar/Sidebar'
import Section3 from '../components/Section3/Section3'
import Section4 from '../components/Section4/Section4'
import Section1 from '../components/Section1/Section1'

//Images 
import product1 from '../assets/png/product_1.png'
import product2 from '../assets/png/product_2.png'
import bannerImage from '../assets/png/hero_banner.png'

const Home = ({ sidebar, setSidebar }) => {

  const sec1Data = [
    {
      carousel_image: bannerImage,
    },
    {
      carousel_image: bannerImage,
    },
    {
      carousel_image: bannerImage,
    },
    {
      carousel_image: bannerImage,
    },
    {
      carousel_image: bannerImage,
    },
  ]

  const sec2Data = [
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_blue carousel_card',
      }
    },
  ]

  const sec4Data = [
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '40% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
  ]

  const sec5Data = [
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: product2,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
  ]

  const sec7Data = [
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
    {
      product_image: product1,
      product_name: 'Item name',
      product_price: '50% OFF',
      classes: {
        boxClass: 'grid_card'
      }
    },
  ]

  return (
    <>
      <div className='homepage_wrapper'>
        <Section1
          id={'homepage_hero'}
          carouselData={sec1Data}
        />
        <Section2
          id={'section2'}
          heading='Normal products'
          productData={sec2Data}
        />
        <Section3
          id={'section3'}
          heading={'Pre-order product'}
          cardButton={true}
        />
        <Section4
          id={'section4'}
          heading={'Upto 40% off'}
          productData={sec4Data}
          link={{
            text: 'See more',
            link: '/'
          }}
        />
        <Section2
          id={'section5'}
          heading='Items for you'
          productData={sec5Data}
        />
        <Section3
          id={'section6'}
          heading={'Out-of-stock product'}
          cardButton={false}
        />
        <Section4
          id={'section7'}
          heading={'Deals of the day'}
          productData={sec7Data}
          link={{
            text: 'See more',
            link: '/'
          }}
        />
      </div>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  )
}

export default Home
