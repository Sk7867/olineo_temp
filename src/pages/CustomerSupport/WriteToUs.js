import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { writeToUS } from '../../api/CustomerSupport';
import { Slide, toast, ToastContainer } from 'react-toastify'
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './CustomerSupport.css'

//Components

//Images
import arrowLeftBlack from '../../assets/vector/arrow_left_black.svg'
import phoneIconBlue from '../../assets/vector/phone_outline_blue.svg'


toast.configure()
const WriteToUS = ({ setHeaderData }) => {
  const nav = useNavigate()
  const [queryData, setQueryData] = useState({
    fullName: '',
    email: '',
    query: '',
  })
  const { userContext, setUserContext, userAddress, setUserAddress, setUserCart } = useContext(UserDataContext)

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Customer Support',
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    writeToUS(queryData)
      .then(res => res ? (
        setQueryData({
          fullName: '',
          email: '',
          query: ''
        }),
        toast.success('Query Received'))
        : toast.error('Something Went Wrong. Try Again Later')
      )
  }
  // console.log(queryData);

  const handleInput = (prop, e) => {
    e.target
      ? setQueryData({ ...queryData, [prop]: e.target.value })
      : setQueryData({ ...queryData, [prop]: e.label })
  }

  return <>
    <div className='page_Wrapper support_Page_Wrapper page_Margin_Top_Secondary'>
      <div className="customer_Support_Container">
        <div className="contact_Phone_Container tab_None">
          <div className="contact_Phone_Details">
            <p>Call our customer executive</p>
            <p>6390063900</p>
          </div>
          <a href="tel:+91-63900-63900" className="contact_Phone_Icon">
            <img src={phoneIconBlue} alt="" />
          </a>
        </div>
        <form className="customer_Support_Form" onSubmit={handleSubmit}>
          <p className="support_Form_Heading"><span><img src={arrowLeftBlack} alt="" onClick={() => nav('/customer-support')} /></span> Write to us</p>

          <input type="text" name="Name" id="Name" placeholder='Your Name' className='support_Form_Input' value={queryData.fullName} onChange={(value) => handleInput("fullName", value)} />
          <input type="text" name='Email' id='Email' placeholder='Your Email' className='support_Form_Input' value={queryData.email} onChange={(value) => handleInput("email", value)} />
          <textarea type="text" name='Query' id='Query' placeholder='Write your queries' className='support_Form_Input support_Form_Query' value={queryData.query} onChange={(value) => handleInput("query", value)} />
          <div className='support_Form_Submit_Container'>
            <button type='submit' className='submit-button support_Form_Submit'><p>Submit</p></button>
          </div>

        </form>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  </>;
};

export default WriteToUS;
