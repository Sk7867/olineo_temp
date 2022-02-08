import { useEffect } from 'react'
//CSS
import './Address.css'

//Components
import MyAddress from './MyAddress'

//Images


const Address = ({ setHeaderText, setHeader3Cond, userDetails, setEditID }) => {
  useEffect(() => {
    setHeaderText('My Address')
    setHeader3Cond(true)
  }, []);

  return (
    <>
      <MyAddress addressList={userDetails.delivery_Address} setEditID={setEditID} />
    </>
  )
}

export default Address
