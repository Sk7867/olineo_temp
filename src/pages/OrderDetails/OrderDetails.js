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
  const [stepsDetails, setStepsDetails] = useState({
    placed: true,
    packed: false,
    shipped: false,
    delivered: false,
  })
  const [orderSteps, setOrderSteps] = useState([
    {
      stepName: 'Order placed',
      completionDate: 'Sun,20th Feb',
      completed: true,
    },
    {
      stepName: 'Packed',
      completionDate: 'Mon,21st Feb',
      completed: false,
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
  ])
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
      handleOrderState(loc.state.status)
      // console.log(loc.state);
      // let orderId = loc.state._id
      // getOrderStatus(orderId)
      //   .then(res => {
      //     // console.log(res)
      //     setOrderNumber(res.orderId)
      //   })
    }
  }, [loc])

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

  const handleOrderState = (status) => {
    switch (status) {
      case 'INITIATED': {
        let allSteps = [...orderSteps]
        let step = allSteps[0]
        // step.completed = !step.completed
        allSteps[0] = step
        setOrderSteps(allSteps)
      }
        break;
      case 'UNASSIGNED': {
        let allSteps = [...orderSteps]
        let step = allSteps[0]
        // step.completed = !step.completed
        allSteps[0] = step
        setOrderSteps(allSteps)
      }
        break;
      case 'NOSTORETOSERVICE': {
        let allSteps = [...orderSteps]
        let step = allSteps[0]
        // step.completed = !step.completed
        allSteps[0] = step
        setOrderSteps(allSteps)
      }
        break;
      case 'NOSTOCKATSTORE': {
        let allSteps = [...orderSteps]
        let step = allSteps[0]
        // step.completed = !step.completed
        allSteps[0] = step
        setOrderSteps(allSteps)
      }
        break;
      case 'ASSIGNED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'SAPPICKPASS':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'SAPPICKFAIL':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'PICKPASS':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'PICKFAIL':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'QCFAIL':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'QCPASS':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'DELIVERYMODIFIED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'CANCELLED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'WAITING_FOR_INVOICE':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'READY_TO_INVOICE':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'INVOICED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'PACKED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[1]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'REPRINTINVOICE':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          // step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'SHIPPED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          let step1 = allSteps[1]
          let step2 = allSteps[2]
          // step.completed = !step.completed
          step1.completed = !step1.completed
          step2.completed = !step2.completed
          allSteps[0] = step
          allSteps[1] = step1
          allSteps[2] = step2
          setOrderSteps(allSteps)
        }
        break;
      case 'READYFORCUSTOMERPICK':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          let step1 = allSteps[1]
          let step2 = allSteps[2]
          // step.completed = !step.completed
          step1.completed = !step1.completed
          step2.completed = !step2.completed
          allSteps[0] = step
          allSteps[1] = step1
          allSteps[2] = step2
          setOrderSteps(allSteps)
        }
        break;
      case 'CUSTOMERPICKCOMPLETE':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          let step1 = allSteps[1]
          let step2 = allSteps[2]
          let step3 = allSteps[3]
          // step.completed = !step.completed
          step1.completed = !step1.completed
          step2.completed = !step2.completed
          step3.completed = !step3.completed
          allSteps[0] = step
          allSteps[1] = step1
          allSteps[2] = step2
          allSteps[3] = step3
          setOrderSteps(allSteps)
        }
        break;
      case 'CANDIDATE_FOR_RTO':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_CONFIRMED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_INTRANSIT':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_REATTEMPT':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'DELIVERED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          let step1 = allSteps[1]
          let step2 = allSteps[2]
          let step3 = allSteps[3]
          // step.completed = !step.completed
          step1.completed = !step1.completed
          step2.completed = !step2.completed
          step3.completed = !step3.completed
          allSteps[0] = step
          allSteps[1] = step1
          allSteps[2] = step2
          allSteps[3] = step3
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_DELIVERED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_COMPLETED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_RECEIVED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_COMPLETE_INTACT':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RTO_COMPLETE_DAMAGED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;
      case 'RETURNED':
        {
          let allSteps = [...orderSteps]
          let step = allSteps[0]
          step.completed = !step.completed
          allSteps[0] = step
          setOrderSteps(allSteps)
        }
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className="order_Details_Wrapper">
          <div className="order_Details_Header section_Wrapper">
            <p className='header_Order_Status'>Arriving on 25th February</p>
            <p className='header_Order_Number'>Order Number : {product.itemId} </p>
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