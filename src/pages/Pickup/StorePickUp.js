import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

//CSS
import './Pickup.css'

//Images
import searchBlueIcon from '../../assets/vector/search_blue.svg'
import locationWarningYellowIcon from '../../assets/vector/location_warning_yellow.svg'

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox'
import StoreBox from '../../components/StoreBox/StoreBox'
import useGeolocation from '../../hooks/useGeolocation'
import { UserDataContext } from '../../Contexts/UserContext'
import { getStoreLocation } from '../../api/StoreApi'
import Loader from '../../components/Loader/Loader'
import { initOrder, paymentInit } from '../../api/OrdersApi'

const StorePickUp = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [disable, setDisable] = useState(true);
  const [showStore, setShowStore] = useState(false)
  const nav = useNavigate()
  const { location, locationFetch } = useGeolocation()
  const [storeSelectedId, setStoreSelectedId] = useState('')
  const {
    setUserLocation,
    storeLocations,
    setStoreLocations,
    cartArray,
    orderInit,
    setOrderInit,
    userDefaultAddress
  } = useContext(UserDataContext)
  const [showLoader, setShowLoader] = useState(false)
  const [userPincode, setUserPincode] = useState('')
  const [initProcessing, setInitProcessing] = useState(false);

  console.log(userDefaultAddress)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Select Pickup Store',
      categoriesCond: false,
    })
  }, []);

  const handleStoreSelectButton = () => {
    locationFetch();
  }

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

  const refreshPage = () => {
    window.location.reload(false)
  }

  useEffect(() => {
    if (location.loaded && location.error) {
      setShowStore(false)
    } else if (location.loaded && location.coordinates) {
      setShowStore(true)
      setUserLocation(location)

    }
  }, [location])

  useEffect(() => {
    if (storeSelectedId !== '' && userDefaultAddress.loaded && userDefaultAddress.no_of_address === 1) {
      setOrderInit((prev) => ({
        ...prev,
        quantity: [1],
        shippingAddressId: userDefaultAddress?.address?._id,
        type: 'Manual',
        storeId: storeSelectedId
      }));
    }
  }, [storeSelectedId]);

  // const storeBoxData = [
  //   {
  //     id: 1,
  //     store_Name: 'Store Name',
  //     store_Address: 'Olineo store plot - 174/832, city tower, next to hotel mayfair, bandra east, 400051, mumbai, maharashtra',
  //     store_Timing: 'Mon - Sun 10 AM - 10 PM',
  //     store_Contact: [
  //       '3098098767',
  //       '3764735623',
  //     ],
  //     store_Map_Link: '#',
  //     open_Store_Button: false,
  //     open_Store_Menu: '/store1/category1'
  //   },
  //   {
  //     id: 2,
  //     store_Name: 'Store Name',
  //     store_Address: 'Olineo store plot - 174/832, city tower, next to hotel mayfair, bandra east, 400051, mumbai, maharashtra',
  //     store_Timing: 'Mon - Sun 10 AM - 10 PM',
  //     store_Contact: [
  //       '3098098767',
  //       '3764735623',
  //     ],
  //     store_Map_Link: '#',
  //     open_Store_Button: false,
  //     open_Store_Menu: '/store1/category1'
  //   },
  // ]

  useEffect(() => {
    if (userPincode !== '') {
      setShowLoader(true)
      if (userPincode.length === 6) {
        let prodEan = cartArray?.cart[0]?.ean
        getStoreLocation(prodEan, 1, userPincode)
          .then(res => {
            if (res) {
              console.log(res)
              setStoreLocations({
                loaded: true,
                no_of_stores: res.stores?.length,
                stores: res.stores
              })
              setShowStore(true)
              setShowLoader(false)
            }
          })
      }
    } else {
      setShowLoader(false)
    }
  }, [userPincode])

  const handleOrderInit = async (e) => {
    e.preventDefault();
    setInitProcessing(true);

    const OrderinitRes = await initOrder(orderInit);
    if (!OrderinitRes) return setInitProcessing(false);

    let orderId = OrderinitRes._id;
    // console.log(orderId);

    const payInitRes = await paymentInit(orderId);
    window.open(payInitRes, "_parent");
    setInitProcessing(false);
  };


  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
            <PriceDetailsBox HideDetails={false} />
          </aside>
          <div className='order_Page_Right'>
            <>
              {
                location && location.loaded && (location.error) ? (
                  <>
                    <p className="cart_Text section_Wrapper">Stores near me</p>
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
                ) : (
                  showStore && !location.error && !showLoader ? (
                    <>
                      <p className="cart_Text section_Wrapper">Stores near me</p>
                      <div className="store_Search_List">
                        {
                          (storeLocations?.loaded && storeLocations?.no_of_stores > 0) ? (
                            storeLocations.stores.map((store, index) => (
                              <div className='store_Seach_Option' key={index}>
                                <label htmlFor={store._id} className={`radiobtn-label home_Delivery_Label`} onClick={() => { setStoreSelectedId("HO"); setDisable(false) }}>
                                  <input type="radio" name='Store Option' id={store._id} value={store._id} />
                                  <span className="radio-custom"></span>
                                  <StoreBox store={store} />
                                </label>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className='nostore_Found_Text'>
                                <p>No store was found for the search.</p>
                              </div>
                            </>
                          )
                        }
                      </div>
                      {
                        matches && storeLocations?.loaded && (storeLocations.no_of_stores > 0) && (
                          <div className='delivery_Option_Submit_Button'>
                            <button type='submit' className='submit-button ' onClick={handleOrderInit} disabled={disable}>
                              <p>{initProcessing ? "Processing..." : "Continue"}</p>
                            </button>
                          </div>
                        )
                      }
                      {
                        !matches && storeLocations?.loaded && (storeLocations.no_of_stores > 0) && (
                          <div className="address_Footer">
                            <button type='submit' className='submit-button' onClick={handleOrderInit} disabled={disable} >
                              <p>{initProcessing ? "Processing..." : "Continue"}</p>
                            </button>
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <>
                      <div className="pickup_Search_Bar_Container section_Wrapper">
                        <div className='pickup_Search_Bar'>
                          <input type="text" name="Store Search" id="" className='searchbar store_Search_Bar' onChange={(e) => setUserPincode(e.target.value)} placeholder={`Enter PIN code/Store name`} />
                          <img src={searchBlueIcon} alt="" />
                        </div>
                      </div>
                      {
                        showLoader ? (
                          <>
                            <div className='store_Pick_Loader'>
                              <div>
                                <Loader />
                              </div>
                            </div>
                          </>
                        ) : (
                          !showStore && (
                            <>
                              <div className="store_Page_Separtor">
                                <span className='hr_Line'></span>
                                <p>OR</p>
                              </div>
                              <div className='near_Store_Button'>
                                <button type='submit' className='submit-button' onClick={handleStoreSelectButton}><p>Show stores near me</p></button>
                              </div>
                            </>
                          )
                        )
                      }
                    </>
                  )
                )
              }
            </>
          </div>
        </div>
      </div>
    </>
  )
}

export default StorePickUp