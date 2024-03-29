import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrder, getOrderStatus } from "../../api/OrdersApi";
import { getIndiProduct } from "../../api/Product";
import BankOfferModal from "../../components/ModalComponenr/BankOfferModal";
import OrderProductCard from "../../components/OrderProductCard/OrderProductCard";
import Section2 from "../../components/Section2/Section2";
import { UserDataContext } from "../../Contexts/UserContext";
import getMixedProducts from '../../hooks/getMixedProducts'

const OrderSection = ({ featureProducts, placed, delivered, cancelled }) => {
  const nav = useNavigate();
  const [demo, setDemo] = useState([]);
  const { userOrderData, allProducts } = useContext(UserDataContext);
  const [orderPlacedSuggestion, setOrderPlacedSuggestion] = useState([])
  const [orderDeliverSuggestion, setOrderDeliverSuggestion] = useState([])
  const [orderCancelSuggestion, setOrderCancelSuggestion] = useState([])
  const [emptyOrdersProductArray, setEmptyOrdersProductArray] = useState([])

  let ordersNumber = userOrderData.no_of_orders;

  const pageSwitch = (e) => {
    e.preventDefault();
    nav("/");
  };

  useEffect(() => {
    setEmptyOrdersProductArray(getMixedProducts(allProducts.products, allProducts.products, 10))
    setOrderPlacedSuggestion(getMixedProducts(allProducts.products, allProducts.np1, 10))
    setOrderDeliverSuggestion(getMixedProducts(allProducts.products, allProducts.np2, 10))
    setOrderCancelSuggestion(getMixedProducts(allProducts.products, allProducts.cd1, 10))
  }, [allProducts])

  // console.log(userOrderData);
  return (
    <>
      {ordersNumber === 0 ? (
        <>
          <div className="order_Page_Right">
            <div className="empty_order_sec">
              <p className="empty_order_text">You have no orders</p>
              <button type="submit" className="submit-button" onClick={pageSwitch}>
                <p>Start Shopping</p>
              </button>
            </div>
            <Section2
              id={"Top-sellers-sec"}
              heading="Suggested products"
              productData={allProducts}
              productArray={emptyOrdersProductArray}
              classes={{
                containerClass: "section_Wrapper",
                boxClass: "section_Wrapper",
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="order_Page_Right">
            <div className={`order_arriving_section ${placed ? "" : "d-none"}`}>
              <p className="order_Text section_Wrapper">Orders placed</p>
              {userOrderData.orders.map((order, index) =>
                order.productId.map((prod, indx) =>
                  order.itemId.map((item, idx) =>
                    order.item[indx] > idx ? (
                      order.itemStatus[idx] !== "DELIVERED" && order.itemStatus[idx] !== "CANCELLED" ? (
                        <OrderProductCard
                          key={`${order}-${item}-${prod}`}
                          orderId={order._id}
                          itemId={item}
                          product={order.productDetails[indx]}
                          productStatus={order.itemStatus[idx]}
                          productPrice={order.productPrice[indx]}
                          productDeliveryStatues="Arriving"
                          classes={{
                            boxClass: "section_Wrapper",
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  )
                )
              )}
              <Section2
                id={"Top-sellers-sec"}
                heading="Suggested products"
                productData={allProducts}
                productArray={orderPlacedSuggestion}
                classes={{
                  containerClass: "section_Wrapper",
                  boxClass: "section_Wrapper",
                }}
              />
            </div>
            <div className={`order_delivered_section ${delivered ? "" : "d-none"}`}>
              <p className="order_Text section_Wrapper">Orders delivered</p>
              {userOrderData.orders.map((order, index) =>
                order.productId.map((prod, indx) =>
                  order.itemId.map((item, idx) =>
                    order.item[indx] > idx ? (
                      order.itemStatus[idx] === "DELIVERED" ? (
                        <OrderProductCard
                          key={idx}
                          orderId={order._id}
                          itemId={item}
                          product={order.productDetails[indx]}
                          productStatus={order.itemStatus[idx]}
                          productPrice={order.productPrice[indx]}
                          productDeliveryStatues="Arriving"
                          classes={{
                            boxClass: "section_Wrapper",
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  )
                )
              )}
              <Section2
                id={"Top-sellers-sec"}
                heading="Suggested products"
                productData={allProducts}
                productArray={orderDeliverSuggestion}
                classes={{
                  containerClass: "section_Wrapper",
                }}
              />
            </div>
            <div className={`order_delivered_section ${cancelled ? "" : "d-none"}`}>
              <p className="order_Text section_Wrapper">Orders Cancelled</p>
              {userOrderData.orders.map((order, index) =>
                order.productId.map((prod, indx) =>
                  order.itemId.map((item, idx) =>
                    order.item[indx] > idx ? (
                      order.itemStatus[idx] === "CANCELLED" ? (
                        <OrderProductCard
                          key={idx}
                          orderId={order._id}
                          itemId={item}
                          product={order.productDetails[indx]}
                          productStatus={order.itemStatus[idx]}
                          productPrice={order.productPrice[indx]}
                          productDeliveryStatues="Arriving"
                          classes={{
                            boxClass: "section_Wrapper",
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  )
                )
              )}
              <Section2
                id={"Top-sellers-sec"}
                heading="Suggested products"
                productData={allProducts}
                productArray={orderCancelSuggestion}
                classes={{
                  containerClass: "section_Wrapper",
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSection;
