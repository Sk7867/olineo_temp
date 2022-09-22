import React, { useEffect, useState } from "react";
import { getAdminAllOrder } from "../../api/AdminApis/AdminOrder";
import { getAllStore } from "../../api/AdminApis/AdminStore";
import { allUsers } from "../../api/AdminApis/Users";
import { getAllOrder } from "../../api/OrdersApi";
import { getAllProducts } from "../../api/Product";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import "./styles/dashboardHome.css"

function DashBoardHome(props) {
  const [order, setOrder] = useState(0);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(0);
  const [products, setProducts] = useState(0)
  const [stores, setStores] = useState(0)
  useEffect(() => {
    setLoader(true);
    getAdminAllOrder().then((res) => {
      setOrder(res?.total_orders);
      setLoader(false);
    });
  }, []);
  useEffect(() => {
    setLoader(true);
    allUsers().then((res) => {
      setUser(res.total_users);
      setLoader(false);
    })
  }, []);
  useEffect(() => {
    setLoader(true)
    getAllProducts().then((res) => {
      setProducts(res.total_products)
      setLoader(false)
    })
  }, [])
  useEffect(() => {
    setLoader(true)
    getAllStore().then(res => {
      setStores(res.total_stores)
      setLoader(false)
    })
  }, [])


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
            <span className="count-numbers">{loader ? <DashboardLoader /> : products}</span>
            <span className="count-name">Products</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter success">
            <i className="fa fa-database"></i>
            <span className="count-numbers">{loader ? <DashboardLoader /> : stores}</span>
            <span className="count-name">Stores</span>
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
