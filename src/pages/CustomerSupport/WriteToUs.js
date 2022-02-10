import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//CSS
import './CustomerSupport.css'

//Components

//Images
import arrowLeftBlack from '../../assets/vector/arrow_left_black.svg'
import phoneIconBlue from '../../assets/vector/phone_outline_blue.svg'

const WriteToUS = ({ setHeaderData }) => {
  const nav = useNavigate()

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Customer Support',
      categoriesCond: false,
    })
  }, []);

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
        <form action="" className="customer_Support_Form">
          <p className="support_Form_Heading"><span><img src={arrowLeftBlack} alt="" onClick={() => nav('/customer-support')} /></span> Write to us</p>
          <div className='form_Input_Area'>
            <input type="text" name="Name" id="Name" placeholder='Your Name' className='support_Form_Input' />
            <input type="text" name='Email' id='Email' placeholder='Your Email' className='support_Form_Input' />
            <textarea type="text" name='Query' id='Query' placeholder='Write your queries' className='support_Form_Input support_Form_Query' />
            <div className='support_Form_Submit_Container'>
              <button type='submit' className='submit-button support_Form_Submit'><p>Submit</p></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>;
};

export default WriteToUS;
