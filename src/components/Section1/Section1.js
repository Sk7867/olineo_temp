import React from 'react'
import { Carousel } from 'react-bootstrap'
//CSS
import './Section1.css'

const Section1 = ({ id, carouselData }) => {
  return (
    <div className='section1_contianer' id={id}>
      <Carousel>
        {
          carouselData.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.carousel_image}
                alt={`${index}`}
              />
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  )
}

export default Section1
