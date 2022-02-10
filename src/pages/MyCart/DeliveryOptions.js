import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import PriceDetailsBox from '../../components/PriceDetailsBox/PriceDetailsBox';

const DeliveryOptions = ({ setDeliveryOptionSelected, setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [selected, setSelected] = useState(null);
  const [disable, setDisable] = useState(true);
  const nav = useNavigate()

  useEffect(() => {

    setHeaderData({
      header3Cond: true,
      headerText: 'Delivery option',
      categoriesCond: false,
    })
  }, []);

  const deliveryOptions = [
    {
      text: 'Pickup from store',
      link: '/'
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
        <aside className="side_Section section_Wrapper" style={{ padding: '0' }}>
          <PriceDetailsBox HideDetails={false} />
        </aside>
        <div className='order_Page_Right'>
          <p className="cart_Text section_Wrapper">Select delivery option</p>
          <div className='payment_Methods delivery_Options'>
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
                <button type='submit' className='submit-button ' disabled={disable} onClick={() => handlePageSwitch(selected)} ><p>SAVE DETAILS</p></button>
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
