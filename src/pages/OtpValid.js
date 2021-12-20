import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OtpValid = ({ userLoggedIn }) => {
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

  const formSubmit = (e) => {
    e.preventDefault();
    nav('/adduser')
  }

  const validateForm = () => (
    (otp !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )
  return (
    <>
      <div className='pageWrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Confirmation code</h1>
          <p className={'page-desc'}>Please check you phone for 6-digit confimation code.</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit} onChange={validateForm}>
          <div className="inputfield-Container">
            <div className="inputField">
              <input type='text' name="Code" id="code" className='input-field' value={otp} autoComplete='off' placeholder='Confirmation code' maxLength={6} onChange={(e) => { setOtp(e.target.value); handleLength(e.target.value.length) }} />
            </div>
            <p className={`resend-btn ${seconds === 0 ? '' : 'btn-disable'}`} type='resend'>{seconds === 0 ? 'Resend Code' : seconds}</p>
          </div>
          <div className={'button-Container'}>
            <button className='submit-button' type='submit' disabled={btnDisable}><p>Continue</p></button>
            {
              userLoggedIn ? (
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
