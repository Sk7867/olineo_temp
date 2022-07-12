import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getAddress } from '../../api/Address';
import AddressForm from '../../components/AddressForm/AddressForm';
import { UserDataContext } from '../../Contexts/UserContext'

const EditAddress = ({ setHeaderData, editID }) => {
  const loc = useLocation()
  const [editAddress, setEditAddress] = useState({});
  const [addressData, setAddressData] = useState([])
  const { userContext, setUserContext, userAddress, setUserAddress } = useContext(UserDataContext)
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Edit Address',
      categoriesCond: false,
    })

    userAddress.address.forEach((address) => {
      if (address.id === editID) {
        setEditAddress(address)
      }
    })
  }, []);

  useEffect(() => {
    getAddress()
      .then(res => {
        if (res) {
          setUserAddress({
            loaded: true,
            no_of_address: res.no_of_address,
            address: res.address
          })
        }
      })
  }, [])

  return (
    <>
      <div className="page_Wrapper">
        <AddressForm editID={editID} addressProp={loc.state} />
      </div>
    </>
  )
};

export default EditAddress;
