import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import { UserDataContext } from '../../Contexts/UserContext'

//Images
import addIcon from '../../assets/vector/add_outline_blue.svg'
import AddressBox from '../../components/AddressBox/AddressBox';

//Components
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

const HomeDelivery = ({ setEditID, addressSelected, setAddressSelected, setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [disable, setDisable] = useState(true)
  const { userAddress, setUserContext } = useContext(UserDataContext)

  const nav = useNavigate()

  useEffect(() => {

    setHeaderData({
      header3Cond: true,
      headerText: 'Select Address',
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
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
      <div className="page_Wrapper page_Margin_Top_Secondary">
        <BreadCrumbs data={breadCrumbsData} />
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
            <PriceDetailsBox HideDetails={false} />
          </aside>
          <div className='order_Page_Right'>
            <p className="cart_Text section_Wrapper">Select Address</p>
            <div className="home_Delivery_Options">
              {
                userAddress.delivery_Address.map((address, index) => (
                  <div className="home_Delivery_Option" key={index}>
                    <label htmlFor={address.id} className={`radiobtn-label home_Delivery_Label`} onClick={() => { setAddressSelected(address.id); setDisable(false) }}>
                      <input type="radio" name='Delivery Address' id={address.id} value={address.id} />
                      <span className="radio-custom"></span>
                      <AddressBox setEditID={setEditID}
                        address={address}
                        deleteOption={false}
                        border={false}
                      />
                    </label>
                  </div>
                ))
              }
            </div>
            <Link to={'/newaddress'} className='add_New_Address home_Delivery_New_Address'>
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </Link>

            {
              matches && (
                <div className='home_Delivery_Submit'>
                  <button type='submit' className='submit-button ' disabled={disable} onClick={() => nav('/payment')}><p>Continue</p></button>
                </div>
              )
            }

            {
              !matches && (
                <div className="address_Footer">
                  <button type='submit' className='submit-button' disabled={disable} onClick={() => nav('/payment')}><p>Continue</p></button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
};

export default HomeDelivery;
