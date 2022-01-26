//CSS
import './Address.css'

//Components
import AddressBox from '../../components/AddressBox/AddressBox'
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2'


//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'

const Address = () => {
  return (
    <>
      <HeaderBar2 header3={true} headerText={'Select Address'} />
      <div className="page_Wrapper">
        <div className='address_List'>
          <AddressBox />

          {/* Add New Address */}
          <div className='add_New_Address'>
            <img src={addIcon} alt="" />
            <p>Add a new address</p>
          </div>
        </div>
        <div className="address_Footer">
          <button type='submit' className='submit-button'><p>Continue</p></button>
        </div>
      </div>
    </>
  )
}

export default Address
