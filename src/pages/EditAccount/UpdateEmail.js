import React, { useState, useEffect } from 'react';
import Update from './Update';

const UpdateEmail = (props) => {
  const { setHeaderText, setHeader3Cond, modalDataMobile } = props
  useEffect(() => {
    setHeaderText('Update Email Address')
    setHeader3Cond(true)
  }, []);
  return (
    <>
      <Update number={false} oldInfo={modalDataMobile.oldData.user_Email} newInfo={modalDataMobile.newData.user_Email} />
    </>
  )
};

export default UpdateEmail;
