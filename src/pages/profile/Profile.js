import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'

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

//Components
import EditAccont from '../EditAccount/EditAccount';
import EditDetails from '../EditAccount/EditDetails';
import MyAddress from '../Address/MyAddress';
import AddressForm from '../../components/AddressForm/AddressForm';


const Profile = ({ setHeaderText, setHeader3Cond, setEditID, editID, userDetails }) => {
  const [profileState, setProfileState] = useState(1);
  const matches = useMediaQuery("(min-width:768px)")
  const [editAddress, setEditAddress] = useState({});
  const loc = useLocation()

  useEffect(() => {
    setHeaderText('Profile')
    setHeader3Cond(true)

    userDetails.delivery_Address.forEach((address) => {
      if (address.id === editID) {
        setEditAddress(address)
      }
    })
  }, []);

  const profileOptions = [
    {
      image: accountCircleBlue,
      title: 'My Account Details',
      link: '/edit-account',
    },
    {
      image: truckIconBlue,
      title: 'My Orders',
      link: '/orders',
    },
    {
      image: bookmarkIconBlue,
      title: 'My Wishlist',
      link: '/',
    },
    {
      image: cartIconBlue,
      title: 'My Cart',
      link: '/mycart',
    },
    {
      image: locationIconBlue,
      title: 'My Address',
      link: '/myaddress',
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

        {
          !matches && (
            <div>
              <div className='profile_User_Details'>
                <div className='user_Profile_Pic'>
                  <img src={userDetails.user_Profile_Pic} alt="" />
                  <div className='user_Camera_Icon'>
                    <img src={cameraIcon} alt="" />
                  </div>
                </div>
                <p className="user_Name">
                  {userDetails.user_Full_Name}
                </p>
                <p className="user_Phone">
                  {userDetails.user_ph_Number}
                </p>
                <p className="user_Mail">
                  {userDetails.user_Email}
                </p>
              </div>
              <div className='profile_Options'>
                {
                  profileOptions.map((option, index) => (
                    <Link to={option.link} className={`profile_Option ${option.title === 'Logout' ? 'logout_Styles' : ''}`} key={index}>
                      <div>
                        <img src={option.image} alt="" />
                        <p>{option.title}</p>
                      </div>
                      <img src={arrowRightBlue} alt="" className='profile_arrow' />
                    </Link>
                  ))
                }
              </div>
            </div>
          )
        }


        {
          matches && (
            <div className='desk_Page_Wrapper'>
              <aside className="side_Section profile_Side_Section section_Wrapper">
                <div className='profile_User_Details'>
                  <div className='user_Profile_Pic'>
                    <img src={userDetails.user_Profile_Pic} alt="" />
                    <div className='user_Camera_Icon'>
                      <img src={cameraIcon} alt="" />
                    </div>
                  </div>
                  <p className="user_Name">
                    {userDetails.user_Full_Name}
                  </p>
                  <p className="user_Phone">
                    {userDetails.user_ph_Number}
                  </p>
                  <p className="user_Mail">
                    {userDetails.user_Email}
                  </p>
                </div>

                <div className='profile_Options profile_Options_Desk'>
                  {
                    profileOptions.map((option, index) => (
                      <div className={`profile_Option ${option.title === 'Logout' ? 'logout_Styles' : ''}`} key={index} onClick={() => setProfileState(index + 1)}>
                        <div>
                          <img src={option.image} alt="" />
                          <p>{option.title}</p>
                        </div>
                        <img src={arrowRightBlue} alt="" className='profile_arrow' />
                      </div>
                    ))
                  }
                </div>
              </aside>
              <div className='order_Page_Right'>
                {
                  profileState === 1 ? (
                    <EditDetails profilePic={false} userDetails={userDetails} />
                  ) : (
                    profileState === 5 ? (
                      <MyAddress addressList={userDetails.delivery_Address} setEditID={setEditID} setProfileState={setProfileState} />
                    ) : (
                      profileState === 10 ? (
                        <AddressForm />
                      ) : (
                        profileState === 11 ? (
                          <AddressForm editID={editID} address={editAddress} addressProp={loc.state} />
                        ) : (
                          <EditDetails profilePic={false} />
                        )
                      )
                    )
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
};

export default Profile;
