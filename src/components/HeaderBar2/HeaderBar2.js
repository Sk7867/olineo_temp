import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserContext'
import Sidebar from '../Sidebar/Sidebar'


//CSS
import './HeaderBar2.css'

//Components
import ModalComp from '../ModalComponenr/Modal'

//Images
import hamburger from '../../assets/vector/hamburger_icon.svg'
import logo_mob from '../../assets/vector/navbar_logo_mob.svg'
import logo_desk from '../../assets/vector/navbar_logo_desk.svg'
import logo_tab from '../../assets/vector/navbar_logo_tab.svg'
import storeWhite from '../../assets/vector/store_outline_white.svg'
import cartWhite from '../../assets/vector/cart_outline_white.svg'
import locationWhite from '../../assets/vector/location_white.svg'
import accountCircleWhite from '../../assets/vector/account_circle_outline.svg'
import userDp from '../../assets/png/user_dp.png'
import userDefaultDP from '../../assets/png/account_circle.png'
import layoutDotted from '../../assets/vector/layout_yellow_dotted.svg'
import mobileGreenDotted from '../../assets/vector/mobile_green_dotted.svg'
import mobilePinkDotted from '../../assets/vector/mobile_pink_dotted.svg'
import mobileBlueDotted from '../../assets/vector/mobile_blue_dotted.svg'
import arrowLeftWhite from '../../assets/vector/arrow_left_white.svg'
import searchIconBlue from '../../assets/vector/search_blue.svg'
import { getSearchedProduct } from '../../api/Product'
import { useMediaQuery } from '@mui/material'


const HeaderBar2 = ({ userLoggedIn, headerData }) => {
  const matches768 = useMediaQuery("(min-width:768px)")
  const matches910 = useMediaQuery("(min-width:910px)")
  const matches1290 = useMediaQuery("(min-width:1290px)")
  const [modalShow, setModalShow] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [userDPPic, setUserDPPic] = useState({ locataion: '' })
  const [filteredData, setFilteredData] = useState([]) // Holds product names to display in search dropdown 
  const [searchedQuery, setSearchedQuery] = useState('') //Sets searched product name in search input box
  const [manualQuery, setManualQuery] = useState('')
  const nav = useNavigate()
  const { header3Cond, headerText, categoriesCond, header3Store, header3Cart, header3Profile } = headerData
  const { userContext, allProducts, searchedProduct, setSearchedProduct, userDefaultAddress, setUserDefaultAddress, userLocation, userZip } = useContext(UserDataContext)

  const handleModalShow = () => {
    setModalShow(true)
  }

  useEffect(() => {
    if (userContext && userContext.profilePic) {
      setUserDPPic(userContext.profilePic)
    } else {
      setUserDPPic(userDefaultDP)
    }
  }, [userContext])

  const categoriesList = [
    {
      categoryImage: layoutDotted,
      categoryName: 'All Categories',
      categoryLink: 'all',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Smartphone',
      categoryLink: 'Smartphone',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Tablet',
      categoryLink: 'Tablet',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Soundbar',
      categoryLink: 'Soundbar',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'TWS',
      categoryLink: 'TWS',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Adapter',
      categoryLink: 'Adapter',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Powerbank',
      categoryLink: 'Powerbank',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Charging Cable',
      categoryLink: 'Charging Cable',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Smart TV',
      categoryLink: 'Smart TV',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Wifi Smart Speaker',
      categoryLink: 'Wifi Smart Speaker',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Bluetooth Speaker',
      categoryLink: 'Bluetooth Speaker',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Wired Earphones',
      categoryLink: 'Wired Earphones',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Wired Headphones',
      categoryLink: 'Wired Headphones',
    }, {
      categoryImage: mobileGreenDotted,
      categoryName: 'Bluetooth Neckband',
      categoryLink: 'Bluetooth Neckband',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Miscellaneous',
      categoryLink: 'Miscellaneous',
    },
  ]

  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = allProducts.products.filter((value) => {
      if (
        value.name.toLowerCase().includes(searchWord)
        // || value.productInfo.brand.toLowerCase().includes(searchWord)
      ) {
        return value
      }
    })
    if (searchWord === '') {
      setFilteredData([])
      setSearchedQuery('')
    } else {
      setFilteredData(newFilter)
      setSearchedQuery(searchWord)
    }
  }

  const handleKeyDown = (e) => {
    let value = e.target.value
    if (e.code === 'Enter') {
      let searchTerm = 'search=' + value
      setSearchedQuery(value)
      getSearchedProduct(searchTerm)
        .then(res => {
          if (res) {
            setSearchedProduct({
              loaded: true,
              products: res.products,
              no_of_products: res.no_of_products
            })
            setFilteredData([])
            setSearchedQuery('')
            nav(`/${searchTerm}`)
          }
        })
    }
  }

  const handleSearchClick = (value) => {
    let searchKey = Object.keys(value)
    let searchValue = Object.values(value)
    let searchTerm = searchKey[0] + '=' + searchValue[0]
    setFilteredData([])
    setSearchedQuery('')
    getSearchedProduct(searchTerm)
      .then(res => {
        if (res) {
          setSearchedProduct({
            loaded: true,
            products: res.products,
            no_of_products: res.no_of_products
          })
          nav(`/${value.name}`)
        }
      })
  }

  const handleCategorySearch = (value) => {
    let searchTerm
    let searchURL
    if (value !== 'all') {
      searchTerm = 'hierarchyL2=' + value
      searchURL = 'Category=' + value
    } else {
      searchTerm = ''
      searchURL = 'Category=' + value
    }
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

  return (
    <>
      <header className={`headerbarContainer ${header3Cond ? ('header2_tab') : ''}`}>
        <div className="headerbarWrapper">
          <div className="headerbarLeft">
            <div className='headerbarLeft_Inner'>
              <div className="hamburger" onClick={() => setSidebar(true)}>
                <img src={hamburger} alt="" />
              </div>
              <Link to={'/'} className="navLogo">
                <img src={logo_mob} alt="" className='logo_mob' />
                <img src={logo_desk} alt="" className='logo_desk_1200' />
                <img src={logo_tab} alt="" className='logo_tab' />
              </Link>
            </div>
            <div className="left_location" onClick={() => handleModalShow()}>
              <img src={locationWhite} alt="" />
              {
                userContext?.JWT ? (
                  userZip.loaded ? (
                    <p>{userZip.value}</p>
                  ) : (<>
                    <p>Enter Default Address</p>
                  </>)
                ) : (
                  userZip.loaded ? (
                    <p>{userZip.value}</p>
                  ) : (
                    <>
                      <p>{matches768 && matches910 && (<span>Select</span>)} <span>location</span></p>
                    </>
                  )
                )
              }
            </div>
          </div>
          <div className="headerbarCenter">
            <div className="searchbar_Container">
              <input type="text" placeholder='Search...' value={searchedQuery} onKeyDown={handleKeyDown} className='searchbar' onChange={handleFilter} />
              <div className="seachbar_Icon">
                <img src={searchIconBlue} alt="" />
              </div>
            </div>
            {filteredData.length !== 0 && (
              <div className="search_Results">
                {
                  filteredData.slice(0, 15).map((value, index) => {
                    return (
                      <div onClick={() => handleSearchClick({ 'name': value.name })} className='search_Result_Item' key={index} >
                        <p>{value.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            )}
          </div>
          <div className="headerbarRight">

            <div className='cartIcon' onClick={() => { userLoggedIn ? nav('/mycart') : nav('/login') }}>
              <p>Cart</p>
              <img src={cartWhite} alt="" />
            </div>
            <Link to={`/store-finder`} className='storeIcon'>
              <p>{matches768 && matches910 && (<span>Find</span>)} <span>Store</span></p>
              <img src={storeWhite} alt="" />
            </Link>
            {
              userLoggedIn ? (
                <div className="user_profile" onClick={() => nav('/profile')}>
                  <p>My Profile</p>
                  <img src={userDPPic} alt="" />
                </div>
              ) : (
                <>
                  <p className='right_login'>
                    <Link to={'/login'}>Login</Link> {matches768 && matches1290 && (<span>| <Link to={'/signup'}>Create account</Link></span>)}
                  </p>
                  {/* <p className='right_login login_tab_only'>
                    <Link to={'/login'}>Login</Link>
                  </p> */}
                </>
              )
            }
          </div>
        </div>
        <div className="searchbarWrapper">
          <div className="searchbar_Container">
            <input type="text" placeholder='Search...' value={searchedQuery} onKeyDown={handleKeyDown} className='searchbar' onChange={handleFilter} />
            <div className="seachbar_Icon">
              <img src={searchIconBlue} alt="" />
            </div>
          </div>
          {filteredData.length !== 0 && (
            <div className="search_Results">
              {
                filteredData.slice(0, 15).map((value, index) => {
                  return (
                    <div onClick={() => handleSearchClick(value)} className='search_Result_Item' key={index} >
                      <p>{value.name}</p>
                    </div>
                  )
                })
              }
            </div>
          )}
        </div>
        <div className='locationbarWrapper logo_mob' onClick={() => handleModalShow()}>
          <img src={locationWhite} alt="" />
          <p>Select location to see product availability</p>
        </div>
        {
          categoriesCond && (
            <div className="categories_Container">
              <div className="categories_Wrapper">
                {
                  categoriesList.map((item, index) => (
                    <div className="category" key={index} onClick={() => handleCategorySearch(item.categoryLink)} >
                      <img src={item.categoryImage} alt="" />
                      <p>{item.categoryName}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
      </header>
      {
        header3Cond && (
          <header className='headerbar3_container'>
            <div className="headerbar3_Wrapper">
              <div className="headerbarLeft">
                <img src={arrowLeftWhite} alt="" onClick={() => nav(-1)} className='back_Btn' />
                <img src={logo_mob} alt="" className='nav_Logo' onClick={() => nav('/')} />
                <p>{headerText}</p>
              </div>
              <div className="headerbarRight">
                {header3Store && (
                  <Link to={`/store-finder`} className='storeIcon'>
                    <img src={storeWhite} alt="" />
                  </Link>
                )}
                {header3Cart ? (
                  userLoggedIn ? (
                    <Link className='cartIcon' to={'/mycart'} >
                      <img src={cartWhite} alt="" />
                    </Link>
                  ) : (
                    <Link className='cartIcon' to={'/login'} >
                      <img src={cartWhite} alt="" />
                    </Link>
                  )

                ) : ('')
                }
                {header3Profile ? (
                  userLoggedIn ? (
                    <Link to={'/profile'} className="user_profile">
                      <img src={userDPPic} alt="" />
                    </Link>
                  ) : (
                    <>
                      <p className='right_login'>
                        <Link to={'/login'}>Login</Link> {matches768 && matches1290 && (<span>| <Link to={'/signup'}>Create account</Link></span>)}
                      </p>
                      {/* <p className='right_login login_tab_only'>
                        <Link to={'/login'}>Login</Link>
                      </p> */}
                    </>
                  )
                ) : ('')
                }
              </div>
            </div>
          </header>
        )
      }
      <ModalComp modalShow={modalShow} setModalShow={setModalShow} userLoggedIn={userLoggedIn} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} userLoggedIn={userLoggedIn} handleCategorySearch={handleCategorySearch} />
    </>
  )
}

export default HeaderBar2
