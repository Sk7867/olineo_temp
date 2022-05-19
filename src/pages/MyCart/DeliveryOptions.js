import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox';
import { UserDataContext } from '../../Contexts/UserContext'
import { getAddress } from '../../api/Address';

const DeliveryOptions = ({ setDeliveryOptionSelected, setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [selected, setSelected] = useState(null);
  const [disable, setDisable] = useState(true);
  const { userAddress, setUserContext, setUserAddress } = useContext(UserDataContext)
  const nav = useNavigate()

  useEffect(() => {

    setHeaderData({
      header3Cond: true,
      headerText: 'Delivery option',
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  useEffect(() => {
    getAddress()
      .then(res => {
        // console.log(res);
        if (res) {
          setUserAddress({
            loaded: true,
            no_of_address: res.no_of_address,
            address: res.address
          })
        }
      })
  }, [])

  const deliveryOptions = [
    {
      text: 'Pickup from store',
      link: '/store-pickup'
    },
    {
      text: 'Deliver to a location',
      link: '/home-delivery'
    },
  ]

  const handleSelected = (name) => {
    setSelected(name)
    setDeliveryOptionSelected(name)
  }

  const handlePageSwitch = (pageURL) => {
    nav(pageURL);
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

  // console.log(selected);

  return <>
    <div className='page_Wrapper page_Margin_Top_Secondary'>
      <BreadCrumbs data={breadCrumbsData} />
      <div className='desk_Page_Wrapper'>
        <aside className="side_Section" style={{ padding: '0' }}>
          <PriceDetailsBox HideDetails={false} />
        </aside>
        <div className='order_Page_Right'>
          <p className="cart_Text section_Wrapper">Select delivery option</p>
          <div className='payment_Methods delivery_Options section_Wrapper'>
            <form className="payment_Methods_Body">
              {
                deliveryOptions.map((item, index) => (
                  <div key={index}>
                    <label htmlFor={item.text} className={`radiobtn-label payment_Methods_Labels  ${selected === item.link ? ('payment_Methods_Selected') : ('')}`} onClick={() => { handleSelected(item.link); setDisable(false) }}>
                      <input type="radio" name='delivery' id={item.text} value={item.text} />
                      <span className="radio-custom"></span>{item.text}
                    </label>
                  </div>
                ))
              }
            </form>
          </div>
          {
            matches && (
              <div className='delivery_Option_Submit_Button'>
                <button type='submit' className='submit-button ' disabled={disable} onClick={() => handlePageSwitch(selected)} ><p>Continue</p></button>
              </div>
            )
          }
          {
            !matches && (
              <div className="address_Footer">
                <button type='submit' className='submit-button' disabled={disable} onClick={() => handlePageSwitch(selected)}><p>Continue</p></button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  </>;
};

export default DeliveryOptions;
