import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'

//Images
import userImage from '../../assets/png/userImage.png'
import cameraIcon from '../../assets/vector/camera_icon.svg'
import lockIconBlue from '../../assets/vector/lock_outline_blue.svg'
import locationIconBlue from '../../assets/vector/location_blue.svg'
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'

//Component
import UpdateModal from '../../components/ModalComponenr/UpdateModal';

const EditDetails = ({ profilePic = true, userDetails, setModalDataMobile }) => {

  const [displayInfo, setDisplayInfo] = useState({
    user_Full_Name: '',
    user_ph_Number: '',
    user_Email: '',
    user_Birth_Date: '',
  });

  const [secondaryData, setSecondaryData] = useState({
    user_Full_Name: '',
    user_ph_Number: '',
    user_Email: '',
    user_Birth_Date: '',
  });

  const [disabled, setDisabled] = useState(true);
  const matches = useMediaQuery("(min-width:768px)")
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    number: null,
    oldData: '',
    newData: '',
  });

  useEffect(() => {
    if (userDetails) {
      setDisplayInfo({
        user_Full_Name: userDetails.user_Full_Name,
        user_ph_Number: userDetails.user_ph_Number,
        user_Email: userDetails.user_Email,
        user_Birth_Date: userDetails.user_Birth_Date,
      })
      setSecondaryData({
        user_Full_Name: userDetails.user_Full_Name,
        user_ph_Number: userDetails.user_ph_Number,
        user_Email: userDetails.user_Email,
        user_Birth_Date: userDetails.user_Birth_Date,
      })
    }
  }, [userDetails]);

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
      link: '/myaddress',
    },
    {
      image: lockIconBlue,
      title: 'Change Password',
      link: '/',
    },
  ]

  const validateForm = () => {
    (displayInfo.user_Full_Name !== '') && (displayInfo.user_ph_Number !== '') && (displayInfo.user_Email !== '') && (displayInfo.user_Birth_Date !== '') ? setDisabled(false) : setDisabled(true)
  }

  const handleModal = (prop) => {
    if (prop === 'email') {
      setModalData({
        number: false,
        oldData: secondaryData,
        newData: displayInfo
      })
    } else {
      setModalData({
        number: true,
        oldData: secondaryData,
        newData: displayInfo
      })
    }
    setShowModal(true)
  }

  const handleInput = (prop, e) => {
    e.target
      ? setDisplayInfo({ ...displayInfo, [prop]: e.target.value })
      : setDisplayInfo({ ...displayInfo, [prop]: e.label })
  }

  return (
    <>
      <div className='page_Wrapper edit_Page_Wrapper'>
        {
          profilePic && (
            <div className='profile_User_Details'>
              <div className='user_Profile_Pic'>
                <img src={userProfile.userImage} alt="" />
                <div className='user_Camera_Icon'>
                  <img src={cameraIcon} alt="" />
                </div>
              </div>
            </div>
          )
        }
        <form action="" className="profile_edit_form" onChange={validateForm}>
          <div className='edit_input_container'>
            <label className='edit_input_label'>Name</label>
            <input type="text" placeholder='Text' value={displayInfo.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} />
          </div>
          <div className='edit_input_container'>
            <label className='edit_input_label'>Phone number</label>
            <input type="text" placeholder='Text' value={displayInfo.user_ph_Number} onChange={(value) => handleInput("user_ph_Number", value)} />
            {
              matches ? (
                <div className='edit_input_update' onClick={() => handleModal('number')} >Update</div>
              ) : (
                <Link to={'/update-details/number'} className='edit_input_update' onClick={() => setModalDataMobile({
                  number: true,
                  oldData: secondaryData,
                  newData: displayInfo
                })}>Update</Link>
              )
            }
          </div>
          <div className='edit_input_container'>
            <label className='edit_input_label'>Email Id</label>
            <input type="text" placeholder='Text' value={displayInfo.user_Email} onChange={(value) => handleInput("user_Email", value)} />
            {
              matches ? (
                <div className='edit_input_update' onClick={() => handleModal('email')} >Update</div>
              ) : (
                <Link to={'/update-details/email'} className='edit_input_update' onClick={() => setModalDataMobile({
                  number: false,
                  oldData: secondaryData,
                  newData: displayInfo
                })}>Update</Link>
              )
            }
          </div>
          <div className='edit_input_container'>
            <label className='edit_input_label'>Birthday (dd/mm/yyyy)</label>
            <input type="text" placeholder='Text' value={displayInfo.user_Birth_Date} onChange={(value) => handleInput("user_Birth_Date", value)} />
          </div>
          {
            matches && (
              <div>
                <button type='submit' className='submit-button profile_Submit_Button' disabled={disabled}><p>SAVE DETAILS</p></button>
              </div>
            )
          }
        </form>
        <div className='profile_Options edit_Extra_Options'>
          {
            editPageOptions.map((option, index) => (
              <Link to={option.link} className={`profile_Option edit_Profile_Option ${option.title === 'Logout' ? 'logout_Styles' : ''}`} key={index}>
                <div>
                  <img src={option.image} alt="" />
                  <p>{option.title}</p>
                </div>
                <img src={arrowRightBlue} alt="" className='profile_arrow' />
              </Link>
            ))
          }
        </div>
        <div className="address_Footer tab_None">
          <button type='submit' className='submit-button' disabled={disabled}><p>SAVE DETAILS</p></button>
        </div>
      </div>
      {
        matches && (
          <UpdateModal showModal={showModal} setShowModal={setShowModal} modalData={modalData} />
        )
      }
    </>
  )
};

export default EditDetails;
