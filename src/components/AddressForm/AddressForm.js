import React, { useState, useEffect } from 'react';

//CSS
import './AddressForm.css'

const AddressForm = ({ addressProp }) => {
  const [addressData, setAddressData] = useState({
    user_Full_Name: '',
    user_ph_Number: '',
    user_Pincode: '',
    user_State: '',
    user_City: '',
    user_Address: '',
    user_Landmark: ''
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (addressProp) {
      setAddressData({
        user_Full_Name: addressProp.user_Full_Name,
        user_ph_Number: addressProp.user_ph_Number,
        user_Pincode: addressProp.user_Pincode,
        user_State: addressProp.user_State,
        user_City: addressProp.user_City,
        user_Address: addressProp.user_Address,
        user_Landmark: addressProp.user_Landmark,
      })
    }
  }, [addressProp]);

  // useEffect(() => {
  //   console.log(addressData);
  // }, [addressData]);

  // console.log(addressProp);

  const validateForm = () => {
    (addressData.user_Full_Name !== '') && (addressData.user_ph_Number !== '') &&
      (addressData.user_Pincode !== '') && (addressData.user_State !== '') &&
      (addressData.user_City !== '') && (addressData.user_Address !== '') ? setDisabled(false) : setDisabled(true)
  }

  const handleInput = (prop, e) => {
    e.target
      ? setAddressData({ ...addressData, [prop]: e.target.value })
      : setAddressData({ ...addressData, [prop]: e.label })
  }
  return (
    <>
      <form className="address_Form_Container" onChange={validateForm}>
        <p className="address_Form_Header">
          {addressProp === undefined ? ('Add a new address') : ('Edit Address')}
        </p>
        <input type="text" name='Full Name' placeholder='Full Name*' value={addressData.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} required />
        <input type="text" name='Mobile Number' placeholder='Mobile Number*' value={addressData.user_ph_Number} onChange={(value) => handleInput("user_ph_Number", value)} required />
        <input type="text" name='Pincode' placeholder='Pincode*' value={addressData.user_Pincode} onChange={(value) => handleInput("user_Pincode", value)} required />
        <div>
          <input type="text" name='State' placeholder='State*' value={addressData.user_State} onChange={(value) => handleInput("user_State", value)} required />
          <input type="text" name='City' placeholder='City*' value={addressData.user_City} onChange={(value) => handleInput("user_City", value)} required />
        </div>
        <input type="text" name='Address' placeholder='Address (Area/Street)*' value={addressData.user_Address} onChange={(value) => handleInput("user_Address", value)} required />
        <input type="text" name='Landmark' placeholder='Landmark (optional)' value={addressData.user_Landmark} onChange={(value) => handleInput("user_Landmark", value)} />
        <button type='submit' className='submit-button address_Form_Submit' disabled={disabled}><p>SAVE DETAILS</p></button>
        <div className="address_Footer tab_None">
          <button type='submit' className='submit-button' disabled={disabled}><p>SAVE DETAILS</p></button>
        </div>
      </form>
    </>
  )
};

export default AddressForm;
