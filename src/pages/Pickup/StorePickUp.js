import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

//CSS
import './Pickup.css'

//Images
import searchBlueIcon from '../../assets/vector/search_blue.svg'

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import StoreBox from '../../components/StoreBox/StoreBox'

const StorePickUp = ({ setHeaderData, setStoreSelected, cartData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [nearStore, setNearStore] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Select Pickup Store',
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



  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
            <PriceDetailsBox HideDetails={false} cartData={cartData} />
          </aside>
          <div className='order_Page_Right'>
            <div className="pickup_Search_Bar_Container">
              <div className='pickup_Search_Bar'>
                <input type="text" name="Store Search" id="" className='searchbar store_Search_Bar' placeholder={`Enter PIN code/Store name`} />
                <img src={searchBlueIcon} alt="" />
              </div>
            </div>
            <div className="store_Page_Separtor">
              <span className='hr_Line'></span>
              <p>OR</p>
            </div>
            <div className='near_Store_Button'>
              <button type='submit' className='submit-button' onClick={() => nav('/store-near-me')}><p>Show stores near me</p></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StorePickUp