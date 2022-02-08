import useMediaQuery from '@mui/material/useMediaQuery'
//CSS
import './AddressBox.css'

//images
import editIcon from '../../assets/vector/edit_outline_blue.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import { Link } from 'react-router-dom'

const AddressBox = ({ add_Id, address, user_Full_Name, user_ph_Number, user_Pincode, user_State, user_City, user_Address, user_Landmark, setEditID, setProfileState }) => {
  const matches = useMediaQuery("(min-width:768px)")

  return (
    <div className='address'>
      <div className='address_Box'>
        <div className="address_Box_Wrapper">
          <p className="address_Box_Name">{user_Full_Name}</p>
          <p>{user_Address}, {user_City}, {user_State} - {user_Pincode}</p>
          <p>{user_ph_Number}</p>
        </div>
        <div className="address_Box_Footer">
          <div className='address_Footer_Delete'>
            <img src={deleteIcon} alt="" />
            <p>Delete address</p>
          </div>
          {
            matches ? (
              <Link to={'/profile'} state={address} className="address_Footer_Edit" onClick={() => { setEditID(add_Id); setProfileState(11) }}>
                <img src={editIcon} alt="" />
                <p>Edit address</p>
              </Link>
            ) : (
              <Link to={'/editaddress'} state={address} className="address_Footer_Edit" onClick={() => setEditID(add_Id)}>
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
