import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { getUser, getUserPic, verifyOtp, verifyOtpLogin, verifyOtpSignup } from "../api/Auth";
import { UserDataContext } from "../Contexts/UserContext";
import { Slide, toast, ToastContainer } from "react-toastify";
import { getCartData } from "../api/Cart";
import { getAllOrder } from "../api/OrdersApi";
import CircleLoading from "../components/CircleLoading";

toast.configure();
const OtpValid = ({ loginRedirect }) => {
  const [otp, setOtp] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);
  // const [resend, setResend] = useState(true)
  const nav = useNavigate();
  const { setUserContext, setUserCart, setCartArray, userOrderData, setUserOrderData } = useContext(UserDataContext);

  const handleLength = (length) => {
    if (length === 6) {
      setValidLength(true);
      return setBtnDisable(false);
    }
    setValidLength(false);
    setBtnDisable(true);
  };

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
      // setResend(false)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  const existingUserLogin = (e) => {
    e.preventDefault();
    // let OTP = parseInt(otp)
    setLoading(true);
    setBtnDisable(true);
    verifyOtpLogin(otp).then((res) =>
      res
        ? (setLoading(false),
          setBtnDisable(false),
          nav("/"),
          setUserContext((prev) => ({
            ...prev,
            JWT: res.JWT,
          })),
          getUser(res.JWT).then((res) => {
            if (res) {
              let user = res;
              setUserContext((prev) => ({
                ...prev,
                id: user._id,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                email: user.email,
                dob: user.dob,
              }));
            }
          }),
          getUserPic(res.JWT).then((res) => {
            if (res) {
              setUserContext((prev) => ({
                ...prev,
                profilePic: res,
              }));
            }
          }),
          getAllOrder(res.JWT).then((res) => {
            if (res) {
              let orders = [...res.orders];
              let newOrders = orders.filter((obj) => obj.itemId.length > 0);
              setUserOrderData({
                loaded: true,
                no_of_orders: res.no_of_orders,
                orders: newOrders,
              });
            }
          }),
          getCartData(res.JWT)
            .then(res => {
              if (res) {
                setCartArray({
                  loaded: true,
                  no_of_carts: res.no_of_carts,
                  cart: res.cart,
                  combo: res.combo
                })
              }
            })

        )
        :
        (setLoading(false), setBtnDisable(false), toast.error("OTP Expired or invalid"))
    );
  };

  const newUserSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnDisable(true);
    // let OTP = parseInt(otp)
    verifyOtpSignup(otp).then((res) =>
      res
        ? (setLoading(false),
          setBtnDisable(false),
          nav("/adduser"),
          setUserContext((prev) => ({
            ...prev,
            JWT: res,
          })))
        : (setLoading(false), setBtnDisable(false), toast.error("OTP Expired or invalid"))
    );
  };

  // const validateForm = () => (
  //   (otp !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  // )
  return (
    <>
      <HeaderBar />
      <div className="signup-wrapper">
        <div className="signup-header">
          <h1 className="page-heading">Confirmation code</h1>
          <p className={"page-desc"}>Please check you phone for 6-digit confimation code.</p>
        </div>
        <form action="" className={"signup-form"} onSubmit={loginRedirect ? existingUserLogin : newUserSignUp}>
          <div className="inputfield-Container">
            <div className="inputField">
              <input
                type="text"
                name="Code"
                id="code"
                className="input-field"
                value={otp}
                autoComplete="off"
                placeholder="Confirmation code"
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value);
                  handleLength(e.target.value.length);
                }}
              />
            </div>
            <p className={`resend-btn ${seconds === 0 ? "" : "btn-disable"}`} type="resend">
              {seconds === 0 ? "Resend Code" : seconds}
            </p>
          </div>
          <div className={"button-Container"}>
            {loading ? (
              <div style={{ height: "15px", textAlign: "center", position: "absolute", top: "-25px" }} className="loading_wrapper">
                <CircleLoading />
              </div>
            ) : (
              ""
            )}
            <button className="submit-button" type="submit" disabled={btnDisable}>
              <p>Continue</p>
            </button>
            {loginRedirect ? (
              <Link state={{ emailLogin: true }} to={"/login"} className="extra-btn">
                Resend code via email
              </Link>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Slide} />
    </>
  );
};

export default OtpValid;
