//CSS
import './AddressBox.css'

//images
import editIcon from '../../assets/vector/edit_outline_blue.svg'

const AddressBox = () => {
  return (
    <div className='address'>
      <label htmlFor={'item'} className="radiobtn-label">
        <input type="radio" name='payment' id={'item'} value={'item'} />
        <span className="radio-custom"></span>
        <div className='address_Box'>
          <div className="address_Box_Wrapper">
            <p className="address_Box_Name">{`Michel`}</p>
            <p>{`A/302, Sambhav CHSL, Bhayander(West) Mumbai - 400001`}</p>
            <p>{`9167619574`}</p>
          </div>
          <div className="address_Box_Footer">
            <img src={editIcon} alt="" />
            <p>Edit address</p>
          </div>
        </div>
      </label>
    </div>
  )
}

export default AddressBox
