import React from 'react'
import { Modal } from 'react-bootstrap';
import './Modal.css'

//Images
import locationBlue from '../../assets/vector/location_blue.svg'
import navigationBlue from '../../assets/vector/navigation_outline_blue.svg'

const ModalComp = ({ modalShow, setModalShow }) => {
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
            <h4 className="modal_heading">Choose your location</h4>
            <p className="modal_header_desc">Select location to see product availability and delivery options.</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <button type='submit' className='submit-button'><p>Sign in to see your address</p></button>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal_footer_link">
            <img src={locationBlue} alt="" />
            <p>Enter pincode</p>
          </div>
          <div className="modal_footer_link">
            <img src={navigationBlue} alt="" />
            <p>Use current location</p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComp
