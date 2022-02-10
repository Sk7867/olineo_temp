import React, { useState, useEffect } from 'react';

//CSS
import './EditAccount.css'

//Components
import HeaderBar2 from '../../components/HeaderBar2/HeaderBar2';
import EditDetails from './EditDetails';


const EditAccont = ({ setHeaderData, userDetails, setModalDataMobile }) => {

  useEffect(() => {

    setHeaderData({
      header3Cond: true,
      headerText: 'Edit My Account Details',
      categoriesCond: false,
    })
  }, []);

  return <>
    <EditDetails userDetails={userDetails} setModalDataMobile={setModalDataMobile} />
  </>;
};

export default EditAccont;
