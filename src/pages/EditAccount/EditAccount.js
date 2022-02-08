import React, { useState, useEffect } from 'react';

//CSS
import './EditAccount.css'

//Components
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2';
import EditDetails from './EditDetails';


const EditAccont = ({ setHeaderText, setHeader3Cond, userDetails, setModalDataMobile }) => {

  useEffect(() => {
    setHeaderText('Edit My Account Details')
    setHeader3Cond(true)
  }, []);

  return <>
    <EditDetails userDetails={userDetails} setModalDataMobile={setModalDataMobile} />
  </>;
};

export default EditAccont;
