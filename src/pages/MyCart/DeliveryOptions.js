import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryOptions = ({ setHeaderText, setHeader3Cond, setDeliveryOptionSelected }) => {

  const [selected, setSelected] = useState(null);
  const [disable, setDisable] = useState(true);
  const nav = useNavigate()

  useEffect(() => {
    setHeaderText('Delivery Option')
    setHeader3Cond(true)
  }, []);

  const deliveryOptions = [
    'Pickup from store',
    'Deliver to a location'
  ]

  const handleSelected = (name) => {
    setSelected(name)
    setDeliveryOptionSelected(name)
  }

  // console.log(selected);

  return <>
    <div className='page_Wrapper'>
      <div className='payment_Methods delivery_Options'>
        <form className="payment_Methods_Body">
          {
            deliveryOptions.map((item, index) => (
              <div key={index}>
                <label htmlFor={item} className={`radiobtn-label payment_Methods_Labels  ${selected === item ? ('payment_Methods_Selected') : ('')}`} onClick={() => { handleSelected(item); setDisable(false) }}>
                  <input type="radio" name='delivery' id={item} value={item} />
                  <span className="radio-custom"></span>{item}
                </label>
              </div>
            ))
          }
        </form>
      </div>
      <div className="address_Footer tab_None">
        <button type='submit' className='submit-button' disabled={disable} onClick={() => nav('/payment')}><p>Continue</p></button>
      </div>
    </div>
  </>;
};

export default DeliveryOptions;
