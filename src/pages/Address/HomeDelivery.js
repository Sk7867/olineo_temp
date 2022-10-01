import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UserDataContext } from "../../Contexts/UserContext";

//Images
import addIcon from "../../assets/vector/add_outline_blue.svg";
import AddressBox from "../../components/AddressBox/AddressBox";

//Components
import PriceDetailsBox from "../../components/PriceDetailsBox/PriceDetailsBox";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { getAddress } from "../../api/Address";
import { completeOrder, initOrder, paymentInit } from "../../api/OrdersApi";
import { toast } from "react-toastify";
import { getCartData, removeFromCart } from "../../api/Cart";

toast.configure();
const HomeDelivery = ({ setEditID, setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)");
  const [disable, setDisable] = useState(true);
  const [addressSelected, setAddressSelected] = useState("");
  const { userAddress, setUserContext, setUserAddress, orderInit, setOrderInit, setCartArray } = useContext(UserDataContext);

  const [initProcessing, setInitProcessing] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "Select Address",
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  useEffect(() => {
    getAddress().then((res) => {
      // console.log(res);
      if (res) {
        setUserAddress({
          loaded: true,
          no_of_address: res.no_of_address,
          address: res.address,
        });
      }
    });
  }, []);

  const breadCrumbsData = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "My Cart",
      url: "/mycart",
    },
    {
      text: "Delivery option",
      url: "",
    },
  ];

  useEffect(() => {
    setOrderInit((prev) => ({
      ...prev,
      shippingAddressId: addressSelected,
    }));
  }, [addressSelected]);

  // console.log(orderInit);

  const handleOrderInit = async (e) => {
    e.preventDefault();
    setInitProcessing(true);

    const OrderinitRes = await initOrder(orderInit);
    if (!OrderinitRes) return setInitProcessing(false);

    let orderId = OrderinitRes._id;
    console.log(orderId);

    const payInitRes = await paymentInit(orderId);
    window.open(payInitRes, "_parent");
    setInitProcessing(false);
  };

  return (
    <>
      <div className="page_Wrapper page_Margin_Top_Secondary">
        <BreadCrumbs data={breadCrumbsData} />
        <div className="desk_Page_Wrapper">
          <aside className="side_Section" style={{ padding: "0" }}>
            <PriceDetailsBox HideDetails={false} />
          </aside>
          <div className="order_Page_Right">
            <p className="cart_Text section_Wrapper">Select Address</p>
            <div className="home_Delivery_Options">
              {userAddress.no_of_address !== 0
                ? userAddress.no_of_address !== 0 &&
                userAddress.address.map((address, index) => (
                  <div className="home_Delivery_Option section_Wrapper" key={index}>
                    <label
                      htmlFor={address.id}
                      className={`radiobtn-label home_Delivery_Label`}
                      onClick={() => {
                        setAddressSelected(address._id);
                        setDisable(false);
                      }}
                    >
                      <input type="radio" name="Delivery Address" id={address.id} value={address.id} />
                      <span className="radio-custom"></span>
                      <AddressBox
                        setEditID={setEditID}
                        address={address}
                        deleteOption={false}
                        defaultOption={false}
                        border={false}
                        fullWidth={true}
                        classes={{
                          boxWrapperClass: 'ms-1'
                        }}
                      />
                    </label>
                  </div>
                ))
                : ""}
            </div>
            <Link to={"/newaddress"} className="add_New_Address home_Delivery_New_Address section_Wrapper">
              <img src={addIcon} alt="" />
              <p>Add a new address</p>
            </Link>

            {matches && (
              <div className="home_Delivery_Submit">
                <button type="submit" className="submit-button " disabled={disable || initProcessing} onClick={handleOrderInit}>
                  <p>{initProcessing ? "Processing..." : "Continue for Payment"}</p>
                </button>
              </div>
            )}

            {!matches && (
              <div className="address_Footer">
                <button type="submit" className="submit-button" disabled={disable || initProcessing} onClick={handleOrderInit}>
                  <p>{initProcessing ? "Processing..." : "Continue for Payment"}</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDelivery;
