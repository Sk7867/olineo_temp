import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { deletAdminIndOrder, getAdminAllOrder, getAdminIndOrder } from "../../api/AdminApis/AdminOrder";
import { singleUSer } from "../../api/AdminApis/Users";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import OrderProductModal from "../../components/OrderProductModal/OrderProductModal";
import Pagination from "../../components/Pagination/Pagination";

function DashboardOrders(props) {
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [orderItem, setOrderItem] = useState();
  const [userDetails, setUserDetails] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const [totalOrders, setTotalOrders] = useState(1)
  useEffect(() => {
    setLoader(true);
    getAdminAllOrder(`limit=${productsPerPage}&page=${currentPage}`).then((res) => {
      if (res) {
        setOrder(res.orders);
        setTotalOrders(res.total_orders)
        setLoader(false);
      }
    })
  }, [currentPage]);

  const seeProduct = (id) => {
    let seeProdBtn = document.querySelectorAll('#seeProducts')
    seeProdBtn.forEach((btn) => {
      btn.style.pointerEvents = "none"
    })
    getAdminIndOrder(id)
      .then(res1 => {
        if (res1) {
          singleUSer(res1.order.userId)
            .then(res => {
              if (res) {
                setUserDetails(res.user)
                setOrderItem(res1.order)
                setShow(true);
                seeProdBtn.forEach((btn) => {
                  btn.style.pointerEvents = 'auto'
                })
              }
            })
        }
      })
  }
  const deletOrder = (id) => {
    deletAdminIndOrder(id)
      .then((res) => {
        if (res) {
          setOrder(order.filter(message => message._id !== id));
        }
      })
  }
  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }
  return loader ? (
    <DashboardLoader />
  ) : (

    <div className="container">
      <OrderProductModal
        show={show}
        onHide={() => setShow(false)}
        orderItem={orderItem}
        userDetails={userDetails}
      />
      <div className="d-flex justify-content-between">
        <h3>Orders</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Order Id</th>
              <th scope="col">Paid</th>
              <th scope="col">Price</th>
              <th scope="col">Placed</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {order?.length > 0 && order?.map((item, index) => (
              <tr key={index}>
                <td className="text-primary" style={{ cursor: "pointer" }} onClick={() => seeProduct(item._id)} id='seeProducts'>See products</td>
                <td>{item?._id}</td>
                <td> {(item?.isPaid) ? "Paid" : "Not Paid"} </td>
                <td>{item?.totalPrice}</td>
                <td>{(item?.isPlaced) ? "Placed" : "Not Placed"}</td>
                <td>
                  <Moment format="DD/MM/YYYY hh:mm">
                    {item?.createdAt}
                  </Moment>
                </td>
                <td>
                  {/* <button className="btn p-0">
                    <FontAwesomeIcon
                      className={"table-icon"}
                      icon={faPenToSquare}
                    /></button> */}
                  <button
                    className="btn p-0"
                    onClick={() => deletOrder(item._id)}
                  >
                    <FontAwesomeIcon className={"table-icon"} icon={faTrashCan} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination_Container">
        <Pagination productsPerPage={productsPerPage} totalProducts={totalOrders} pageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default DashboardOrders;
