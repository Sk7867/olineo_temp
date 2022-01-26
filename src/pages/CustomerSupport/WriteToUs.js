import React from 'react';
//CSS
import './CustomerSupport.css'

//Components
import Footer from '../../components/Footer/Footer';
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2';

//Images
import arrowLeftBlack from '../../assets/vector/arrow_left_black.svg'

const WriteToUS = () => {
  return <>
    <HeaderBar2 header3={true} headerText={'Customer Support'} categoriesPart={false} />
    <div className='page_Wrapper support_Page_Wrapper'>
      <div className="customer_Support_Container">
        <form action="" className="customer_Support_Form">
          <p className="support_Form_Heading"><span><img src={arrowLeftBlack} alt="" /></span> Write to us</p>
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
    <Footer />
  </>;
};

export default WriteToUS;
