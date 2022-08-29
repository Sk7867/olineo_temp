import React from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';

const CancelationProductModal = (props) => {
  const { orderItem } = props;
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className=''
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            orderItem?.productDetails?.length === 0 ? <p>Not Orderd</p> :
              orderItem?.productDetails?.map((item, index) => (
                <div className="ms-2 me-auto d-flex justify-content-between align-items-center">
                  <div className='d-flex'>
                    <div className="fw-bold me-3">{item.name}</div>
                    <div className='fw-bold'>{item.color}</div>
                  </div>
                  <div>
                    <img src={item.image} width={100} alt="" />
                  </div>
                </div>
              ))
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CancelationProductModal;