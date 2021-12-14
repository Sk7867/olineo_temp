import { useState } from 'react'

const AddUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [DOB, setDOB] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [phone, setPhone] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)

  const handleLength = (length) => {
    if (length === 9) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }
  console.log(name, email, DOB, pinCode, phone);

  const validateForm = () => (
    (name !== '') && (email !== '') && (pinCode !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )
  return (
    <>
      <div className='pageWrapper'>
        <div className='signup-header'>
          <h1 className='page-heading'>Complete your profile</h1>
          <p className={'page-desc'}>And you’re good to go</p>
        </div>
        <form action="" className={'signup-form'} onChange={validateForm}>
          <div className="inputfield-Container">
            <input type="text" name="Name" id="name" className='input-field' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type="email" name="Email" id="email" className='input-field' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="date" onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} name="Date-of-Birth" id="DOB" className='input-field' placeholder='Date of birth' value={DOB} onChange={(e) => { setDOB(e.target.value) }} />
            <input type="text" name="Pincode" id="pincode" className='input-field' placeholder='Pin code' value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
            <input type='tel' name="Phone" id="phone" className='input-field' value={phone} placeholder='Phone' onChange={(e) => { setPhone(e.target.value); handleLength(e.target.value.length) }} />

          </div>
          <div className={'button-Container'}>
            <button className='submit-button' disabled={btnDisable}>Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUser
