import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { getUserLocation } from '../../api/Auth';

const BankOfferModal = ({ modalShow, setModalShow, offerModalData }) => {
  let modalData = offerModalData.offerAvail.split('~')

  // console.log(offerModalData);
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
          <div className="header_content">
            <h4 className="bank_Offer_Heading">Bank Offer</h4>
            <p className="bank_Offer_Desc">{offerModalData.offerName}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="offer_Question">
            How to avail offer?
          </p>
          <ul className='offer_Conditions_List'>
            {
              modalData.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BankOfferModal