import React from 'react'
import { Carousel } from 'react-bootstrap'
//CSS
import './Section1.css'

const Section1 = ({ id, carouselData }) => {
  return (
    <div className='section1_contianer' id={id}>
      <Carousel
        interval={100000}
      >
        {
          carouselData.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 carousel_image"
                src={item.carousel_image}
                alt={`${index}`}
              />
              <Carousel.Caption>
                <div className='img_caption'>
                  <p className="img_caption_text">
                    {item.carousel_name}
                  </p>
                  <span className='img_caption_link'>
                    {item.carousel_link}
                  </span>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  )
}

export default Section1
