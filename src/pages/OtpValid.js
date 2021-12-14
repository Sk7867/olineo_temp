import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OtpValid = () => {
  const [otp, setOtp] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const nav = useNavigate()

  const handleLength = (length) => {
    if (length === 5) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }

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
              <input type='text' name="Code" id="code" className='input-field' value={otp} placeholder='Confirmation code' onChange={(e) => { setOtp(e.target.value); handleLength(e.target.value.length) }} />
            </div>
          </div>
          <div className={'button-Container'}>
            <button className='submit-button' disabled={btnDisable}>Continue</button>
            <p className='extra-btn'>New to Olineo? Join here</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default OtpValid
