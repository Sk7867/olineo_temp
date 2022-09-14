import React, { useEffect, useState } from 'react'
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
  openStoreButton,
  classes
}) => {

  const [storeData, setStoreData] = useState({
    store_Name: '',
    store_Address: '',
    store_Timing: '',
    store_Contact: '',
    store_Map_Link: '',
  })

  const [storeStatusOpen, setstoreStatusOpen] = useState(false)

  useEffect(() => {
    if (store) {
      setStoreData(prev => ({
        ...prev,
        store_Name: store.fc_name,
        store_Address: store.street_name,
        store_Contact: store.contact_no
      }))
    }
  }, [store])

  // useEffect(() => {
  //   if (store) {
  //     let storeOpeningHours = store.opening_hours + '.' + store.opening_mins
  //     console.log(storeOpeningHours);
  //     if (parseInt(storeOpeningHours) > 12) {

  //     }
  //   }
  // }, [store])



  return (
    <>
      <div className={`storebox_Container ${classes && classes.containerClasses ? (classes.containerClasses) : ('')}`}>
        <div className="storebox_Wrapper">
          {storeData && storeData.store_Name && (<p className="store_Name">{storeData.store_Name}</p>)}
          {storeData && storeData.store_Address && (<p className="store_Address">{storeData.store_Address}</p>)}
          {storeData && storeData.store_Timing && (
            <div className='store_Timing'>
              <img src={clockBlackIcon} alt="" />
              <p>{storeData.store_Timing}</p>
              <div className="store_Status">
                <p>open</p>
              </div>
            </div>
          )}
          {storeData && storeData.store_Contact && (
            <div className='store_Contact'>
              <img src={phoneOutlineBlackIcon} alt="" />
              {
                // storeData.store_Contact.map((contact, index) => (
                <a href={`tel:${storeData.store_Contact}`}>{storeData.store_Contact}</a>
                // ))
              }
            </div>
          )}
          {storeData && storeData.store_Distance && (
            <div className="store_Distance">
              <img src={navigationBlackIcon} alt="" />
              <p>{storeData.store_Distance}</p>
            </div>
          )}
          {storeData && storeData.store_Map_Link && (
            <Link to={storeData.store_Map_Link} target='_blank' className="store_Map_Link">
              <img src={navigationArrowBlack} alt="" />
              <p>Show on map</p>
            </Link>
          )}
          {storeData && openStoreButton && (
            <Link className="open_Store_button" to={`/store/${store.brand_store_id}`}>
              <p>Open store</p>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default StoreBox