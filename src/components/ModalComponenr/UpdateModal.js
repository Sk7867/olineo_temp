import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Update from '../../pages/EditAccount/Update';

const UpdateModal = ({ showModal, setShowModal, modalData }) => {
  const handleClose = () => setShowModal(false);
  const [oldInfo, setOldInfo] = useState(null);
  const [newInfo, setNewInfo] = useState(null);

  useEffect(() => {
    if (modalData) {
      if (modalData.number) {
        setOldInfo(modalData.oldData.user_ph_Number)
        setNewInfo(modalData.newData.user_ph_Number)
      }
      if (!modalData.number) {
        setOldInfo(modalData.oldData.user_Email)
        setNewInfo(modalData.newData.user_Email)
      }
    }
  }, [modalData]);


  // console.log(modalData);
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
        backdropClassName='backdrop_active'
      >
        <Modal.Header closeButton className='update_Heading'>
          <div className="header_content">
            {
              modalData.number ? (
                <h4 className="modal_heading">Update Phone Number</h4>
              ) : (
                <h4 className="modal_heading">Update Email Address</h4>
              )
            }
          </div>
        </Modal.Header>
        <Modal.Body>
          <Update number={modalData.number} oldInfo={oldInfo} newInfo={newInfo} user_Full_Name={modalData.userName} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
};

export default UpdateModal;
