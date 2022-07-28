import React, { useEffect, useState } from "react";
import { getAdminAllOrder } from "../../api/AdminApis/AdminOrder";
import { allUsers } from "../../api/AdminApis/Users";
import { getAllOrder } from "../../api/OrdersApi";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import "./styles/dashboardHome.css"

function DashBoardHome(props) {
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState([]);
  useEffect(() => {
    setLoader(true);
    getAdminAllOrder().then((res) => {
      setOrder(res.no_of_orders);
      setLoader(false);
    });
  }, []);
  useEffect(() => {
    setLoader(true);
    allUsers().then((res) => {
      setUser(res.no_of_users);
      setLoader(false);
    })
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card-counter primary">
            <i className="fa fa-code-fork"></i>
            <span className="count-numbers">{loader ? <DashboardLoader /> : order}</span>
            <span className="count-name">Total Orders</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter danger">
            <i className="fa fa-ticket"></i>
            <span className="count-numbers">599</span>
            <span className="count-name">Instances</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter success">
            <i className="fa fa-database"></i>
            <span className="count-numbers">6875</span>
            <span className="count-name">Data</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{loader ? <DashboardLoader /> : user}</span>
            <span className="count-name">Users</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHome;
