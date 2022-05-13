import React, { useEffect } from 'react';
import AddressForm from '../../components/AddressForm/AddressForm';

const NewAddress = ({ setHeaderData }) => {
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'New Address',
      categoriesCond: false,
    })
  }, []);
  return (
    <>
      <div className="page_Wrapper page_Margin_Top_Secondary">
        <AddressForm fromProfile={false} />
      </div>
    </>
  )
};

export default NewAddress;
