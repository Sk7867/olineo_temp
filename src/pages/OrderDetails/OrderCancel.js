import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import { logOutUser } from '../../api/Auth';
import { getAddress } from '../../api/Address';
import { UserDataContext } from '../../Contexts/UserContext'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { cancelOrder, getAllOrder } from '../../api/OrdersApi';

const OrderCancel = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [cancelSelected, setCancelSelected] = useState({});
  const [btnDisable, setbtnDisable] = useState(true)
  const [productData, setProductData] = useState({
    order_Id: "",
    order_Status: "",
    itemId: '',
  })
  const loc = useLocation()
  const nav = useNavigate()
  const { userOrderData, setUserOrderData } = useContext(UserDataContext)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Request cancel',
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    })
  }, []);

  useEffect(() => {
    if (loc && loc.state) {
      setProductData({
        order_Id: loc.state.order_Id,
        order_Status: loc.state.order_Status,
        itemId: loc.state.itemId
      })
    }
  }, [loc])
  console.log(productData);

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'My Orders',
      url: '/orders'
    },
    {
      text: 'Track Order',
      url: ''
    },
  ]

  const orderCancelArray = [
    {
      id: 1,
      data: 'I want to change address',
    },
    {
      id: 2,
      data: 'Received a broken item',
    },
    {
      id: 3,
      data: 'Too long to be delivered',
    },
    {
      id: 4,
      data: 'Bad quality products feedback',
    },
    {
      id: 5,
      data: 'My reason is not listed',
    },
    {
      id: 6,
      data: 'My order is placed by mistake',
    },
    {
      id: 7,
      data: 'Received  wrong size',
    },
    {
      id: 8,
      data: 'Received wrong item',
    },
  ]

  const handleOrderCancel = (e) => {
    e.preventDefault()
    let query = cancelSelected.data
    cancelOrder(productData.order_Id, productData.itemId, query)
      .then(res => res ? (
        nav('/orders')
      ) : (''))
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className="order_Details_Wrapper">
          <div className="order_Cancel_Container section_Wrapper">
            {
              orderCancelArray.map((item) => (
                <div key={item.id}>
                  <label htmlFor={item.id} className={`radiobtn-label payment_Methods_Labels ${cancelSelected.id === item.id ? ('payment_Methods_Selected') : ('')}`} onClick={() => { setCancelSelected(item); setbtnDisable(false) }}>
                    <input type="radio" name='Order Cancel' id={item.id} value={item.data} />
                    <span className="radio-custom"></span>{item.data}
                  </label>
                </div>
              ))
            }
            <div className='order_Cancel_Submit'>
              <button type='submit' className='submit-button ' onClick={handleOrderCancel} disabled={btnDisable} ><p>Submit</p></button>
            </div>
          </div>
        </div>
      </div>
      <div className="floating_Footer">
        <div className="floating_Footer_Center">
          <button type='submit' className='submit-button' onClick={handleOrderCancel} disabled={btnDisable} ><p>Submit</p></button>
        </div>
      </div>
    </>
  )
}

export default OrderCancel