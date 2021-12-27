import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUserLoggedIn }) => {
  const [phone, setPhone] = useState('')
  // const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const nav = useNavigate()

  // const handleLength = (length) => {
  //   if (length === 9) {
  //     setValidLength(true)
  //   } else {
  //     setValidLength(false)
  //   }
  // }

  const validateForm = () => (
    (phone !== '') ? setBtnDisable(false) : setBtnDisable(true)
  )

  const formSubmit = (e) => {
    e.preventDefault();
    setUserLoggedIn(true)
    nav('/otp')
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/')
  }

  // console.log(phone);

  return (
    <>
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Welcome Back!</h1>
          <p className={'page-desc'}>Login here</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit} onChange={validateForm}>
          <div className="inputfield-Container">
            <input type='number' name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' onChange={(e) => { setPhone(e.target.value); }} />
          </div>
          <div className={'button-Container'}>
            <button type='submit' className='submit-button' disabled={btnDisable}><p>Continue</p></button>
            <p className='extra-btn' onClick={pageSwitch}>New to Olineo? Join here</p>
          </div>
        </form>
        <div className='tc-Footer'>
          <p className='footer-Text'>By Signing In, I agree to <span>terms & conditions</span></p>
        </div>
      </div>
    </>
  )
}

export default Login
