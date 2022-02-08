import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Update from './Update';

const UpdateNumber = (props) => {
  const { setHeaderText, setHeader3Cond, modalDataMobile } = props
  const loc = useLocation()
  console.log(modalDataMobile);
  useEffect(() => {
    setHeaderText('Update Phone Number')
    setHeader3Cond(true)
  }, []);
  return (
    <>
      <Update number={true} oldInfo={modalDataMobile.oldData.user_ph_Number} newInfo={modalDataMobile.newData.user_ph_Number} />
    </>
  )
};

export default UpdateNumber;
