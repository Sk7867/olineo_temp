import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddressForm from '../../components/AddressForm/AddressForm';

const EditAddress = ({ setHeaderData, editID, userDetails }) => {
  const loc = useLocation()
  const [editAddress, setEditAddress] = useState({});
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Edit Address',
      categoriesCond: false,
    })

    userDetails.delivery_Address.forEach((address) => {
      if (address.id === editID) {
        setEditAddress(address)
      }
    })
  }, []);


  return (
    <>
      <div className="page_Wrapper">
        <AddressForm editID={editID} address={editAddress} addressProp={loc.state} />
      </div>
    </>
  )
};

export default EditAddress;
