import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { getUser, getUserPic, verifyOtp, verifyOtpLogin, verifyOtpSignup } from '../api/Auth'
import { UserDataContext } from '../Contexts/UserContext'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { getCartData } from '../api/Cart'

toast.configure()
const OtpValid = ({ loginRedirect }) => {
  const [otp, setOtp] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const [seconds, setSeconds] = useState(60)
  // const [resend, setResend] = useState(true)
  const nav = useNavigate()
  const { setUserContext, setUserCart } = useContext(UserDataContext)

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
    // let OTP = parseInt(otp)
    verifyOtpLogin(otp)
      .then(res => res ? (
        nav('/'),
        setUserContext(prev => ({
          ...prev,
          JWT: res.JWT
        })),
        getUser(res.JWT)
          .then(res => {
            if (res) {
              let user = res
              setUserContext(prev => ({
                ...prev,
                id: user._id,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                email: user.email,
                dob: user.dob
              }))
            }
          }),
        getUserPic(res.JWT)
          .then(res => {
            if (res) {
              setUserContext(prev => ({
                ...prev,
                profilePic: res
              }))
            }
          })
        // getCartData()
        //   .then(res => {
        //     if (res) {
        //       setUserCart(res)
        //     }
        //   })
      ) : toast.error('OTP Expired or invalid'))
  }

  const newUserSignUp = (e) => {
    e.preventDefault();
    // let OTP = parseInt(otp)
    verifyOtpSignup(otp)
      .then(res => res ? (
        nav('/adduser'),
        setUserContext(prev => ({
          ...prev,
          JWT: res
        }))
      ) : toast.error('OTP Expired or invalid'))
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
                <Link state={{ emailLogin: true }} to={'/login'} className='extra-btn'>Resend code via email</Link>
              ) : ('')
            }
          </div>
        </form>
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

export default OtpValid
