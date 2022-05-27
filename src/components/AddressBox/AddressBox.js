import { useEffect, useContext } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { deleteAddress, getAddress } from '../../api/Address'
import { UserDataContext } from '../../Contexts/UserContext'
//CSS
import './AddressBox.css'

//images
import editIcon from '../../assets/vector/edit_outline_blue.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import { Link } from 'react-router-dom'

const AddressBox = ({ address, setEditID, setProfileState, deleteOption = true, border, fullWidth = false }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const { userAddress, setUserAddress } = useContext(UserDataContext)
  // console.log(address);
  const handleDeleteAddress = (id) => {
    deleteAddress(id)
      .then(res => {
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
      })
  }


  // console.log(address);
  return (
    <div className={`address section_Wrapper ${!border ? ('border-0') : ('')} ${fullWidth ? 'w-100' : ''}  `}>
      <div className='address_Box'>
        <div className="address_Box_Wrapper">
          <p className="address_Box_Name">{address.customerName}</p>
          <p>{address.address_line1}, {address.city}, {address.state} - {address.zip}</p>
          <p>{address.phone}</p>
        </div>
        <div className="address_Box_Footer">
          {
            deleteOption && (
              <div className='address_Footer_Delete' onClick={() => handleDeleteAddress(address._id)}>
                <img src={deleteIcon} alt="" />
                <p>Delete address</p>
              </div>
            )
          }
          {
            matches ? (
              <Link to={'/profile'} state={address} className="address_Footer_Edit" onClick={() => { setEditID(address.id); setProfileState(11) }}>
                <img src={editIcon} alt="" />
                <p>Edit address</p>
              </Link>
            ) : (
              <Link to={'/editaddress'} state={address} className="address_Footer_Edit" onClick={() => setEditID(address.id)}>
                <img src={editIcon} alt="" />
                <p>Edit address</p>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AddressBox
