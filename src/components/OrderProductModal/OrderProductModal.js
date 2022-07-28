import React from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';

const OrderProductModal = (props) => {
  const { orderItem } = props;
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=''
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ordered Products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup as="ol" numbered>
            {
              orderItem?.productDetails?.length === 0 ? <p>Not Orderd</p> :
                orderItem?.productDetails?.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.name}</div>
                    </div>
                    {/* <Badge bg="primary" pill>
                                            14
                                        </Badge> */}
                  </ListGroup.Item>
                ))
            }
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderProductModal;