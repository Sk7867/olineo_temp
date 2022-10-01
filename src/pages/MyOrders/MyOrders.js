import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

//CSS
import "./MyOrders.css";

//Images
import product2 from "../../assets/png/product_2.png";

//Components
import Section2 from "../../components/Section2/Section2";
import OrderProductCard from "../../components/OrderProductCard/OrderProductCard";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import OrderSection from "./OrderSection";
import { UserDataContext } from "../../Contexts/UserContext";
import { getAllOrder } from "../../api/OrdersApi";

const MyOrders = ({ ordersList, setHeaderData }) => {
  const [placed, setPlaced] = useState(true);
  const [delivered, setDelivered] = useState(true);
  const [cancelled, setCancelled] = useState(true);
  const { userOrderData, setUserOrderData, allProducts } = useContext(UserDataContext);

  const nav = useNavigate();

  // console.log(placed);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "My Orders ",
      categoriesCond: true,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  useEffect(() => {
    getAllOrder().then((res) => {
      if (res) {
        let orders = [...res.orders];
        let newOrders = orders.filter((obj) => obj.itemId.length > 0);
        setUserOrderData({
          loaded: true,
          no_of_orders: res.no_of_orders,
          orders: newOrders,
        });
      }
    });
  }, []);

  // console.log(ordersList);
  //Test comment to include file in commit - 01/10/2022

  const getRandomProductArr = (arr, num) => {
    const shuffledArr = [...arr].sort(() => 0.5 - Math.random())
    return shuffledArr.slice(0, num)
  }

  const featureProducts = getRandomProductArr(allProducts.products, 10)

  const sec5Data = [
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: product2,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
  ];

  const pageSwitch = (e) => {
    e.preventDefault();
    nav("/");
  };

  const breadCrumbsData = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "My Orders",
      url: "",
    },
  ];

  let ordersNumber = userOrderData.no_of_orders;

  return (
    <>
      {/* <HeaderBar2 header3={true} headerText={'My Orders'} /> */}
      <div className="page_Wrapper page_Margin_Top">
        <BreadCrumbs data={breadCrumbsData} />
        {ordersNumber === 0 ? (
          <>
            <div className="empty_order_sec">
              <p className="empty_order_text">You have no orders</p>
              <button type="submit" className="submit-button" onClick={pageSwitch}>
                <p>Start Shopping</p>
              </button>
            </div>
            <Section2 id={"Top-sellers-sec"} heading="Suggested products" productData={allProducts} productArray={featureProducts} />
          </>
        ) : (
          <>
            <div className="desk_Page_Wrapper">
              <aside className="side_Section section_Wrapper">
                <p className="side_Section_Heading">Filters</p>
                <label htmlFor={`on_the_way`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox">
                  <input
                    type="checkbox"
                    name="on_the_way"
                    id={`on_the_way`}
                    defaultChecked={placed}
                    onClick={() => {
                      setPlaced(!placed);
                    }}
                  />
                  <span className="custom-checkmark"></span>
                  Placed
                </label>
                <label htmlFor={`Delivered`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox">
                  <input
                    type="checkbox"
                    name="Delivered"
                    id={`Delivered`}
                    defaultChecked={delivered}
                    onClick={() => {
                      setDelivered(!delivered);
                    }}
                  />
                  <span className="custom-checkmark"></span>
                  Delivered
                </label>
                <label htmlFor={`Cancelled`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox">
                  <input
                    type="checkbox"
                    name="Cancelled"
                    id={`Cancelled`}
                    defaultChecked={cancelled}
                    onClick={() => {
                      setCancelled(!cancelled);
                    }}
                  />
                  <span className="custom-checkmark"></span>
                  Cancelled
                </label>
              </aside>
              <OrderSection featureProducts={featureProducts} placed={placed} delivered={delivered} cancelled={cancelled} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;
