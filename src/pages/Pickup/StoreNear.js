import React, { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

//CSS
import './Pickup.css'

//Images
import locationWarningYellowIcon from '../../assets/vector/location_warning_yellow.svg'

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox';
import StoreBox from '../../components/StoreBox/StoreBox';

const StoreNear = ({ setHeaderData, setStoreSelected }) => {
  const [disable, setDisable] = useState(true);
  const [userLocation, setUserLocation] = useState(false)
  const matches = useMediaQuery("(min-width:768px)")
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Stores Near Me',
      categoriesCond: false,
    })
  }, []);

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'My Cart',
      url: '/mycart'
    },
    {
      text: 'Delivery option',
      url: ''
    },
  ]

  const storeBoxData = [
    {
      id: 1,
      store_Name: 'Store Name',
      store_Address: 'Olineo store plot - 174/832, city tower, next to hotel mayfair, bandra east, 400051, mumbai, maharashtra',
      store_Timing: 'Mon - Sun 10 AM - 10 PM',
      store_Contact: [
        '3098098767',
        '3764735623',
      ],
      store_Distance: '4 km'
    },
    {
      id: 2,
      store_Name: 'Store Name',
      store_Address: 'Olineo store plot - 174/832, city tower, next to hotel mayfair, bandra east, 400051, mumbai, maharashtra',
      store_Timing: 'Mon - Sun 10 AM - 10 PM',
      store_Contact: [
        '3098098767',
        '3764735623',
      ],
      store_Distance: '4 km'
    },
  ]

  const refreshPage = () => {
    window.location.reload(false)
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
            <PriceDetailsBox HideDetails={false} />
          </aside>
          <div className='order_Page_Right'>
            <p className="cart_Text section_Wrapper">Stores near me</p>
            {
              userLocation ? (
                <>
                  <div className="store_Search_List">
                    {
                      storeBoxData.map((store, index) => (
                        <div className='store_Seach_Option' key={index}>
                          <label htmlFor={store.id} className={`radiobtn-label home_Delivery_Label`} onClick={() => { setStoreSelected(store.id); setDisable(false) }}>
                            <input type="radio" name='Store Option' id={store.id} value={store.id} />
                            <span className="radio-custom"></span>
                            <StoreBox store={store} />
                          </label>
                        </div>
                      ))
                    }
                  </div>
                  {
                    matches && (
                      <div className='delivery_Option_Submit_Button'>
                        <button type='submit' className='submit-button ' disabled={disable}><p>Continue</p></button>
                      </div>
                    )
                  }
                  {
                    !matches && (
                      <div className="address_Footer">
                        <button type='submit' className='submit-button' disabled={disable} ><p>Continue</p></button>
                      </div>
                    )
                  }
                </>
              ) : (
                <>
                  <div className="location_Alert">
                    <img src={locationWarningYellowIcon} alt="" />
                    <p>Enable location from browser setting to locate stores near your location.</p>
                  </div>
                  <div className="location_Refresh">
                    <p>Refresh page after enabling the location.</p>
                    <div className="location_Refresh_Button">
                      <button type='submit' className='submit-button' onClick={refreshPage}><p>Refresh</p></button>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreNear