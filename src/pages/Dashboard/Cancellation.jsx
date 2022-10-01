import { faCancel, faCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { getAdminIndOrder } from '../../api/AdminApis/AdminOrder';
import { approveCancelation, getAllCancelation } from '../../api/AdminApis/Cancel';
import { deletPayment, getAllPayment, updatePayment } from '../../api/AdminApis/PaymentsApi';
import CancelAdminApprove from '../../components/CancelationProductModal/CancelAdminApprove';
import CancelationProductModal from '../../components/CancelationProductModal/CancelationProductModal';
import DashboardLoader from '../../components/DashboardContent/DashboardLoader';
import OrderProductModal from '../../components/OrderProductModal/OrderProductModal';

const Cancellation = () => {
  const [loader, setLoader] = React.useState(false);
  const [cancellation, setCancellation] = React.useState([])
  const [orderItem, setOrderItem] = React.useState();
  const [cancelObj, setCancelObj] = React.useState();
  const [show, setShow] = React.useState(false);
  const [showSecModal, setShowSecModal] = React.useState(false);
  const [payments, setPayments] = React.useState([])
  const [delCharges, setDelCharges] = React.useState('')
  const [cancelRequest, setCancelRequest] = React.useState([])
  const [cancelProcessed, setCancelProcessed] = React.useState([])
  React.useEffect(() => {
    setLoader(true);
    getAllCancelation()
      .then(res => {
        setCancellation(res.cancellation)
        if (res.no_of_cancellation > 0) {
          let reqCancel = []
          let processCancel = []
          res.cancellation.forEach((item) => {
            if (item.approved) {
              processCancel.push(item)
            } else {
              reqCancel.push(item)
            }
          })
          setCancelRequest(reqCancel)
          setCancelProcessed(processCancel)
        }
        setLoader(false)
      })
  }, []);

  console.log(cancelRequest, cancelProcessed);

  const seeProduct = (id, modalShow = true) => {
    getAdminIndOrder(id)
      .then(res => {
        if (res) {
          setOrderItem(res.order)
        }
      })
    if (modalShow) {
      setShow(true);
    }
  }

  const handleApproveCancel = (id) => {
    console.log(id);
    approveCancelation(id, delCharges)
      .then(res => res ? (
        console.log(res),
        setLoader(true),
        getAllCancelation()
          .then(res => {
            setCancellation(res.cancellation)
            setLoader(false)
            setDelCharges('')
          })
      ) : (''))
  }

  const handleApproveClick = (item) => {
    seeProduct(item.orderId, false)
    setCancelObj(item)
    setShowSecModal(true)
  }

  const handleRejectCancel = (id) => {
    console.log(id);
  }


  const handleDeletPayement = (id) => {
    setLoader(true);
    deletPayment(id)
      .then(res => {
        setPayments(payments.filter(message => message._id !== id));
        setLoader(false)
      })
  }
  const handleUpdatePayment = (id, status) => {
    const data = {
      isSuccess: !status
    }
    updatePayment(id, data)
      .then(res => {
        getAllPayment()
          .then(res => {
            setPayments(res.payments);
          })
      })
  }
  return loader ? (
    <DashboardLoader />
  ) : (
    <div className="container">
      <CancelationProductModal
        show={show}
        onHide={() => setShow(false)}
        orderItem={orderItem}
      />
      <CancelAdminApprove
        show={showSecModal}
        setShowSecModal={setShowSecModal}
        orderItem={orderItem}
        cancelObj={cancelObj}
        setDelCharges={setDelCharges}
        delCharges={delCharges}
        handleApproveCancel={handleApproveCancel}
      />
      <div className="d-flex justify-content-between">
        <h3>Order Cancellation</h3>
      </div>
      <div className='mt-2'>
        <h4>Cancellation Requested</h4>
      </div>
      <ListGroup as="ol">
        {
          loader ? <DashboardLoader /> :
            (cancelRequest?.length > 0) ? (
              cancelRequest?.map((item, index) => (
                <>
                  <ListGroup.Item
                    key={index}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div><span className="fw-bold">Order ID:</span> {item.orderId}</div>
                      <span className='fw-bold'> Item Id</span>  {item.itemId[0]}
                    </div>
                    <div className="ms-2 me-auto">
                      <div><span className="fw-bold">Amount:</span> {item.amount}</div>
                      <td className="text-primary" style={{ cursor: "pointer" }} onClick={() => seeProduct(item.orderId)}>See product</td>
                      {/* <span className='fw-bold'> Payment Success:</span>  {item.isSuccess ? "Yes" : "No"} */}
                    </div>
                    <div className="ms-2 me-auto">
                      <div><span className="fw-bold">Reason:</span> {item.reason}</div>
                      {/* <span className='fw-bold'> Payment Success:</span>  {item.isSuccess ? "Yes" : "No"} */}
                    </div>
                    <div className="ms-2 d-flex justify-content-between align-items-center gap-3">
                      <button className='btn btn-secondary'>Reject</button>
                      <button className='btn btn-primary' onClick={() => handleApproveClick(item)} >Approve</button>
                    </div>
                  </ListGroup.Item>
                </>
              ))) : (
              <>
                <div className='d-flex justify-content-between align-items-center p-3'>
                  <h4 className='fw-bold'>No Request Found</h4>
                </div>
              </>)}
      </ListGroup>
      <div className='mt-5'>
        <h4>Cancellation Processed</h4>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Cancel Id</th>
              <th scope="col">Order Id</th>
              <th scope="col">Item Id</th>
              <th scope="col">Refund Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {(cancelProcessed?.length > 0) ? (
              cancelProcessed?.map((item, index) => (
                <>
                  <tr key={index}>
                    <td> {item?._id} </td>
                    <td>{item?.orderId}</td>
                    <td>{item?.itemId[0]}</td>
                    <td>₹{item?.refundAmt}</td>
                    <td>{item?.approved ? 'Approved' : 'Rejected'}</td>
                    <td className='text-primary pe-auto' onClick={() => seeProduct(item.orderId)}>See Product</td>
                  </tr>
                </>
              ))) : (<>
                <div className='d-flex justify-content-between align-items-center p-3'>
                  <h4 className='fw-bold'>No Data</h4>
                </div>
              </>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cancellation;