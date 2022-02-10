import React, { useState, useEffect } from 'react';
import Update from './Update';

const UpdateEmail = (props) => {
  const { setHeaderData, modalDataMobile } = props
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Update Email Address',
      categoriesCond: false,
    })
  }, []);
  return (
    <>
      <Update number={false} oldInfo={modalDataMobile.oldData.user_Email} newInfo={modalDataMobile.newData.user_Email} />
    </>
  )
};

export default UpdateEmail;
