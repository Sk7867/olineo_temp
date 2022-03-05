import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { verifyOtp } from '../api/Auth'

const OtpValid = ({ setUserLoggedIn, loginRedirect }) => {
  const [otp, setOtp] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const [seconds, setSeconds] = useState(60)
  // const [resend, setResend] = useState(true)
  const nav = useNavigate()

  const handleLength = (length) => {
    if (length === 5) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }

  useEffect(() => {
    let timer
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
      // setResend(false)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [seconds])

  const existingUserLogin = (e) => {
    e.preventDefault();
    let OTP = parseInt(otp)
    verifyOtp(OTP)
      .then(res => res ? (nav('/'), setUserLoggedIn(true)) : alert("Invalid OTP"))
  }

  const newUserSignUp = (e) => {
    e.preventDefault();
    let OTP = parseInt(otp)
    verifyOtp(OTP)
      .then(res => res ? nav('/adduser') : alert("Invalid OTP"))
  }

  const validateForm = () => (
    (otp !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )
  return (
    <>
      <HeaderBar />
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Confirmation code</h1>
          <p className={'page-desc'}>Please check you phone for 6-digit confimation code.</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={loginRedirect ? existingUserLogin : newUserSignUp} onChange={validateForm}>
          <div className="inputfield-Container">
            <div className="inputField">
              <input type='text' name="Code" id="code" className='input-field' value={otp} autoComplete='off' placeholder='Confirmation code' maxLength={6} onChange={(e) => { setOtp(e.target.value); handleLength(e.target.value.length) }} />
            </div>
            <p className={`resend-btn ${seconds === 0 ? '' : 'btn-disable'}`} type='resend'>{seconds === 0 ? 'Resend Code' : seconds}</p>
          </div>
          <div className={'button-Container'}>
            <button className='submit-button' type='submit' disabled={btnDisable}><p>Continue</p></button>
            {
              loginRedirect ? (
                <p className='extra-btn'>Resend code via email</p>
              ) : ('')
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default OtpValid
