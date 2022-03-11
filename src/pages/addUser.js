import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { saveUser } from '../api/Auth'

const AddUser = ({ setUserLoggedIn }) => {
  const [userData, setUserData] = useState({
    user_Full_Name: '',
    user_Email: '',
    user_Birth_Date: '',
    user_Pin_Code: '',
  })

  const [btnDisable, setBtnDisable] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    let userDT = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : ''
    if (userDT) {
      setUserData({
        user_Full_Name: userDT.fullName,
      })
    }

  }, [])


  const handleInput = (prop, e) => {
    e.target
      ? setUserData({ ...userData, [prop]: e.target.value })
      : setUserData({ ...userData, [prop]: e.label })
  }
  // const [validLength, setValidLength] = useState(false)

  // const handleLength = (length) => {
  //   if (length === 9) {
  //     setValidLength(true)
  //   } else {
  //     setValidLength(false)
  //   }
  // }
  // console.log(name, email, DOB, pinCode, phone);

  const validateForm = () => (
    (userData.user_Full_Name !== '') && (userData.user_Email !== '') && (userData.user_Pin_Code !== '') ? setBtnDisable(false) : setBtnDisable(true)
  )

  const formSubmit = (e) => {
    e.preventDefault();
    saveUser(userData)
      .then(res => res ? nav('/') : alert("Incomplete Data"))
  }

  return (
    <>
      <HeaderBar />
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Complete your profile</h1>
          <p className={'page-desc'}>And you’re good to go</p>
        </div>
        <form action="" className={'signup-form'} onChange={validateForm} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            <input type="text" name="Name" id="name" className='input-field' placeholder='Name' value={userData.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} />
            <input type="email" name="Email" id="email" className='input-field' placeholder='Email' value={userData.user_Email} onChange={(value) => handleInput("user_Email", value)} />
            <input type="date" onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} name="Date-of-Birth" id="DOB" className='input-field' placeholder='Date of birth' value={userData.user_Birth_Date} onChange={(value) => handleInput("user_Birth_Date", value)} />
            <input type="text" name="Pincode" id="pincode" className='input-field' placeholder='Pin code' value={userData.user_Pin_Code} onChange={(value) => handleInput("user_Pin_Code", value)} />
          </div>
          <div className={'button-Container'}>
            <button className='submit-button' disabled={btnDisable}><p>Continue</p></button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUser
