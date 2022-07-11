import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './StoreBox.css'

//images
import clockBlackIcon from '../../assets/vector/clock_black.svg'
import navigationBlackIcon from '../../assets/vector/navigation_black.svg'
import phoneOutlineBlackIcon from '../../assets/vector/phone_outline_black.svg'
import navigationArrowBlack from '../../assets/vector/navigation_arrow_black.svg'

const StoreBox = ({
  store,
  handleCategorySearch,
  classes
}) => {

  return (
    <>
      <div className={`storebox_Container ${classes && classes.containerClasses ? (classes.containerClasses) : ('')}`}>
        <div className="storebox_Wrapper">
          {store && store.store_Name && (<p className="store_Name">{store.store_Name}</p>)}
          {store && store.store_Address && (<p className="store_Address">{store.store_Address}</p>)}
          {store && store.store_Timing && (
            <div className='store_Timing'>
              <img src={clockBlackIcon} alt="" />
              <p>{store.store_Timing}</p>
            </div>
          )}
          {store && store.store_Contact && (
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
          )}
          {store && store.store_Distance && (
            <div className="store_Distance">
              <img src={navigationBlackIcon} alt="" />
              <p>{store.store_Distance}</p>
            </div>
          )}
          {store && store.store_Map_Link && (
            <Link to={store.store_Map_Link} target='_blank' className="store_Map_Link">
              <img src={navigationArrowBlack} alt="" />
              <p>Show on map</p>
            </Link>
          )}
          {store && store.open_Store_Button && (
            <div className="open_Store_button" onClick={() => handleCategorySearch('all')}>
              <p>Open store</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StoreBox