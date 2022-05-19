import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Update from './Update';

const UpdateNumber = (props) => {
  const { setHeaderData, modalDataMobile } = props
  const loc = useLocation()
  // console.log(modalDataMobile);
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Update Phone Number',
      categoriesCond: false,
    })
  }, []);
  return (
    <>
      <Update number={true} oldInfo={modalDataMobile.oldData.user_ph_Number} newInfo={modalDataMobile.newData.user_ph_Number} />
    </>
  )
};

export default UpdateNumber;
