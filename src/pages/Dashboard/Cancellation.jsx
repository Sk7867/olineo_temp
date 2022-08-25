import { faCancel, faCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { deletPayment, getAllPayment, updatePayment } from '../../api/AdminApis/PaymentsApi';
import DashboardLoader from '../../components/DashboardContent/DashboardLoader';

const Cancellation = () => {
  const [loader, setLoader] = React.useState(false);

  const [payments, setPayments] = React.useState([])
  React.useEffect(() => {
    setLoader(true);
    getAllPayment()
      .then(res => {
        setPayments(res.payments);
        setLoader(false);
      })
  }, []);
  console.log(payments);
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
      <div className="d-flex justify-content-between">
        <h3>Order Cancellation</h3>
      </div>
      <ListGroup as="ol" numbered>
        {
          loader ? <DashboardLoader /> :
            payments?.length > 0 && payments?.map((item, index) => (
              <ListGroup.Item
                key={index}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div><span className="fw-bold">Amount:</span> {item.amount}</div>
                  <span className='fw-bold'> Payment Success:</span>  {item.isSuccess ? "Yes" : "No"}
                </div>
                <div>
                  <button className='btn' onClick={() => handleUpdatePayment(item._id, item.isSuccess)} >
                    {
                      item.isSuccess ? <>
                        <span className='fw-bold'>Make payment UnPaid:&nbsp;</span>
                        <FontAwesomeIcon
                          className={"table-icon"}
                          icon={faCancel}
                        />
                      </> : <>
                        <span className='fw-bold'>Make payment success:&nbsp;</span>
                        <FontAwesomeIcon
                          className={"table-icon"}
                          icon={faCheck}
                        /></>
                    }
                  </button>
                  <button onClick={() => handleDeletPayement(item._id)} className='btn'><FontAwesomeIcon className={"table-icon"} icon={faTrashCan} /></button>
                </div>
              </ListGroup.Item>

            ))}
      </ListGroup>
    </div>
  );
};

export default Cancellation;