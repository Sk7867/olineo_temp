import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

//CSS
import './Modal.css'

//Images
import locationBlue from '../../assets/vector/location_blue.svg'
import navigationBlue from '../../assets/vector/navigation_outline_blue.svg'
import { UserDataContext } from '../../Contexts/UserContext';

const CommonModal = ({ ModalHeaderComp, ModalBodyComp, ModalFooterComp, modalShow, setModalShow, }) => {
  // console.log(ModalHeaderComp);

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
        {ModalHeaderComp && (
          <Modal.Header closeButton>
            <ModalHeaderComp />
          </Modal.Header>
        )}
        {ModalBodyComp && (
          <Modal.Body>
            <ModalBodyComp />
          </Modal.Body>
        )}
        {ModalFooterComp && (
          <Modal.Footer closeButton>
            <ModalFooterComp />
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default CommonModal