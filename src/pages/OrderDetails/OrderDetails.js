import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import { logOutUser } from '../../api/Auth';
import { getAddress } from '../../api/Address';
import { UserDataContext } from '../../Contexts/UserContext'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

//CSS
import './OrderDetails.css'
import { getOrderStatus } from '../../api/OrdersApi';

const OrderDetails = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [editAddress, setEditAddress] = useState({});
  const [product, setProduct] = useState({})
  const loc = useLocation()
  const [orderNumber, setOrderNumber] = useState('')
  const nav = useNavigate()
  const { userContext, setUserContext, userAddress, setUserAddress, userCart, setUserCart, allProducts } = useContext(UserDataContext)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Order 444000',
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    })
  }, []);

  useEffect(() => {
    if (loc && loc.state) {
      setProduct(loc.state)
      // console.log(loc.state);
      let orderId = loc.state._id
      getOrderStatus(orderId)
        .then(res => {
          // console.log(res)
          setOrderNumber(res.orderId)
        })
    }
  }, [loc])

  //console.log(product);

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

  const orderSteps = [
    {
      stepName: 'Order placed',
      completionDate: 'Sun,20th Feb',
      completed: true,
    },
    {
      stepName: 'Packed',
      completionDate: 'Mon,21st Feb',
      completed: true,
    },
    {
      stepName: 'Shipped',
      completionDate: 'Wed,23rd Feb',
      completed: false,
    },
    {
      stepName: 'Delivery',
      completionDate: 'Fri,25th Feb',
      completed: false,
    },
  ]

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className="order_Details_Wrapper">
          <div className="order_Details_Header section_Wrapper">
            <p className='header_Order_Status'>Arriving on 25th February</p>
            <p className='header_Order_Number'>Order Number : {orderNumber} </p>
          </div>
          <div className="order_Track_Container section_Wrapper">
            <div className="order_Track_Wrapper">
              {
                orderSteps.map((step, index) => (
                  <div key={index} className={`order_Track_Step ${step.completed ? 'step_Completed' : ''}`}>
                    <div className="step_Circle_Icon"><div></div></div>
                    <div className="step_Details">
                      <p className="step_Name">{step.stepName}</p>
                      <p className="step_Date">{step.completionDate}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {
            matches ? (
              <Link to={'/order-cancel'} state={product} className="order_Cancel_Button">
                <button type='submit' className='submit-button ' ><p>Request order cancellation</p></button>
              </Link>
            ) : (
              <Link to={'/order-cancel'} state={product} className="order_Cancel_Button">
                <p>Request order cancellation</p>
              </Link>
            )
          }
        </div>
      </div>

    </>
  )
}

export default OrderDetails