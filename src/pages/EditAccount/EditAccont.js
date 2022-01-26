import React, { useState } from 'react';

//CSS
import './EditAccount.css'

//Components
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2';


//Images
import userImage from '../../assets/png/userImage.png'
import cameraIcon from '../../assets/vector/camera_icon.svg'
import lockIconBlue from '../../assets/vector/lock_outline_blue.svg'
import locationIconBlue from '../../assets/vector/location_blue.svg'
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'

const EditAccont = () => {

  const [userDetails, setUserDetails] = useState({});
  const [fullName, setFullName] = useState('Rohan khamkar');
  const [phoneNumber, setPhoneNumber] = useState('+91-3987760925');
  const [emailId, setEmailId] = useState('rohankhamkar@gmail.com');
  const [birthDate, setBirthDate] = useState('22-06-1998');

  const userProfile = {
    userImage: userImage,
    userName: 'Rohan khamkar',
    userPhone: '+91-3987760925',
    userMail: 'rohankhamkar@gmail.com',
    Birthdate: '22-06-1998'
  }

  const editPageOptions = [
    {
      image: locationIconBlue,
      title: 'My Address',
      link: '/',
    },
    {
      image: lockIconBlue,
      title: 'Change Password',
      link: '/',
    },
  ]
  return <>
    <HeaderBar2 header3={true} headerText={'Edit My Account Details'} />
    <div className='page_Wrapper' style={{ padding: '0 0 7rem' }}>
      <div className='profile_User_Details'>
        <div className='user_Profile_Pic'>
          <img src={userProfile.userImage} alt="" />
          <div className='user_Camera_Icon'>
            <img src={cameraIcon} alt="" />
          </div>
        </div>
      </div>
      <form action="" className="profile_edit_form">
        <div className='edit_input_container'>
          <label className='edit_input_label'>Name</label>
          <input type="text" placeholder='Text' value={fullName} />
        </div>
        <div className='edit_input_container'>
          <label className='edit_input_label'>Phone number</label>
          <input type="text" placeholder='TExt' value={phoneNumber} />
          <span className='edit_input_update'>Update</span>
        </div>
        <div className='edit_input_container'>
          <label className='edit_input_label'>Email Id</label>
          <input type="text" placeholder='TExt' value={emailId} />
          <span className='edit_input_update'>Update</span>
        </div>
        <div className='edit_input_container'>
          <label className='edit_input_label'>Birthday (dd/mm/yyyy)</label>
          <input type="text" placeholder='TExt' value={birthDate} />
        </div>
      </form>
      <div className='profile_Options'>
        {
          editPageOptions.map((option, index) => (
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
      <div className="address_Footer">
        <button type='submit' className='submit-button'><p>SAVE DETAILS</p></button>
      </div>
    </div>
  </>;
};

export default EditAccont;
