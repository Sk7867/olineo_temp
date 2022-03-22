import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import { UserDataContext } from '../../Contexts/UserContext'

//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'

//Components
import AddressBox from '../../components/AddressBox/AddressBox';
import { getAddress } from '../../api/Address';

const MyAddress = ({ setEditID, setProfileState, border }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const { userContext, setUserContext, userAddress, setUserAddress } = useContext(UserDataContext)

  useEffect(() => {
    getAddress()
      .then(res => {
        // console.log(res);
        if (res) {
          setUserAddress(res)
        }
      })
  }, [])

  // console.log(userContext.addressList);

  return (
    <>
      <div className="page_Wrapper edit_Page_Wrapper">
        {
          matches ? (
            <div className='add_New_Address section_Wrapper' onClick={() => setProfileState(10)}>
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </div>
          ) : (
            <Link to={'/newaddress'} className='add_New_Address section_Wrapper'>
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </Link>
          )
        }
        <div className='address_List'>
          {
            userAddress.address.map((address, index) => (
              <AddressBox
                key={index}
                address={address}
                setEditID={setEditID}
                setProfileState={setProfileState}
                border={border}
              />
            ))
          }
          {/* Add New Address */}
        </div>
        <div className="address_Footer tab_None">
          <button type='submit' className='submit-button'><p>Continue</p></button>
        </div>
      </div>
    </>
  )
};

export default MyAddress;
