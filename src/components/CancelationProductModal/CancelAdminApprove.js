import React, { useEffect, useState } from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';

const CancelAdminApprove = (props) => {
  const { orderItem, cancelObj, setShowSecModal, setDelCharges, delCharges, handleApproveCancel } = props
  const [btnDisabled, setbtnDisabled] = useState(true)

  useEffect(() => {
    if (delCharges) {
      setbtnDisabled(false)
    }
  }, [delCharges])

  const onHide = () => setShowSecModal(false)

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className=''
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cancel Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            orderItem?.productDetails?.length === 0 ? <p>Not Orderd</p> :
              orderItem?.productDetails?.map((item, index) => (
                <>
                  <div className="d-flex align-items-start gap-5">
                    <div>
                      <img src={item.image} width={150} alt="" />
                    </div>
                    <div className='d-flex flex-column gap-2'>
                      <div>Product Name: <span className="fw-bold">{item.name}</span></div>
                      <div>Product Color: <span className="fw-bold">{item.color}</span></div>
                      <div>Product Price: <span className="fw-bold">₹{orderItem?.productPrice[0]}</span></div>
                    </div>
                    <div className='d-flex flex-column gap-1'>
                      <div className="fw-bold">Reason:</div>
                      <div>{cancelObj?.reason}</div>
                    </div>
                  </div>
                  <div className='form-group d-flex flex-column gap-3 align-items-start justify-content-center'>
                    <label htmlFor="reason" className='d-flex gap-2 align-items-center text-wrap'>
                      Reason: <input type="text" name='reason' id='reason' placeholder='Enter Reason' class="form-control w-75" />
                    </label>
                    <label htmlFor="deliveryCharges" className='d-flex gap-2 align-items-center text-wrap'>
                      Delivery Charges:
                      <input
                        type="text"
                        name='deliveryCharges'
                        id='deliveryCharges'
                        placeholder='Enter Delivery Charges'
                        value={delCharges}
                        class="form-control w-75"
                        onChange={(e) => setDelCharges(e.target.value)}
                      />
                    </label>
                    <div className='d-flex gap-2 align-items-center text-wrap'>
                      Enter Bearer: <input type="text" name='bearer' id='bearer' placeholder='Enter Bearer' class="form-control w-75" />
                    </div>
                  </div>
                  <div className='d-flex w-100 align-items-center justify-content-center gap-3 mt-4'>
                    <button className='btn btn-danger' onClick={onHide}>Cancel</button>
                    <button className='btn btn-success' disabled={btnDisabled} onClick={() => handleApproveCancel(cancelObj._id)}>Submit</button>
                  </div>
                </>
              ))
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CancelAdminApprove;