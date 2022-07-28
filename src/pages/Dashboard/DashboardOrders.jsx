import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { deletAdminIndOrder, getAdminAllOrder, getAdminIndOrder } from "../../api/AdminApis/AdminOrder";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import OrderProductModal from "../../components/OrderProductModal/OrderProductModal";

function DashboardOrders(props) {
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [orderItem, setOrderItem] = useState();
  useEffect(() => {
    setLoader(true);
    getAdminAllOrder().then((res) => {
      setOrder(res.orders);
      setLoader(false);
    })
  }, []);

  const seeProduct = (id) => {
    getAdminIndOrder(id)
      .then(res => setOrderItem(res.order))
    setShow(true);

  }
  const deletOrder = (id) => {
    deletAdminIndOrder(id)
      .then((res) => {
        setOrder(order.filter(message => message._id !== id));
      })
  }
  return loader ? (
    <DashboardLoader />
  ) : (

    <div className="container">
      <OrderProductModal
        show={show}
        onHide={() => setShow(false)}
        orderItem={orderItem}
      />
      <div className="d-flex justify-content-between">
        <h3>Orders</h3>
        {/* <Button
          className="btn-sm"
          onClick={() => nav("/admin-add-product")}
          style={{ marginBottom: 20 }}
        >
          Add product
        </Button> */}
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Product</th>
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
                {/* {setOrderItem(item.productId)} */}
                <td className="text-primary" style={{ cursor: "pointer" }} onClick={() => seeProduct(item._id)}>See products</td>
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
    </div>
  );
}

export default DashboardOrders;
