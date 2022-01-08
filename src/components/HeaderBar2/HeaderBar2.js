import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//CSS
import './HeaderBar2.css'

//Components
import ModalComp from '../ModalComponenr/Modal'

//Images
import hamburger from '../../assets/vector/hamburger_icon.svg'
import logo_mob from '../../assets/vector/navbar_logo_mob.svg'
import logo_desk from '../../assets/vector/navbar_logo_desk.svg'
import logo_tab from '../../assets/vector/navbar_logo_tab.svg'
import storeWhite from '../../assets/vector/store_outline_white.svg'
import cartWhite from '../../assets/vector/cart_outline_white.svg'
import locationWhite from '../../assets/vector/location_white.svg'
import accountCircle from '../../assets/vector/account_circle_outline.svg'
import userDp from '../../assets/png/user_dp.png'
import layoutDotted from '../../assets/vector/layout_yellow_dotted.svg'
import mobileGreenDotted from '../../assets/vector/mobile_green_dotted.svg'
import mobilePinkDotted from '../../assets/vector/mobile_pink_dotted.svg'
import mobileBlueDotted from '../../assets/vector/mobile_blue_dotted.svg'
// import Sidebar from '../Sidebar/Sidebar'


const HeaderBar2 = ({ setSidebar, userLoggedIn }) => {
  const [modalShow, setModalShow] = useState(false)
  const [useDP, setUseDP] = useState(true)

  const handleModalShow = () => {
    setModalShow(true)
  }

  const categoriesList = [
    {
      categoryImage: layoutDotted,
      categoryName: 'All Categories',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
  ]

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

            <div className='storeIcon'>
              <p>Find Store</p>
              <img src={storeWhite} alt="" />
            </div>
            <div className='cartIcon'>
              <img src={cartWhite} alt="" />
              <p>Cart</p>
            </div>
            {
              userLoggedIn ? (
                <div className="user_profile">
                  <p>My Profile</p>
                  {
                    useDP ? (
                      <img src={userDp} alt="" />
                    ) : (
                      <img src={accountCircle} alt="" />
                    )
                  }
                </div>
              ) : (
                <>
                  <p className='right_login'>
                    <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
                  </p>
                  <p className='right_login login_tab_only'>
                    <Link to={'/login'}>Login</Link>
                  </p>
                </>
              )
            }
          </div>
        </div>
        <div className="searchbarWrapper">
          <input type="text" placeholder='Search...' className='searchbar' />
        </div>
        <div className='locationbarWrapper logo_mob' onClick={() => handleModalShow()}>
          <img src={locationWhite} alt="" />
          <p>Select location to see product availability</p>
        </div>
        <div className="categories_Container">
          <div className="categories_Wrapper">
            {
              categoriesList.map((item, index) => (
                <div className="category" key={index}>
                  <img src={item.categoryImage} alt="" />
                  <p>{item.categoryName}</p>
                </div>
              ))
            }
          </div>
        </div>
      </header>
      {/* <Sidebar sidebar={sidebar} setSidebar={setSidebar} /> */}
      <ModalComp modalShow={modalShow} setModalShow={setModalShow} />
    </>
  )
}

export default HeaderBar2
