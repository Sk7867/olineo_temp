import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import CircleLoading from "../components/CircleLoading";
import { userLogin, userLoginEmail } from "../api/Auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UserDataContext } from "../Contexts/UserContext";
import { toast } from "react-toastify";

toast.configure();
const Login = ({ setUserLoggedIn, setLoginRedirect }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const matches = useMediaQuery("(min-width:768px)");
  const [emailLogin, setEmailLogin] = useState(false);
  const { setUserContext } = useContext(UserDataContext);
  const loc = useLocation();
  // console.log(loc);

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  // console.log(phone);
  useEffect(() => {
    if (loc.state) {
      if (loc.state.emailLogin) {
        setEmailLogin(true);
      }
    }
  }, [loc.state]);

  // console.log(emailLogin);

  const handleLength = (length) => {
    // if (length === 10) {
    //   console.log('valid lenght', length);
    //   setValidLength(true)
    //   setBtnDisable(false)
    // } else {
    //   console.log('invalid lenght', length);
    //   setValidLength(false)
    //   setBtnDisable(false)
    // }
    if (length === 10) {
      setValidLength(true);
      return setBtnDisable(false);
    }
    setValidLength(false);
    setBtnDisable(true);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnDisable(true);
    if (emailLogin) {
      userLoginEmail(email).then((res) =>
        res
          ? (setLoading(false),
            setBtnDisable(false),
            setLoginRedirect(true),
            nav("/otp"),
            setUserContext((prev) => ({
              ...prev,
              id: res.userId,
            })))
          : (setLoading(false), setBtnDisable(false), toast.error("Email Not Registered"))
      );
    } else {
      userLogin(phone).then((res) =>
        res
          ? (alert(`${res.otp}`),
            setLoading(false),
            setBtnDisable(false),
            setLoginRedirect(true),
            nav("/otp"),
            setUserContext((prev) => ({
              ...prev,
              id: res.userId,
            })))
          : (setLoading(false), setBtnDisable(false), toast.error("Mobile number not registered!"))
      );
    }
  };

  const pageSwitch = (e) => {
    e.preventDefault();
    nav("/signup");
  };

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  // console.log(validLength);

  return (
    <>
      <HeaderBar alternateWay={"Sign up"} alternateLink={"/signup"} />
      <div className="signup-wrapper">
        <div className="signup-header">
          <h1 className="page-heading">Welcome Back!</h1>
          <p className={"page-desc"}>Login here</p>
        </div>
        <form action="" className={"signup-form"} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            {emailLogin ? (
              <input type="email" name="Email" id="email" className="input-field" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            ) : matches ? (
              <input
                type="tel"
                name="Phone"
                id="phone"
                maxLength={10}
                className="input-field"
                value={phone}
                placeholder="Phone"
                onChange={(e) => {
                  validateNumber(e);
                  handleLength(e.target.value.length);
                }}
              />
            ) : (
              <input
                type="number"
                name="Phone"
                id="phone"
                maxLength={10}
                className="input-field"
                value={phone}
                placeholder="Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleLength(e.target.value.length);
                }}
              />
            )}
          </div>
          <div className={"button-Container"}>
            {loading ? (
              <div style={{ height: "15px", textAlign: "center", position: "absolute", top: "-25px" }} className="loading_wrapper">
                <CircleLoading />
              </div>
            ) : (
              ""
            )}
            <button type="submit" className="submit-button" disabled={btnDisable}>
              <p>Continue</p>
            </button>
            <p className="extra-btn" onClick={pageSwitch}>
              New to Olineo? Join here
            </p>
          </div>
        </form>
        <div className="tc-Footer">
          <p className="footer-Text">
            By Signing In, I agree to <span>terms & conditions</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
