import React, { useEffect } from 'react';
import AddressForm from '../../components/AddressForm/AddressForm';

const NewAddress = ({ setHeaderText, setHeader3Cond }) => {
  useEffect(() => {
    setHeaderText('New Address')
    setHeader3Cond(true)
  }, []);
  return (
    <>
      <div className="page_Wrapper">
        <AddressForm />
      </div>
    </>
  )
};

export default NewAddress;
