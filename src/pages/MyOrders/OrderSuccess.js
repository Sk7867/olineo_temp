import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getAllOrder } from "../../api/OrdersApi";
import checked_circle from "../../assets/vector/check_circle_FILL0_wght400_GRAD200_opsz48.svg";
import processing_gif from "../../assets/gif/processing.gif";

import "./OrderSuccess.css";
const OrderSuccess = ({ setHeaderData }) => {
  //   useEffect(() => {
  //     setHeaderData({
  //       header3Cond: true,
  //       headerText: "My Orders ",
  //       categoriesCond: true,
  //       header3Store: true,
  //       header3Cart: true,
  //       header3Profile: true,
  //     });
  //   }, []);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  console.log(orderId);

  if (!orderId) navigate("/");

  const [loading, setLoading] = useState(true);

  const [allOrders, setAllOrders] = useState({
    loaded: false,
  });
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    getAllOrder().then((res) => {
      if (res) {
        let orders = res.orders.filter((obj) => obj.itemId.length > 0);
        setAllOrders({
          loaded: true,
          orders: orders,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!allOrders.loaded) return;
    if (allOrders.orders.length === 0) return navigate("/orders");
    let order = allOrders.orders.find((order) => order._id === orderId);
    if (!order) return alert("Something went wrong!"), navigate("/orders");
    setCurrentOrder(order);
    setLoading(false);
  }, [allOrders]);

  console.log({ allOrders });
  console.log({ currentOrder });

  return (
    <div className="page_Wrapper ">
      <div className="order_success_wrapper">
        {loading ? (
          <div className="order_proessing">
            <img src={processing_gif} alt="" />
            <img style={{ display: "none" }} src={checked_circle} alt="" />

            <h3>We are processing your order, please wait!</h3>
          </div>
        ) : (
          <div>
            <div className="order_success__head">
              <img src={checked_circle} alt="" />
              <h1>Thank you for your order</h1>
              <h4>Your order has been placed successfully :)</h4>
            </div>
            <hr />
            <div className="order_success__detail">
              <h3>Order Details</h3>
              <p>
                Order number - <u>{currentOrder._id}</u>
              </p>
              {currentOrder.productDetails.map((product, index) => {
                return (
                  <div key={index} className="order_success__product">
                    <img src={product.image} alt="" />
                    <div className="order_success__product__detail">
                      <h5>
                        {product.name} ({currentOrder.item[index]})
                      </h5>
                      <h6>Color - {product.color}</h6>
                      <h6>Price - ₹{currentOrder.productPrice[index]}</h6>
                    </div>
                  </div>
                );
              })}
              <button type="submit" className="submit-button" onClick={() => navigate("/")}>
                <p>Continue Shopping</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
