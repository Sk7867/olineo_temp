import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import "./styles/dashboardDiscount.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCupon, getSingleCupon } from "../../api/AdminApis/Cupon";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import Moment from "react-moment";
import EditCuponModal from "../../components/EditCuponModal/EditCuponModal";
import axios from "axios";

function DashboardDiscount(props) {
  const [activeList, setActiveList] = useState({ name: "all" });
  const [cupon, setCupon] = useState([]);
  const [show, setShow] = useState(false);
  const [singleCoupn, setSingleCoupn] = useState([]);

  const nav = useNavigate()

  const handleActiveListStyle = (name) => {
    setActiveList({ name });
  };

  useEffect(() => {
    getCupon()
      .then(res => {
        setCupon(res.data.coupon);
      })
  }, [])
  const handleEdit = (code) => {
    console.log(code);
    getSingleCupon(code)
      .then((res) => {
        setSingleCoupn(res.data.coupon);
      })
    setShow(true);
  }

  const deletCoupon = async (id) => {
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/coupon/${id}`)
        .then(res => {
          setCupon(cupon.filter(message => message._id !== id));
        })
    } else {
      alert("User save!")
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h3>Discount codes</h3>
        <Button onClick={() => nav("/admin-add-discount")} className="btn-sm">Create discount code</Button>
      </div>
      {/* nav list toggle */}
      <div className="card-body bg-light shadow-sm">
        <>
          <ListGroup
            className="list-group-horizontal"
            style={{ borderRadius: 0 }}
          >
            <ListGroup.Item
              onClick={() => handleActiveListStyle("all")}
              className={
                activeList?.name === "all"
                  ? "border-primary borderless btn border-bottom"
                  : "borderless btn border-bottom"
              }
            >
              All
            </ListGroup.Item>
            {/* <ListGroup.Item
              onClick={() => handleActiveListStyle("active")}
              className={
                activeList?.name === "active"
                  ? "border-primary borderless btn border-bottom"
                  : "borderless btn border-bottom"
              }
            >
              Active
            </ListGroup.Item> */}
            {/* <ListGroup.Item
              onClick={() => handleActiveListStyle("scheduled")}
              className={
                activeList?.name === "scheduled"
                  ? "border-primary borderless btn border-bottom"
                  : "borderless btn border-bottom"
              }
            >
              Scheduled
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => handleActiveListStyle("expired")}
              className={
                activeList?.name === "expired"
                  ? "border-primary borderless btn border-bottom"
                  : "borderless btn border-bottom"
              }
            >
              Expired
            </ListGroup.Item> */}
          </ListGroup>
        </>
        <div className="input-group mt-2 mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Search
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search discount code"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {/* table / list  */}
        <>
          <EditCuponModal
            show={show}
            onHide={() => setShow(false)}
            data={singleCoupn}
          />
          {cupon === undefined ? <DashboardLoader /> :
            cupon.map((data, index) => (
              <ListGroup as="ol" numbered>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                  <input className="form-check-input me-1" type={"checkbox"} />
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Discount :&nbsp;{data.discount} <br /> {data.code ? `Code: ${data.code}` : "Code: Not set"}</div>
                    MaxAmount:&nbsp;{data.maxAmount}
                    <div>
                      Product EAN:&nbsp; {data.products.map(item => (
                        item
                      ))}
                    </div>
                  </div>
                  <div>
                    <Badge bg="primary" pill>
                      Expire at: <Moment format="DD/MM/YYYY">
                        {data.expire}
                      </Moment>
                    </Badge>
                  </div>
                  <div className="ms-2">
                    <button className="btn p-0" onClick={() => handleEdit(data.code)}>
                      <FontAwesomeIcon
                        className={"table-icon"}
                        icon={faPenToSquare}
                      /></button>
                    <button
                      className="btn p-0"
                      onClick={() => deletCoupon(data._id)}
                    >
                      <FontAwesomeIcon className={"table-icon"} icon={faTrashCan} />
                    </button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            ))
          }

        </>
      </div>
    </div>
  );
}

export default DashboardDiscount;
