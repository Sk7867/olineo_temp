import React, { useState, useEffect, useContext } from 'react';
import { deleteAddress, getAddress, saveAddress } from '../../api/Address';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './AddressForm.css'

const AddressForm = ({ addressProp, setProfileState, fromProfile }) => {
  const { userContext, setUserContext, userAddress, setUserAddress } = useContext(UserDataContext)
  const [address, setAddress] = useState({
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
      setAddress({
        user_Full_Name: addressProp.fullName,
        user_ph_Number: addressProp.mobileNumber,
        user_Pincode: addressProp.pincode,
        user_State: addressProp.state,
        user_City: addressProp.city,
        user_Address: addressProp.address,
        user_Landmark: addressProp.landMark,
      })
    }
  }, [addressProp]);
  // console.log(addressProp);

  // useEffect(() => {
  //   console.log(address);
  // }, [address]);

  // console.log(addressProp);

  const validateForm = () => {
    (address.user_Full_Name !== '') && (address.user_ph_Number !== '') &&
      (address.user_Pincode !== '') && (address.user_State !== '') &&
      (address.user_City !== '') && (address.user_Address !== '') ? setDisabled(false) : setDisabled(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressProp) {
      deleteAddress(addressProp._id)
        .then(res => {
          saveAddress(address)
            .then(res => {
              setProfileState(4)

              getAddress()
                .then(res => {
                  // console.log(res);
                  if (res) {
                    setUserAddress({
                      loaded: true,
                      no_of_address: res.no_of_address,
                      address: res.address
                    })
                  }
                })

              //get address call
              //set address props
            })
        })
    } else {
      saveAddress(address)
        .then(res => {
          setProfileState(4)
          getAddress()
            .then(res => {
              // console.log(res);
              if (res) {
                setUserAddress({
                  loaded: true,
                  no_of_address: res.no_of_address,
                  address: res.address
                })
              }
            })
          //get address call
          //set address props
        })
    }
  }

  //Handle Submit 2 Pending=======================================

  const handleInput = (prop, e) => {
    e.target
      ? setAddress({ ...address, [prop]: e.target.value })
      : setAddress({ ...address, [prop]: e.label })
  }
  return (
    <>
      <form className="address_Form_Container" onChange={validateForm} onSubmit={handleSubmit} >
        <p className="address_Form_Header">
          {addressProp === undefined ? ('Add a new address') : ('Edit Address')}
        </p>
        <input type="text" name='Full Name' placeholder='Full Name*' value={address.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} required />
        <input type="text" name='Mobile Number' placeholder='Mobile Number*' value={address.user_ph_Number} onChange={(value) => handleInput("user_ph_Number", value)} required />
        <input type="text" name='Pincode' placeholder='Pincode*' value={address.user_Pincode} onChange={(value) => handleInput("user_Pincode", value)} required />
        <div>
          <input type="text" name='State' placeholder='State*' value={address.user_State} onChange={(value) => handleInput("user_State", value)} required />
          <input type="text" name='City' placeholder='City*' value={address.user_City} onChange={(value) => handleInput("user_City", value)} required />
        </div>
        <input type="text" name='Address' placeholder='Address (Area/Street)*' value={address.user_Address} onChange={(value) => handleInput("user_Address", value)} required />
        <input type="text" name='Landmark' placeholder='Landmark (optional)' value={address.user_Landmark} onChange={(value) => handleInput("user_Landmark", value)} />
        <button type='submit' className='submit-button address_Form_Submit' disabled={disabled}><p>SAVE DETAILS</p></button>
        <div className="address_Footer tab_None">
          {
            fromProfile ? (
              <button type='submit' className='submit-button' disabled={disabled} onClick={() => setProfileState(5)} ><p>SAVE DETAILS</p></button>
            ) : (
              <Link to={'home-delivery'} className='submit-button'>
                <button type='submit' className='submit-button' disabled={disabled} ><p>SAVE DETAILS</p></button>
              </Link>
            )
          }
        </div>
      </form>
    </>
  )
};

export default AddressForm;
