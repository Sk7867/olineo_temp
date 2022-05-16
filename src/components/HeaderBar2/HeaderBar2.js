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


const HeaderBar2 = ({ userLoggedIn, headerData }) => {
  const [modalShow, setModalShow] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [useDP, setUseDP] = useState(true)
  const [userDPPic, setUserDPPic] = useState({ locataion: '' })
  const [filteredData, setFilteredData] = useState([])
  const [searchedQuery, setSearchedQuery] = useState('')
  const nav = useNavigate()
  const { header3Cond, headerText, categoriesCond, header3Store, header3Cart, header3Profile } = headerData
  const { userContext, allProducts, } = useContext(UserDataContext)
  // console.log(headerData);
  // console.log(allProducts);

  const handleModalShow = () => {
    setModalShow(true)
  }

  useEffect(() => {
    if (userContext && userContext.profilePic) {
      setUserDPPic({ locataion: userContext.profilePic.locataion })
    } else {
      setUserDPPic({ locataion: userDefaultDP })
    }

  }, [userContext])


  const categoriesList = [
    {
      categoryImage: layoutDotted,
      categoryName: 'All Categories',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileGreenDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobileBlueDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
    {
      categoryImage: mobilePinkDotted,
      categoryName: 'Mobiles',
      categoryLink: '',
    },
  ]

  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = allProducts.products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord)
    })

    if (searchWord === '') {
      setFilteredData([])
      setSearchedQuery('')
    } else {
      setFilteredData(newFilter)
      setSearchedQuery(searchWord)
    }
  }
  // console.log(filteredData);

  const handleSearchClick = (value) => {
    nav(`/${value.name}`)
    setFilteredData([])
    setSearchedQuery('')
    // let query = {productInfo.brand = `${value.name}` }
    // getSearchedProduct()
    // .then(res => res ? (
    //   console.log(value),
    // ) : (''))
  }

  return (
    <>
      <header className={`headerbarContainer ${header3Cond ? ('header2_tab') : ''}`}>
        <div className="headerbarWrapper">
          <div className="headerbarLeft">
            <div className="hamburger" onClick={() => setSidebar(true)}>
              <img src={hamburger} alt="" />
            </div>
            <Link to={'/'} className="navLogo">
              <img src={logo_mob} alt="" className='logo_mob' />
              <img src={logo_desk} alt="" className='logo_desk' />
              <img src={logo_tab} alt="" className='logo_tab' />
            </Link>
            <div className="left_location" onClick={() => handleModalShow()}>
              <img src={locationWhite} alt="" />
              <p>Select location</p>
            </div>
          </div>
          <div className="headerbarCenter">
            <div className="searchbar_Container">
              <input type="text" placeholder='Search...' className='searchbar' onChange={handleFilter} />
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
          <div className="headerbarRight">

            <Link to={`/store-finder`} className='storeIcon'>
              <p>Find Store</p>
              <img src={storeWhite} alt="" />
            </Link>
            <div className='cartIcon' onClick={() => { userLoggedIn ? nav('/mycart') : nav('/login') }}>
              <img src={cartWhite} alt="" />
              <p>Cart</p>
            </div>
            {
              userLoggedIn ? (
                <div className="user_profile" onClick={() => nav('/profile')}>
                  <p>My Profile</p>
                  <img src={userDPPic.locataion} alt="" />
                </div>
              ) : (
                <>
                  <p className='right_login'>
                    <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
                  </p>
                  <p className='right_login login_tab_only'>
                    <Link to={'/login'}>Login</Link>
                  </p>
                </>
              )
            }
          </div>
        </div>
        <div className="searchbarWrapper">
          <div className="searchbar_Container">
            <input type="text" placeholder='Search...' className='searchbar' onChange={handleFilter} />
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
                    <div className="category" key={index}>
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
                      <img src={userDPPic.locataion} alt="" />
                    </Link>
                  ) : (
                    <>
                      <p className='right_login'>
                        <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Create account</Link>
                      </p>
                      <p className='right_login login_tab_only'>
                        <Link to={'/login'}>Login</Link>
                      </p>
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
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} userLoggedIn={userLoggedIn} />
    </>
  )
}

export default HeaderBar2
