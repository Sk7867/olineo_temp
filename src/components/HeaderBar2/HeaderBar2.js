import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//CSS
import './HeaderBar2.css'

//Components

//Images
import hamburger from '../../assets/vector/hamburger_icon.svg'
import logo_mob from '../../assets/vector/navbar_logo_mob.svg'
import logo_desk from '../../assets/vector/navbar_logo_desk.svg'
import logo_tab from '../../assets/vector/navbar_logo_tab.svg'
import storeWhite from '../../assets/vector/store_outline_white.svg'
import cartWhite from '../../assets/vector/cart_outline_white.svg'
import locationWhite from '../../assets/vector/location_white.svg'
import ModalComp from '../ModalComponenr/Modal'
// import Sidebar from '../Sidebar/Sidebar'


const HeaderBar2 = ({ setSidebar }) => {
  const [modalShow, setModalShow] = useState(false)

  const handleModalShow = () => {
    setModalShow(true)
  }

  return (
    <>
      <header className='headerbarContainer'>
        <div className="headerbarWrapper">
          <div className="headerbarLeft">
            <div className="hamburger" onClick={() => setSidebar(true)}>
              <img src={hamburger} alt="" />
            </div>
            <a href='/' className="navLogo">
              <img src={logo_mob} alt="" className='logo_mob' />
              <img src={logo_desk} alt="" className='logo_desk' />
              <img src={logo_tab} alt="" className='logo_tab' />
            </a>
            <div className="left_location" onClick={() => handleModalShow()}>
              <img src={locationWhite} alt="" />
              <p>Select location</p>
            </div>
          </div>
          <div className="headerbarCenter">
            <input type="text" placeholder='Search...' className='searchbar' />
          </div>
          <div className="headerbarRight">
            <p className='right_login'>
              <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
            </p>
            <div className='storeIcon'>
              <p>Find Store</p>
              <img src={storeWhite} alt="" />
            </div>
            <div className='cartIcon'>
              <img src={cartWhite} alt="" />
              <p>Cart</p>
            </div>
          </div>
        </div>
        <div className="searchbarWrapper">
          <input type="text" placeholder='Search...' className='searchbar' />
        </div>
        <div className='locationbarWrapper logo_mob' onClick={() => handleModalShow()}>
          <img src={locationWhite} alt="" />
          <p>Select location to see product availability</p>
        </div>
      </header>
      {/* <Sidebar sidebar={sidebar} setSidebar={setSidebar} /> */}
      <ModalComp modalShow={modalShow} setModalShow={setModalShow} />
    </>
  )
}

export default HeaderBar2
