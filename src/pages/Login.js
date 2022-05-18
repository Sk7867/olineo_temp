import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { userLogin, userLoginEmail } from '../api/Auth'
import useMediaQuery from '@mui/material/useMediaQuery'
import { UserDataContext } from '../Contexts/UserContext'
import { Slide, toast, ToastContainer } from 'react-toastify'

toast.configure()
const Login = ({ setUserLoggedIn, setLoginRedirect }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const matches = useMediaQuery("(min-width:768px)")
  const [emailLogin, setEmailLogin] = useState(false)
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart, userCart } = useContext(UserDataContext)
  const loc = useLocation()
  // console.log(loc);

  const nav = useNavigate()

  useEffect(() => {
    if (loc.state) {
      if (loc.state.emailLogin) {
        setEmailLogin(true)
      }
    }
  }, [loc.state])

  // console.log(emailLogin);


  const handleLength = (length) => {
    // if (length === 10) {
    //   console.log('valid lenght', length);
    //   setValidLength(true)
    //   setBtnDisable(false)
    // } else {
    //   console.log('invalid lenght', length);
    //   setValidLength(false)
    //   setBtnDisable(false)
    // }
    if (length === 10) {
      setValidLength(true)
      return setBtnDisable(false)
    }
    setValidLength(false)
    setBtnDisable(true)
  }


  const formSubmit = (e) => {
    e.preventDefault();
    if (emailLogin) {
      userLoginEmail(email)
        .then(res => res ? (
          setLoginRedirect(true),
          nav('/otp'),
          setUserContext(prev => ({
            ...prev,
            id: res.userId
          }))
        ) : toast.error('Email Not Registered'))
    } else {
      userLogin(phone)
        .then(res => res ? (
          setLoginRedirect(true),
          nav('/otp'),
          setUserContext(prev => ({
            ...prev,
            id: res.userId
          }))
        ) : toast.error('Mobile Number Not Registered'))
    }
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/signup')
  }

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value)
    }
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
        <form action="" className={'signup-form'} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            {
              emailLogin ? (
                <input type='email' name="Email" id="email" className='input-field' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
              ) : (
                matches ? (
                  <input type='tel' name="Phone" id="phone" maxLength={10} className='input-field' value={phone} placeholder='Phone' onChange={(e) => { validateNumber(e); handleLength(e.target.value.length) }} />
                ) : (
                  <input type='number' name="Phone" id="phone" maxLength={10} className='input-field' value={phone} placeholder='Phone' onChange={(e) => { setPhone(e.target.value); handleLength(e.target.value.length) }} />
                )
              )
            }
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
}

export default Login
