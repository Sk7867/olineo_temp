import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//CSS
import './Sidebar.css'

//Images
import walletIcon from '../../assets/vector/wallet_outline_blue.svg'
import layoutIcon from '../../assets/vector/layout_outline_blue.svg'
import globeIcon from '../../assets/vector/globe_outline_blue.svg'
import truckIcon from '../../assets/vector/truck_outline_blue.svg'
import cartBlueIcon from '../../assets/vector/cart_outline_blue.svg'
import userIcon from '../../assets/vector/user_group_blue.svg'
import callIcon from '../../assets/vector/call_blue.svg'
import supportIcon from '../../assets/vector/support_blue.svg'
import profileIconBlue from '../../assets/vector/account_circle_blue.svg'
import storeBlue from '../../assets/vector/store_outline_bue.svg'
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import arrowLeftBlack from '../../assets/vector/arrow_left_black.svg'
import cameraBlue from '../../assets/vector/camera_outline_blue.svg'

const Sidebar = ({ sidebar, setSidebar, userLoggedIn }) => {

  const [categoryMenu, setCategoryMenu] = useState(false)

  const sidebarNav = userLoggedIn ? [
    {
      image: profileIconBlue,
      text: 'My profile',
      link: '/profile',
    },
    {
      image: storeBlue,
      text: 'Store finder',
      link: '/store-finder',
    },
    {
      image: truckIcon,
      text: 'My orders',
      link: '/orders',
    },
    {
      image: cartBlueIcon,
      text: 'My cart',
      link: '/mycart',
    },
    {
      image: walletIcon,
      text: 'My wallet',
      link: '/orders',
    },
    {
      image: globeIcon,
      text: 'Choose language',
      link: '/orders',
    },
  ] : [
    {
      image: storeBlue,
      text: 'Store finder',
      link: '/store-finder',
    },
    {
      image: globeIcon,
      text: 'Choose language',
      link: '/orders',
    },
  ]

  const sideNavContact = [
    {
      image: userIcon,
      text: 'About Us',
      link: '/orders',
    },
    {
      image: callIcon,
      text: 'Contact Us',
      link: '/orders',
    },
    {
      image: supportIcon,
      text: 'Customer Support',
      link: '/customer-support',
    },
  ]

  const categoryData = [
    {
      image: cameraBlue,
      text: 'Category 1',
      link: '/',
    },
    {
      image: cameraBlue,
      text: 'Category 2',
      link: '/',
    },
    {
      image: cameraBlue,
      text: 'Category 3',
      link: '/',
    },
    {
      image: cameraBlue,
      text: 'Category 4',
      link: '/',
    },
  ]


  // console.log(categoryMenu);
  return (
    <>
      <div className={`sidebar_container ${sidebar ? '' : 'inactive'}`}>
        <div className="sidebar_header">
          <p className="sidebar_heading">
            Welcome!
          </p>
          {
            userLoggedIn ? ('') : (
              <p className="sidebar_login">
                <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
              </p>
            )
          }
        </div>
        <div className="side_Nav_Container">
          <div className={`side_Nav_Wrapper ${categoryMenu ? 'menu_Slide' : ''}`}>
            <div className='categories_toggle' onClick={() => setCategoryMenu(true)} >
              <div>
                <img src={layoutIcon} alt="" />
                <p>All categories</p>
              </div>
              <img src={arrowRightBlue} alt="" />
            </div>
            <div className="sidebar_nav">
              {
                sidebarNav.map((item, index) => (
                  <Link to={item.link} className="sidebar_navlink" key={index} onClick={() => setSidebar(false)}>
                    <img src={item.image} alt="" />
                    <p>{item.text}</p>
                  </Link>
                ))
              }
            </div>
            <div className="sidebar_contact">
              {
                sideNavContact.map((item, index) => (
                  <Link to={item.link} className="sidebar_contactlink" key={index} onClick={() => setSidebar(false)}>
                    <img src={item.image} alt="" />
                    <p>{item.text}</p>
                  </Link>
                ))
              }
            </div>
          </div>
          <div className={`category_Menu_Wrapper ${categoryMenu ? 'category_Menu_Visible' : ''}`}>
            <div className='categories_toggle' onClick={() => setCategoryMenu(false)} >
              <div>
                <img src={arrowLeftBlack} alt="" />
                <p>Main menu</p>
              </div>
            </div>
            <div className="category_Menu">
              {
                categoryData.map((item, index) => (
                  <Link to={item.link} className="sidebar_contactlink" key={index} onClick={() => { setSidebar(false); setCategoryMenu(false) }}>
                    <img src={item.image} alt="" />
                    <p>{item.text}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`sidebar_backdrop ${sidebar ? 'backdrop_active' : ''}`} onClick={() => { setSidebar(false); setCategoryMenu(false) }}></div>

    </>
  )
}

export default Sidebar
