import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'

//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'

//Components
import AddressBox from '../../components/AddressBox/AddressBox';

const MyAddress = ({ addressList, setEditID, setProfileState, border }) => {
  const matches = useMediaQuery("(min-width:768px)")

  return (
    <>
      <div className="page_Wrapper edit_Page_Wrapper">
        {
          matches ? (
            <div className='add_New_Address' onClick={() => setProfileState(10)}>
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </div>
          ) : (
            <Link to={'/newaddress'} className='add_New_Address'>
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </Link>
          )
        }
        <div className='address_List'>
          {
            addressList.map((address, index) => (
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
