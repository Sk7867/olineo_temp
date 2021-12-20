import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//CSS
// import './Signup.css'


const Signup = ({ setUserLoggedIn }) => {
  const [name, setName] = useState('')
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
    (name !== '') && (phone !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )

  const formSubmit = (e) => {
    e.preventDefault();
    setUserLoggedIn(false)
    nav('/otp')
  }

  const pageSwitch = (e) => {
    e.preventDefault();
    nav('/login')
  }

  // console.log(name);

  return (
    <>
      {/* <HeaderBar /> */}
      <div className='pageWrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Welcome to Olineo</h1>
          <p className={'page-desc'}>Create an account</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit} onChange={validateForm}>
          <div className="inputfield-Container">
            <input type="text" name="Name" id="name" className='input-field' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />
            <input type='tel' name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' pattern="[0-9]{10}" onChange={(e) => { setPhone(e.target.value); handleLength(e.target.value.length) }} required />
          </div>
          <div className={'button-Container'}>
            <button type='submit' className='submit-button' disabled={btnDisable}><p>Continue</p></button>
            <p className='extra-btn' onClick={pageSwitch}>Already a customer?</p>
          </div>
        </form>
      </div>
      <div className='tc-Footer'>
        <p className='footer-Text'>By Signing In, I agree to <span>terms & conditions</span></p>
      </div>
    </>
  )
}

export default Signup
