import React, { useState, useEffect, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'
import { updateMobileNumber, verifyOtp, verifyOtpLogin, verifyOtpSignup } from '../../api/Auth';
import { saveUser } from '../../api/Auth';
import { Slide, toast, ToastContainer } from 'react-toastify'
import { UserDataContext } from '../../Contexts/UserContext'

toast.configure()
const Update = ({ number, oldInfo, newInfo, user_Full_Name, handleClose }) => {
  const [disabled, setDisabled] = useState(true);
  const [oldOTP, setOldOTP] = useState('');
  const [newOTP, setNewOTP] = useState('');
  const [password, setPassword] = useState('');
  const matches = useMediaQuery("(min-width:768px)")
  const [oldNumberVerify, setOldNumberVerify] = useState(false)
  const [newNumberVerify, setNewNumberVerify] = useState(true)
  const [userData, setUserData] = useState({
    user_Full_Name: '',
    user_ph_Number: '',
  })
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart } = useContext(UserDataContext)

  const validateForm = () => {
    (oldOTP !== '') && (newOTP !== '') ? setDisabled(false) : setDisabled(true)
  }


  useEffect(() => {
  }, [])

  useEffect(() => {
    if (oldNumberVerify === newNumberVerify) {
      setUserContext(prev => ({
        ...prev,
        mobileNumber: newInfo,
        fullName: user_Full_Name
      }))
    }
  }, [])

  const handleSubmit = () => {
    verifyOtpLogin(oldOTP)
      .then(res => {
        if (res) {
          setOldNumberVerify(true)
        }
      })
      .catch(err => console.log(err))

    verifyOtpSignup(newOTP)
      .then(res => {
        if (res) {
          setNewNumberVerify(true)
        }
      })
      .catch(err => console.log(err))
  }
  console.log(oldNumberVerify, newNumberVerify);




  // console.log(number);
  return (
    <>
      <div className='page_Wrapper update_Page_Wrapper'>
        <div className="update_Container">
          <form className="update_Wrapper" onChange={validateForm}>
            <div className='update_New_Info'>
              <p className='update_Info_Details'>Enter OTP sent to {oldInfo} </p>
              <div className='edit_input_container'>
                <label className='edit_input_label'>Enter OTP</label>
                <input type="text" placeholder='Enter OTP' name='old OTP' autoComplete='off' autoCorrect='off' value={oldOTP} onChange={(e) => setOldOTP(e.target.value)} />
                <span className='edit_input_update'>Resend</span>
              </div>
              <p className="otp_Alternate">Send OTP using {number ? ('Email') : ('Phone')}</p>
            </div>
            <div className='update_Old_Info'>
              <p className='update_Info_Details'>Enter OTP sent to {newInfo} </p>
              <div className='edit_input_container'>
                <label className='edit_input_label'>Enter OTP</label>
                <input type="text" placeholder='Enter OTP' name='new OTP' autoComplete='off' autoCorrect='off' value={newOTP} onChange={(e) => setNewOTP(e.target.value)} />
                <span className='edit_input_update'>Resend</span>
              </div>
            </div>
          </form>
        </div>
        <div className="address_Footer update_Footer">
          <button type='submit' className='submit-button' onClick={() => { handleSubmit(); handleClose() }} disabled={disabled}>{matches ? (<p>Update</p>) : (<p>SAVE DETAILS</p>)}</button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  )
};

export default Update;
