import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'

const Update = ({ number, oldInfo, newInfo }) => {
  const [disabled, setDisabled] = useState(true);
  const [oldOTP, setOldOTP] = useState('');
  const [newOTP, setNewOTP] = useState('');
  const [password, setPassword] = useState('');
  const matches = useMediaQuery("(min-width:768px)")

  const validateForm = () => {
    (oldOTP !== '') && (newOTP !== '') && (password !== '') ? setDisabled(false) : setDisabled(true)
  }

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
            <div className="update_Password">
              <div className='edit_input_container'>
                <label className='edit_input_label'>Password</label>
                <input type="password" placeholder='Password' name='Password' autoComplete='off' autoCorrect='off' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </div>
        <div className="address_Footer update_Footer">
          <button type='submit' className='submit-button' disabled={disabled}>{matches ? (<p>Update</p>) : (<p>SAVE DETAILS</p>)}</button>
        </div>
      </div>
    </>
  )
};

export default Update;
