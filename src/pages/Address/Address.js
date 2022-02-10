import { useEffect } from 'react'
//CSS
import './Address.css'

//Components
import MyAddress from './MyAddress'

//Images


const Address = ({ userDetails, setEditID, setHeaderData }) => {
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Delivery option',
      categoriesCond: false,
    })
  }, []);

  return (
    <>
      <MyAddress addressList={userDetails.delivery_Address} setEditID={setEditID} />
    </>
  )
}

export default Address
