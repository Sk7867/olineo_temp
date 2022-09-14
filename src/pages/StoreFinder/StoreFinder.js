import React, { useState, useEffect, useContext } from 'react'
import { getUserLocation } from '../../api/Auth'
import useGeolocation from '../../hooks/useGeolocation'
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './StoreFinder.css'

//Components
import StoreBox from '../../components/StoreBox/StoreBox'
import MapWrapper from '../../components/MapComp/MapWrapper'

//Images
import categoryOutlineWhite from '../../assets/vector/category_outline_white.svg'
import categoryOutlineBlue from '../../assets/vector/category_outline_blue.svg'
import locationBlue from '../../assets/vector/location_blue.svg'
import locationWhite from '../../assets/vector/location_white.svg'
import locationWarningYellowIcon from '../../assets/vector/location_warning_yellow.svg'
import { getSearchedProduct } from '../../api/Product'
import { useNavigate } from 'react-router-dom'
import { getStoreLocation, getStoreUsingPincode } from '../../api/StoreApi'
import Loader from '../../components/Loader/Loader'

const StoreFinder = ({ setHeaderData }) => {
  const [showStore, setShowStore] = useState(false)
  const nav = useNavigate()
  const [listOptionSelected, setListOptionSelected] = useState(true)
  const { location, locationFetch } = useGeolocation()
  const {
    userLocation,
    setUserLocation,
    storeLocations,
    setStoreLocations,
    setSearchedProduct
  } = useContext(UserDataContext)
  // console.log(showStore);
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: '',
      categoriesCond: false,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  // console.log(userLocation);

  const markerPostions = [
    { lat: 17, lng: 73 },
    { lat: 18, lng: 72 },
    { lat: 19, lng: 73 },
  ]

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
  //     open_Store_Button: true,
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
  //     open_Store_Button: true,
  //     open_Store_Menu: '/store1/category1'
  //   },
  // ]

  const handleStoreSelectButton = () => {
    locationFetch();
  }

  useEffect(() => {
    if (location.loaded && location.error) {
      setShowStore(false)
    } else if (location.loaded && location.coordinates) {
      setUserLocation(location)
    }
  }, [location])

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleCategorySearch = (value) => {
    let searchTerm
    let searchURL
    searchTerm = ''
    searchURL = 'Store=' + value

    // console.log(searchTerm);
    getSearchedProduct(searchTerm)
      .then(res => {
        if (res) {
          setSearchedProduct({
            loaded: true,
            products: res.products,
            no_of_products: res.no_of_products
          })
          nav(`/${searchURL}`)
        }
      })
  }

  const handleEnterClick = (e) => {
    let value = e.target.value
    if (e.code === 'Enter') {
      setShowLoader(true)
      getStoreUsingPincode(value)
        .then(res => res ? (
          setStoreLocations({
            loaded: true,
            no_of_stores: res.stores?.length,
            stores: res.stores
          }),
          setShowStore(true),
          setShowLoader(false)
        ) : (''))
      // let pinSearchTerm = 'pincode=' + value
      // getStoreLocation(pinSearchTerm)
      //   .then(res => res ? (
      //     setStoreLocations({
      //       loaded: true,
      //       no_of_stores: res.no_of_stores,
      //       stores: res.stores
      //     }),
      //     setShowStore(true),
      //     setShowLoader(false)
      //   ) : (''))
    }
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary' style={{ padding: 0 }}>

        <div className="store_Finder_Container">
          {
            location && location.loaded && (location.error) ? (
              <>
                <div className="location_Alert">
                  <img src={locationWarningYellowIcon} alt="" />
                  <p>Enable location from browser setting to locate stores near your location.</p>
                </div>
                <div className="location_Refresh">
                  <p>Refresh page after enabling the location.</p>
                  <div className="location_Refresh_Button">
                    <button type='submit' className='submit-button' onClick={refreshPage} ><p>Refresh</p></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="store_Finder_Wrapper">
                <div className='store_Finder_Heading'>
                  <h3>Find Olineo store near you</h3>
                </div>
                <div className="searchbarWrapper store_Finder_Search">
                  <input type="text" placeholder='Enter Pincode/Store Name' onKeyDown={handleEnterClick} className='searchbar' />
                </div>
                {
                  showLoader ? (
                    <>
                      <div className='store_Finder_Loader'>
                        <Loader />
                      </div>
                    </>
                  ) : (
                    !showStore && (
                      <>
                        <div className="store_Page_Separtor store_Finder_Separtor">
                          <span className='hr_Line'></span>
                          <p>OR</p>
                        </div>
                        <div className="submit_Button_2 store_Finder_Submit_Button">
                          <button type='submit' className='submit-button' onClick={handleStoreSelectButton} ><p>Show stores near me</p></button>
                        </div>
                      </>
                    )
                  )
                }
              </div>
            )
          }
        </div>
        {
          showStore && !location.error && !showLoader ? (
            <div className="store_Finder_Result">
              <div className="store_Result_Header">
                <h4 className="store_Result_Heading">Found {storeLocations.no_of_stores} stores near you</h4>
                <div className="store_Finder_Options">
                  <div className={`store_Finder_List ${listOptionSelected ? 'selected' : ''}`} onClick={() => setListOptionSelected(true)} >
                    {listOptionSelected ? (<img src={categoryOutlineWhite} alt="" />) : (<img src={categoryOutlineBlue} alt="" />)}
                    <p>List</p>
                  </div>
                  <div className={`store_Finder_Map ${listOptionSelected ? '' : 'selected'}`} onClick={() => { setListOptionSelected(false) }} >
                    {listOptionSelected ? (<img src={locationBlue} alt="" />) : (<img src={locationWhite} alt="" />)}
                    <p>Map</p>
                  </div>
                </div>
              </div>
              <div className='store_Result_List'>
                {!listOptionSelected && (
                  <div className="store_Result_Map">
                    <MapWrapper center={userLocation.coordinates} markerPostions={markerPostions} />
                  </div>
                )}
                {
                  storeLocations.stores.map((store, index) => (
                    <StoreBox
                      key={index}
                      store={store}
                      handleCategorySearch={handleCategorySearch}
                      openStoreButton={true}
                      classes={{
                        containerClasses: 'bg-white tab_Border'
                      }} />
                  ))
                }
              </div>
            </div>
          ) : ('')
        }
      </div>
    </>
  )
}

export default StoreFinder