import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

//CSS
import './AboutContact.css'

//Images 
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import locationBlue from '../../assets/vector/location_blue.svg'

const AboutUs = ({ setHeaderData }) => {
  const nav = useNavigate()
  const matches = useMediaQuery("(min-width:768px)")

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'About Us',
      categoriesCond: false,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'About Us',
      url: ''
    },
  ]

  const handlePageSwitch = (e) => {
    e.preventDefault();
    nav('/store-finder')
  }

  const smallBoxData = [
    'Trust of your local O-Line-O store',
    '4 hour home delivery',
    'One stop for all home electronics need',
    'End-to-end installation and after-sales support for customers'
  ]

  return (
    <div className='page_Wrapper page_Margin_Top_Secondary'>
      <BreadCrumbs data={breadCrumbsData} />
      <div className="aboutus_Containr">
        <div className="aboutus_BigBox_Container">
          <div className="aboutus_BigBox"></div>
        </div>
        <div className="aboutus_Scroller">
          <p className="scroller_Heading">Your electronics consultant near you</p>
          <div className="aboutus_Scroller_Container">
            <div className="aboutus_Scroller_Wrapper">
              {smallBoxData.map((item, index) => (
                <div className="smallBox_Container" key={index}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`aboutus_Button_Container section_Wrapper ${matches ? 'support_Extra_Option' : ''}`} onClick={matches ? handlePageSwitch : null} >
          {
            matches ? (
              <>
                <div>
                  <img src={locationBlue} alt="" />
                  <p>Find a store near you</p>
                </div>
                <img src={arrowRightBlue} alt="" className='profile_arrow' />
              </>
            ) : (
              <button type='submit' className='submit-button' onClick={handlePageSwitch} ><p>Find a store near you</p></button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AboutUs