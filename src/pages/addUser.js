import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { saveUser } from '../api/Auth'
// import DatePicker from "react-datepicker";
// import DatePicker from 'react-date-picker';
import DatePicker from 'react-date-picker';
import { Slide, toast, ToastContainer } from 'react-toastify'
import { UserDataContext } from '../Contexts/UserContext'

toast.configure()
const AddUser = () => {
  const [userData, setUserData] = useState({
    user_Full_Name: '',
    user_Email: '',
    user_Pin_Code: '',
  })
  const { userContext, setUserContext } = useContext(UserDataContext)

  const [selectedDay, setSelectedDay] = useState(null);

  // useEffect(() => {
  //   if (startDate !== null) {
  //     let dateSting = startDate.toISOString().substring(0, 10);
  //     let sepDate = dateSting.split('-')
  //     let joinDate = sepDate[1] + "-" + sepDate[2] + "-" + sepDate[0]
  //     let properDate = moment(joinDate, 'MM-DD-YYYY').add(1, 'day')
  //     let demo2date = moment(properDate).format('MM-DD-YYYY ')
  //     setBD(demo2date)
  //   }
  // }, [startDate])

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
  // console.log(selectedDay);

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

  // const validateForm = () => (
  //   (userData.user_Full_Name !== '') && (userData.user_Email !== '') && (userData.user_Pin_Code !== '') ? setBtnDisable(false) : setBtnDisable(true)
  // )

  useEffect(() => {
    if ((userData.user_Full_Name !== '') && (userData.user_Email !== '') && (userData.user_Pin_Code !== '')) {
      setBtnDisable(false)
    } else {
      setBtnDisable(true)
    }
  }, [userData])


  const formSubmit = (e) => {
    e.preventDefault();
    setUserContext(prev => ({
      ...prev,
      fullName: userData.user_Full_Name,
      email: userData.user_Email,
      dob: selectedDay,
      pincode: userData.user_Pin_Code
    }))
    saveUser(userData, selectedDay)
      .then(res => res ? (
        nav('/'),
        toast.success('Registration Successful')
      ) : toast.error('Incomplete Data'))
  }

  return (
    <>
      <HeaderBar />
      <div className='signup-wrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Complete your profile</h1>
          <p className={'page-desc'}>And you’re good to go</p>
        </div>
        <form action="" className={'signup-form'} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            <input type="text" name="Name" id="name" className='input-field' placeholder='Name' value={userData.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} />
            <input type="email" name="Email" id="email" className='input-field' placeholder='Email' value={userData.user_Email} onChange={(value) => handleInput("user_Email", value)} />
            <div>
              <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                format='dd/MM/y'
                className={'input-field custom-date-picker'}

              />
              {/* <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Date of Birth"
                inputClassName='input-field'

                shouldHighlightWeekends
              /> */}
            </div>
            {/* <input type="date" onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} name="Date-of-Birth" id="DOB" className='input-field' placeholder='Date of birth' value={userData.user_Birth_Date} onChange={(value) => handleInput("user_Birth_Date", value)} /> */}
            <input type="text" name="Pincode" id="pincode" maxLength={6} className='input-field' placeholder='Pin code' value={userData.user_Pin_Code} onChange={(value) => handleInput("user_Pin_Code", value)} />
          </div>
          <div className={'button-Container'}>
            <button className='submit-button' disabled={btnDisable}><p>Continue</p></button>
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

export default AddUser
