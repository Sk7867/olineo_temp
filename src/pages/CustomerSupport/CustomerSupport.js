import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//CSS
import './CustomerSupport.css'

//Images
import walletIconBlue from '../../assets/vector/wallet_outline_blue.svg'
import deliveryQueryIconBlue from '../../assets/vector/delivery_related_query.svg'
import cartDashIconBlue from '../../assets/vector/remove_shopping_cart.svg'
import queryCircleIconBlue from '../../assets/vector/question_circle_outline.svg'
import truckIconBlue from '../../assets/vector/truck_outline_blue.svg'
import queryWriteIconBlue from '../../assets/vector/contact_support.svg'
import arrowRightBlue from '../../assets/vector/arrow_right_blue.svg'
import arrowLeftBlack from '../../assets/vector/arrow_left_black.svg'


const CustomerSupport = ({ setHeaderData }) => {
  const [option, setOption] = useState(0);
  const nav = useNavigate()

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

  const supportOptions = [
    {
      image: walletIconBlue,
      title: 'Payment related queries',
      link: '/',
    },
    {
      image: deliveryQueryIconBlue,
      title: 'Delivery related enquiries',
      link: '/',
    },
    {
      image: cartDashIconBlue,
      title: 'Cancellations and returns',
      link: '/',
    },
    {
      image: queryCircleIconBlue,
      title: 'General questions',
      link: '/',
    },
    {
      image: truckIconBlue,
      title: 'Placing an order',
      link: '/',
    },
  ]

  const quesryAnswers = [
    {},
    {
      id: 1,
      heading: 'Payment related enquiries',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
    {
      id: 2,
      heading: 'Delivery related enquiries',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
    {
      id: 3,
      heading: 'Cancellations and returns',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
    {
      id: 4,
      heading: 'General questions',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
    {
      id: 5,
      heading: 'Placing an order',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
    {
      id: 6,
      heading: 'Placing an order',
      desc: 'Nunc, eget nulla sed tellus volutpat tempor lorem aenean hendrerit commodo consectetur amet varius integer sit non consequat, nibh id amet ornare varius velit nulla at vel etiam commodo, porttitor lobortis at senectus volutpat non viverra sit hendrerit quisque sit aliquam magna in augue lectus morbi praesent rhoncus dictumst condimentum ac sit commodo montes, odio pulvinar pretium enim, ante massa '
    },
  ]

  const optionSelected = (num) => {
    setOption(num)
    // console.log(num);
  }

  return <>
    <div className='page_Wrapper page_Margin_Top_Secondary'>

      <div className="options_Container">
        <div className={`options_Header ${option !== 0 ? 'option_Slide' : ''}`}>
          <p>FAQ’S</p>
        </div>
        <div className={`profile_Options support_Options ${option !== 0 ? 'option_Slide' : ''}`}>
          {
            supportOptions.map((option, index) => (
              <div className={`profile_Option `} key={index} onClick={() => optionSelected(index + 1)} >
                <div>
                  <img src={option.image} alt="" />
                  <p>{option.title}</p>
                </div>
                <img src={arrowRightBlue} alt="" className='profile_arrow' />
              </div>
            ))
          }
        </div>

        <div className={`support_Query_Answer ${option !== 0 ? 'query_Active' : ''}`}>
          <div className="support_Query_Heading">
            <img src={arrowLeftBlack} alt="" onClick={() => setOption(0)} /><p>{quesryAnswers[option].heading}</p>
          </div>
          <p className="support_Query_Desc">
            {quesryAnswers[option].desc}
          </p>
        </div>
      </div>

      <div className='support_Extra_Option section_Wrapper' onClick={() => nav('/write-to-us')}>
        <div>
          <img src={queryWriteIconBlue} alt="" />
          <p>Other issues! write to us</p>
        </div>
        <img src={arrowRightBlue} alt="" className='profile_arrow' />
      </div>
    </div>
  </>;
};

export default CustomerSupport;
