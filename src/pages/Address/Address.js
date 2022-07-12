import { useState, useEffect, useContext } from 'react'
import { getAddress } from '../../api/Address'
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './Address.css'

//Components
import MyAddress from './MyAddress'

//Images


const Address = ({ setEditID, setHeaderData }) => {
  const [addressData, setAddressData] = useState([])
  const { userContext, setUserContext, userAddress, setUserAddress } = useContext(UserDataContext)
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Delivery option',
      categoriesCond: false,
    })
  }, []);

  useEffect(() => {
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
  }, [])

  return (
    <>
      <MyAddress setEditID={setEditID} />
    </>
  )
}

export default Address
