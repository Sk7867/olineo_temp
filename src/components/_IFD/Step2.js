import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import IFDContext from "../../Contexts/IFDContext";
import { UserDataContext } from "../../Contexts/UserContext";
import styles from "./_IFD.module.css";
import DatePicker from "react-date-picker";

const Step2 = ({ userLoggedIn, navigateBackward, navigateForward }) => {
  const otpInputRefs = useRef([]);

  const { setUserContext } = useContext(UserDataContext);

  const { customerDetails, setCustomerDetails, storeDetails } = useContext(IFDContext);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);

  const [selectedDay, setSelectedDay] = useState(null);
  console.log(selectedDay);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [isOtpVarified, setIsOtpVarified] = useState(false);

  console.log(customerDetails);

  const onInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };
  const handleOtpInputChange = (value, idx) => {
    // if (value === null) return setOtpValue((prev) => prev.map((v, i) => (i === idx ? "" : v)));
    // if (isNaN(parseInt(value))) return;
    setOtpValue((prev) => prev.map((v, i) => (i === idx ? value : v)));
    idx < 5 && value !== "" && otpInputRefs.current[idx + 1]?.focus();
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
  };

  const sendOtp = async () => {
    if (customerDetails.fullName.match(/((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm)) return toast.error("Please enter name!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
    if (validatePhone(customerDetails.mobileNumber) === null) return toast.error("Please enter 10 digit number!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
    const payload = { mobileNumber: parseInt(customerDetails.mobileNumber), fullName: customerDetails.fullName };

    const responseSignUp = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
      method: "POST",
      headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
      body: JSON.stringify(payload),
    });
    const dataSignUp = await responseSignUp.json();
    if (dataSignUp.success) {
      setIsOtpSent(true);
      alert(dataSignUp.otp);
      setCustomerDetails((prev) => ({ ...prev, userId: dataSignUp.userId }));
      toast.success("OTP sent to your mobile number!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
      return;
    }
    if (!dataSignUp.success && dataSignUp.message === "User exist with this mobile number") {
      const responseLogin = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
        body: JSON.stringify(payload),
      });
      const dataLogin = await responseLogin.json();

      if (!dataLogin.success) return;
      setIsOtpSent(true);
      alert(dataLogin.otp);
      setCustomerDetails((prev) => ({ ...prev, userId: dataLogin.userId }));
      toast.success("OTP sent to your mobile number!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
      return;
    }
  };

  const handleSubmit = async () => {
    if (validateEmail(customerDetails.email) === null) return toast.error("Please enter valid Email!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
    if (customerDetails.dob.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/gm) === null)
      return toast.error("Please enter Date of Birth!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });

    if (userLoggedIn) {
      if (customerDetails.fullName.match(/((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm)) return toast.error("Please enter name!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
      if (validatePhone(customerDetails.mobileNumber) === null) return toast.error("Please enter 10 digit number!", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
      navigateForward("step2", "step3");
      return;
    }
    const responseVerifyOtp = await fetch(`${process.env.REACT_APP_BASE_URL}/user/verifyOtp/${customerDetails.userId}`, {
      method: "PUT",
      headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
      body: JSON.stringify({ otp: otpValue.join("") }),
    });
    const verifyOtpData = await responseVerifyOtp.json();
    if (!verifyOtpData.success) return setIsOtpInvalid(true);

    if (verifyOtpData.success) {
      await fetch(`${process.env.REACT_APP_BASE_URL}/user/updateProfile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${verifyOtpData.JWT}`,
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
          "Content-Type": "application/json",
          "Access-Control-Allow-origin": "*",
        },
        body: JSON.stringify({
          fullName: customerDetails.fullName,
          email: customerDetails.email,
          dob: customerDetails.dob,
        }),
      });
      const getUserDetail = await fetch(`${process.env.REACT_APP_BASE_URL}/user/myProfile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${verifyOtpData.JWT}`,
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
          "Content-Type": "application/json",
          "Access-Control-Allow-origin": "*",
        },
      });
      const userDetails = await getUserDetail.json();
      const user = userDetails?.data?.user;
      navigateForward("step2", "step3");
      setTimeout(() => {
        setUserContext((prev) => ({
          ...prev,
          id: user._id,
          fullName: user.fullName,
          mobileNumber: user.mobileNumber,
          email: user.email,
          dob: user.dob,
          JWT: verifyOtpData.JWT,
        }));
      }, 500);
    }
  };

  function handleUnLoad(event) {
    event.returnValue = null;
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnLoad);
    return () => {
      window.removeEventListener("beforeunload", handleUnLoad);
    };
  }, []);

  useEffect(() => {
    if (!isOtpInvalid) return;
    toast.error("OTP is Invalid or Expired", { autoClose: 3000, hideProgressBar: false, position: "bottom-center" });
    setOtpValue(["", "", "", "", "", ""]);
    setIsOtpInvalid(false);
  }, [isOtpInvalid]);

  return (
    <section style={{ paddingBottom: "80px" }}>
      <header className={styles["header"]}>
        <svg onClick={() => navigateBackward("step2", "step1")} style={{ cursor: "pointer" }} width="15" height="20" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.54117 6.92943L3.47046 7.00014L3.54117 7.07085L8.06784 11.5975C8.48378 12.0135 8.48378 12.6851 8.06784 13.1011C7.65124 13.5177 6.96789 13.5164 6.56426 13.1128L1.20925 7.75776C0.793307 7.34181 0.793307 6.67013 1.20925 6.25418L6.56426 0.899184C6.9802 0.483237 7.65189 0.483237 8.06784 0.899184C8.48378 1.31513 8.48378 1.98682 8.06784 2.40276L3.54117 6.92943Z"
            fill="#F8F9FA"
            stroke="#1B325E"
            strokeWidth="0.2"
          />
        </svg>
        <h3 className={styles["header-msg"]}>Claim your reward in two simple steps. </h3>
      </header>
      <h1 data-after={storeDetails?.name} className={styles["store-name-heading"]}>
        {storeDetails?.name}
      </h1>
      <h1 data-after="Welcomes You" className={styles["store-name-heading"]}>
        Welcomes You
      </h1>
      <div className={styles["form-container"]}>
        <h3 className={styles["form-heading"]}>2. Start with filling your information here:</h3>
        <input disabled={isOtpSent} className={styles["form-input"]} onChange={onInputChange} name="fullName" value={customerDetails.fullName} type="text" placeholder="Your Name" />
        <div className="relative">
          <input disabled={isOtpSent} className={styles["form-input"]} onChange={onInputChange} name="mobileNumber" value={customerDetails.mobileNumber} type="text" placeholder="Contact Number" />
          {!userLoggedIn && (
            <button disabled={isOtpSent} onClick={sendOtp} className={styles["btn-send-otp"]}>
              {isOtpSent ? "OTP Sent" : "Send OTP"}
            </button>
          )}
        </div>

        {!userLoggedIn && (
          <div style={{ opacity: isOtpSent ? 1 : 0.5, pointerEvents: isOtpSent ? "all" : "none" }}>
            <h3 className={styles["ask-otp"]}>Enter OTP to proceed:</h3>
            <div className={styles["otp-input-container"]}>
              {otpValue.map((value, index) => {
                return (
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "#fff",
                      // boxShadow: "inset 1.33333px 2.66667px 2.66667px rgba(0, 0, 0, 0.125)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #EFEFEF",
                      borderRadius: "4px",
                    }}
                  >
                    <input
                      ref={(ele) => (otpInputRefs.current[index] = ele)}
                      type="text"
                      maxLength={1}
                      value={value}
                      style={{ width: "100%", background: "transparent", textAlign: "center", height: "26px", border: "none", outline: "none", fontSize: "18px" }}
                      onChange={(e) => handleOtpInputChange(e.target.value, index)}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) =>
                        e.key === "Backspace" && e.target.value === "" && index > 0 ? (e.preventDefault(), otpInputRefs.current[index - 1].focus()) : e.target.value === " " && e.target.select()
                      }
                      disabled={!isOtpSent}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <input className={styles["form-input"]} onChange={onInputChange} name="email" value={customerDetails.email} type="text" placeholder="Email" />
        <input className={styles["form-input"]} onChange={onInputChange} name="dob" value={customerDetails.dob} type="date" />
        {/* <DatePicker onChange={(e) => console.log(e)} computableFormat="YYYY-MM-DD" format="YYYY/MM/DD" /> */}
        <button onClick={handleSubmit} disabled={!userLoggedIn && !isOtpSent} className={styles["primary-button"]}>
          <p>Continue</p>
        </button>
      </div>
    </section>
  );
};

export default Step2;
