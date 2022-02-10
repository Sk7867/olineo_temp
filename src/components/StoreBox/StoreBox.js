import React from 'react'

//CSS
import './StoreBox.css'

//images
import clockBlackIcon from '../../assets/vector/clock_black.svg'
import navigationBlackIcon from '../../assets/vector/navigation_black.svg'
import phoneOutlineBlackIcon from '../../assets/vector/phone_outline_black.svg'

const StoreBox = ({ store }) => {



  return (
    <>
      <div className='storebox_Container'>
        <div className="storebox_Wrapper">
          <p className="store_Name">{store.store_Name}</p>
          <p className="store_Address">{store.store_Address}</p>
          <div className='store_Timing'>
            <img src={clockBlackIcon} alt="" />
            <p>{store.store_Timing}</p>
          </div>
          <div className='store_Contact'>
            <img src={phoneOutlineBlackIcon} alt="" />
            {
              store.store_Contact.map((contact, index) => (
                <p key={index}>{contact}</p>
              ))
            }
            <div className="store_Status">
              <p>open</p>
            </div>
          </div>
          <div className="store_Distance">
            <img src={navigationBlackIcon} alt="" />
            <p>{store.store_Distance}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreBox