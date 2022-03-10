import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { userLogin } from '../api/Auth'

const Login = ({ setUserLoggedIn, setLoginRedirect }) => {
  const [phone, setPhone] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)

  const nav = useNavigate()

  const handleLength = (length) => {
    if (length === 9) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }


  const validateForm = () => (
    (phone !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )

  const formSubmit = (e) => {
    e.preventDefault();
    userLogin(phone)
      .then(res => res ? (setLoginRedirect(true), nav('/otp')) : alert("Check your number again"))
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/signup')
  }

  // console.log(validLength);

  return (
    <>
      <HeaderBar alternateWay={'Sign up'} alternateLink={'/signup'} />
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Welcome Back!</h1>
          <p className={'page-desc'}>Login here</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit} onChange={validateForm}>
          <div className="inputfield-Container">
            <input type='number' name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' onChange={(e) => { setPhone(e.target.value); handleLength(e.target.value.length) }} />
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
