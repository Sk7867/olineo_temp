import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import './styles/dashAddproduct.css'


//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AddProductSection from '../CataloguePage/AddProductSection';

const DashboardAddProduct = () => {

  return (
    <>
      <div className="container">
        <Link to="/admin-products">
          <FontAwesomeIcon icon={faChevronLeft} /> Products
        </Link>
        <AddProductSection />
      </div>
    </>
  )
}

export default DashboardAddProduct