import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { userSignUp } from "../api/Auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { UserDataContext } from "../Contexts/UserContext";
import CircleLoading from "../components/CircleLoading";

//CSS
// import './Signup.css'

toast.configure();
const Signup = ({ setLoginRedirect }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const matches = useMediaQuery("(min-width:768px)");
  const nav = useNavigate();
  const { userContext, setUserContext, userAddress, setUserAddress } = useContext(UserDataContext);

  const [loading, setLoading] = useState(false);

  const handleLength = (length) => {
    if (name !== "" && length === 10) {
      setValidLength(true);
      return setBtnDisable(false);
    }
    setValidLength(false);
    setBtnDisable(true);
    // if (length === 9) {
    //   setValidLength(true)
    // } else {
    //   setValidLength(false)
    // }
  };

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };
  // console.log(phone);

  // const validateForm = () => (
  //   (name !== '') && (name.length > 0) && (phone !== '') && (phone.length > 0) && validLength ? setBtnDisable(false) : setBtnDisable(true)
  // )

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnDisable(true);
    userSignUp(phone, name).then((res) =>
      res
        ? (setLoading(false),
          setBtnDisable(false),
          alert(`${res.otp}`),
          setLoginRedirect(false),
          nav("/otp"),
          setUserContext((prev) => ({
            ...prev,
            id: res.userId,
            fullName: name,
            mobileNumber: phone,
          })))
        : (setLoading(false), setBtnDisable(false), toast.error("Mobile Number Already Registered"))
    );
  };

  const pageSwitch = (e) => {
    e.preventDefault();
    nav("/login");
  };

  // console.log(name + "-" + phone);
  // console.log(btnDisable);

  return (
    <>
      <HeaderBar alternateWay={"Login"} alternateLink={"/login"} />
      <div className="signup-wrapper">
        <div className="signup-header">
          <h1 className="page-heading">Welcome to Olineo</h1>
          <p className={"page-desc"}>Create an account</p>
        </div>
        <form action="" className={"signup-form"} onSubmit={formSubmit}>
          <div className="inputfield-Container">
            <input
              type="text"
              name="Name"
              id="name"
              className="input-field"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            {matches ? (
              <input
                type="tel"
                onkeypress="return isNumberKey(event)"
                name="Phone"
                id="phone"
                className="input-field"
                value={phone}
                placeholder="Phone"
                maxLength={10}
                onChange={(e) => {
                  validateNumber(e);
                  handleLength(e.target.value.length);
                }}
                required
              />
            ) : (
              <input
                type="number"
                name="Phone"
                id="phone"
                className="input-field"
                value={phone}
                placeholder="Phone"
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleLength(e.target.value.length);
                }}
                required
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
              Already a customer? Login here
            </p>
          </div>
        </form>
        <div className="tc-Footer">
          <p className="footer-Text">
            By Signing Up, I agree to <span>terms & conditions</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
