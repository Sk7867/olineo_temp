import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { getUserLocation } from '../../api/Auth';
import useGeolocation from '../../hooks/useGeolocation';

//CSS
import './Modal.css'

//Images
import locationBlue from '../../assets/vector/location_blue.svg'
import navigationBlue from '../../assets/vector/navigation_outline_blue.svg'
import { UserDataContext } from '../../Contexts/UserContext';

const MultiOfferModal = ({ modalShow, setModalShow, allProducts }) => {
  const handleClose = () => setModalShow(false);
  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
        backdropClassName='backdrop_active'
      >
        <Modal.Header closeButton>
          <h5>Add Offers to Multiple Products</h5>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MultiOfferModal