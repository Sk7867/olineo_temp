import useMediaQuery from '@mui/material/useMediaQuery'
//CSS
import './AddressBox.css'

//images
import editIcon from '../../assets/vector/edit_outline_blue.svg'
import deleteIcon from '../../assets/vector/delete_outline_blue.svg'
import { Link } from 'react-router-dom'

const AddressBox = ({ address, setEditID, setProfileState, deleteOption = true, border }) => {
  const matches = useMediaQuery("(min-width:768px)")
  // console.log(border);

  // console.log(address);
  return (
    <div className={`address ${!border ? ('border-0') : ('')}`}>
      <div className='address_Box'>
        <div className="address_Box_Wrapper">
          <p className="address_Box_Name">{address.user_Full_Name}</p>
          <p>{address.user_Address}, {address.user_City}, {address.user_State} - {address.user_Pincode}</p>
          <p>{address.user_ph_Number}</p>
        </div>
        <div className="address_Box_Footer">
          {
            deleteOption && (
              <div className='address_Footer_Delete'>
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
