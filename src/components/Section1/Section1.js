import React from 'react'
import { Carousel } from 'react-bootstrap'
import SkeletonElement from '../Skeletons/SkeletonElement'
// import { Carousel } from 'react-responsive-carousel';

//CSS
import './Section1.css'

{/* <Carousel.Item key={index}>
  <img
    className="d-block w-100 carousel_image"
    src={item.carousel_image}
    alt={`${index}`}
  />
  {/* <Carousel.Caption>
                <div className='img_caption'>
                  <p className="img_caption_text">
                    {item.carousel_name}
                  </p>
                  <span className='img_caption_link'>
                    {item.carousel_link}
                  </span>
                </div>
              </Carousel.Caption> 
</Carousel.Item> */}

{/* <div key={index}>
  <img src={item.carousel_image} alt="" />
</div> */}

const Section1 = ({ id, carouselData, productData }) => {
  return (
    <div className='section1_contianer' id={id}>
      <Carousel
        interval={5000}
      // infiniteLoop
      // showThumbs={false}
      // showStatus={false}
      >
        {(productData.no_of_products > 0) && carouselData.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel_image"
              src={item.carousel_image}
              alt={`${index}`}
            />
            {/* <Carousel.Caption>
                <div className='img_caption'>
                  <p className="img_caption_text">
                    {item.carousel_name}
                  </p>
                  <span className='img_caption_link'>
                    {item.carousel_link}
                  </span>
                </div>
  </Carousel.Caption> */}
          </Carousel.Item>
        ))
        }
        {
          (productData.no_of_products === 0) && (<SkeletonElement type={'productBanner'} />)
        }
      </Carousel>
    </div>
  )
}

export default Section1
