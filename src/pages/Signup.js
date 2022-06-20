import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { userSignUp } from '../api/Auth'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { UserDataContext } from '../Contexts/UserContext'

//CSS
// import './Signup.css'

toast.configure()
const Signup = ({ setLoginRedirect }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const matches = useMediaQuery("(min-width:768px)")
  const nav = useNavigate()
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart, userCart } = useContext(UserDataContext)


  const handleLength = (length) => {
    if ((name !== '') && (length === 10)) {
      setValidLength(true)
      return setBtnDisable(false)
    }
    setValidLength(false)
    setBtnDisable(true)
    // if (length === 9) {
    //   setValidLength(true)
    // } else {
    //   setValidLength(false)
    // }
  }

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value)
    }
  }
  // console.log(phone);

  // const validateForm = () => (
  //   (name !== '') && (name.length > 0) && (phone !== '') && (phone.length > 0) && validLength ? setBtnDisable(false) : setBtnDisable(true)
  // )

  const formSubmit = (e) => {
    e.preventDefault();
    userSignUp(phone, name)
      .then(res => res ? (
        alert(`${res.otp}`),
        setLoginRedirect(false),
        nav('/otp'),
        setUserContext(prev => ({
          ...prev,
          id: res.userId,
          fullName: name,
          mobileNumber: phone,
        }))
      ) : toast.error('Mobile Number Already Registered'))
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/login')
  }

  // console.log(name + "-" + phone);
  // console.log(btnDisable);

  return (
    <>
      <HeaderBar alternateWay={'Login'} alternateLink={'/login'} />
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Welcome to Olineo</h1>
          <p className={'page-desc'}>Create an account</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            <input type="text" name="Name" id="name" className='input-field' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />
            {
              matches ? (
                <input type='tel' onkeypress="return isNumberKey(event)" name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' maxLength={10} onChange={(e) => { validateNumber(e); handleLength(e.target.value.length); }} required />
              ) : (
                <input type='number' name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' maxLength={10} onChange={(e) => { setPhone(e.target.value); handleLength(e.target.value.length) }} required />
              )
            }
          </div>
          <div className={'button-Container'}>
            <button type='submit' className='submit-button' disabled={btnDisable}><p>Continue</p></button>
            <p className='extra-btn' onClick={pageSwitch}>Already a customer?</p>
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

export default Signup
