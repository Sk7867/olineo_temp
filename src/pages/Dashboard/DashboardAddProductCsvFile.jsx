import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import './styles/dashAddproduct.css'


//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BulkUploadSection from '../CataloguePage/BulkUploadSection';

const DashboardAddProductCsvFile = () => {

  return (
    <>
      <div className='container'>
        <Link to="/admin-products">
          <FontAwesomeIcon icon={faChevronLeft} /> Products
        </Link>
        <BulkUploadSection />
      </div>
    </>
  )
}

export default DashboardAddProductCsvFile