import React from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';

const OrderProductModal = (props) => {
  const { orderItem, userDetails } = props;
  console.log(orderItem);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        // centered
        className=''
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Ordered Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row mt-2 mb-4'>
            <p className='fw-bold fa-lg'>User Details</p>
            <div class="row p-2">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0 fw-bold">{userDetails?.fullName}</p>
              </div>
            </div>
            <hr />
            <div class="row p-2">
              <div class="col-sm-3">
                <p class="mb-0">Email Id</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0 fw-bold">{userDetails?.email}</p>
              </div>
            </div>
            <hr />
            <div class="row p-2">
              <div class="col-sm-3">
                <p class="mb-0">Contact Number</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0 fw-bold">{userDetails?.mobileNumber}</p>
              </div>
            </div>
            <hr />
          </div>
          <div className='row'>
            <p className='fw-bold fa-lg'>Product Details</p>
            <ListGroup as="ol" numbered>
              <ListGroup.Item>
                <div className="ms-2 me-auto d-flex align-items-center">
                  <div className="fw-bold">Product Name</div>
                  <div className="fw-bold mx-4">Consignment id</div>
                  <div className="fw-bold">Delivery Status</div>
                </div>
              </ListGroup.Item>
              {
                (orderItem?.productDetails?.length === 0) ||
                  (orderItem?.productId?.length === 0) ||
                  (orderItem?.itemId?.length === 0)
                  ? <p className='d-flex justify-content-center align-items-center p-3'>Product Details Not Available</p> :
                  orderItem?.productId?.map((prod, index) => (
                    orderItem.itemId.map((item, idx) => (
                      orderItem.item[index] > idx ? (<>
                        <ListGroup.Item
                          key={index}
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto d-flex align-items-center">
                            <div className="fw-bold">{orderItem?.productDetails[index]?.name}</div>
                            <div className="fw-bold mx-4">{item}</div>
                            <div className="fw-bold">{orderItem?.itemStatus[index]}</div>
                          </div>
                        </ListGroup.Item>
                      </>
                      ) : (<></>)
                    ))
                  ))
              }
            </ListGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderProductModal;