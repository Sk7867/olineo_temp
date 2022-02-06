import React, { useEffect } from 'react';
//CSS
import './Profile.css'

//Images
import userImage from '../../assets/png/userImage.png'
import cameraIcon from '../../assets/vector/camera_icon.svg'
import accountCircleBlue from '../../assets/vector/account_circle_blue.svg'
import truckIconBlue from '../../assets/vector/truck_outline_blue.svg'
import bookmarkIconBlue from '../../assets/vector/bookmark_outline_blue.svg'
import cartIconBlue from '../../assets/vector/cart_outline_blue.svg'
import locationIconBlue from '../../assets/vector/location_blue.svg'
import walletIconBlue from '../../assets/vector/wallet_outline_blue.svg'
import logoutIconRed from '../../assets/vector/logout_icon_red.svg'
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'

//Compoents


const Profile = ({ setHeaderText, setHeader3Cond }) => {

  useEffect(() => {
    setHeaderText('Profile')
    setHeader3Cond(true)
  }, []);

  const userProfile = {
    userImage: userImage,
    userName: 'Rohan khamkar',
    userPhone: '+91-3987760925',
    userMail: 'rohankhamkar@gmail.com'
  }

  const profileOptions = [
    {
      image: accountCircleBlue,
      title: 'My Account Details',
      link: '/',
    },
    {
      image: truckIconBlue,
      title: 'My Orders',
      link: '/',
    },
    {
      image: bookmarkIconBlue,
      title: 'My Wishlist',
      link: '/',
    },
    {
      image: cartIconBlue,
      title: 'My Cart',
      link: '/',
    },
    {
      image: locationIconBlue,
      title: 'My Address',
      link: '/',
    },
    {
      image: walletIconBlue,
      title: 'My Wallet',
      link: '/',
    },
    {
      image: logoutIconRed,
      title: 'Logout',
      link: '/',
    },
  ]

  return (
    <>

      <div className='page_Wrapper profile_Page_Wrapper'>
        <aside className="side_Section section_Wrapper">
          <div className='profile_User_Details'>
            <div className='user_Profile_Pic'>
              <img src={userProfile.userImage} alt="" />
              <div className='user_Camera_Icon'>
                <img src={cameraIcon} alt="" />
              </div>
            </div>
            <p className="user_Name">
              {userProfile.userName}
            </p>
            <p className="user_Phone">
              {userProfile.userPhone}
            </p>
            <p className="user_Mail">
              {userProfile.userMail}
            </p>
          </div>
        </aside>
        <div className='profile_User_Details'>
          <div className='user_Profile_Pic'>
            <img src={userProfile.userImage} alt="" />
            <div className='user_Camera_Icon'>
              <img src={cameraIcon} alt="" />
            </div>
          </div>
          <p className="user_Name">
            {userProfile.userName}
          </p>
          <p className="user_Phone">
            {userProfile.userPhone}
          </p>
          <p className="user_Mail">
            {userProfile.userMail}
          </p>
        </div>
        <div className='profile_Options'>
          {
            profileOptions.map((option, index) => (
              <div className={`profile_Option ${option.title === 'Logout' ? 'logout_Styles' : ''}`} key={index}>
                <div>
                  <img src={option.image} alt="" />
                  <p>{option.title}</p>
                </div>
                <img src={arrowRightBlue} alt="" className='profile_arrow' />
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
};

export default Profile;
