import React from 'react'
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
import { Link } from 'react-router-dom'

const Sidebar = ({ sidebar, setSidebar }) => {

  const sidebarNav = [
    {
      image: walletIcon,
      text: 'My wallet'
    },
    {
      image: layoutIcon,
      text: 'All categories'
    },
    {
      image: globeIcon,
      text: 'Choose language'
    },
    {
      image: truckIcon,
      text: 'My orders'
    },
    {
      image: cartBlueIcon,
      text: 'My cart'
    },
  ]

  const sideNavContact = [
    {
      image: userIcon,
      text: 'About Us'
    },
    {
      image: callIcon,
      text: 'Contact Us'
    },
    {
      image: supportIcon,
      text: 'Customer Support'
    },
  ]
  return (
    <>
      <div className={`sidebar_container ${sidebar ? '' : 'inactive'}`}>
        <div className="sidebar_header">
          <p className="sidebar_heading">
            Welcome!
          </p>
          <p className="sidebar_login">
            <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
          </p>
        </div>
        <div className="sidebar_nav">
          {
            sidebarNav.map((item, index) => (
              <div className="sidebar_navlink" key={index} onClick={() => setSidebar(false)}>
                <img src={item.image} alt="" />
                <p>{item.text}</p>
              </div>
            ))
          }
        </div>
        <div className="sidebar_contact">
          {
            sideNavContact.map((item, index) => (
              <div className="sidebar_contactlink" key={index} onClick={() => setSidebar(false)}>
                <img src={item.image} alt="" />
                <p>{item.text}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className={`sidebar_backdrop ${sidebar ? 'backdrop_active' : ''}`} onClick={() => setSidebar(false)}></div>
    </>
  )
}

export default Sidebar
