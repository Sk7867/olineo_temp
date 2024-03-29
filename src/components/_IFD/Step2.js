import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import IFDContext from "../../Contexts/IFDContext";
import { UserDataContext } from "../../Contexts/UserContext";
import styles from "./_IFD.module.css";

const Step2 = ({ userLoggedIn0, navigateBackward, navigateForward }) => {
  const otpInputRefs = useRef([]);
  const userLoggedIn = true;

  const { setUserContext } = useContext(UserDataContext);

  const { customerDetails, setCustomerDetails, storeDetails } = useContext(IFDContext);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendOtpTimer, setResendOtpTimer] = useState(60);
  const [resendOtpActive, setResendOtpActive] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isOtpResent, setIsOtpResent] = useState(false);
  const [isOtpButtonLoading, setIsOtpButtonLoading] = useState(false);

  const [nameInvalidErr, setNameInvalidErr] = useState(false);
  const [mobileInvalidErr, setMobileInvalidErr] = useState(false);
  const [emailInvalidErr, setEmailInvalidErr] = useState(false);
  const [dobInvalidErr, setDobInvalidErr] = useState(false);
  const [otpInvalidErr, setOtpInvalidErr] = useState(false);

  const getTodayDate = () => {
    let date = new Date();

    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  useEffect(() => {
    if (!isOtpSent) return;
    let timerInterval;
    timerInterval = setInterval(() => {
      setResendOtpTimer((prev) => {
        if (prev === 0) {
          clearInterval(timerInterval);
          setResendOtpActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isOtpSent]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
  };

  const onInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };
  const handleOtpInputChange = (value, idx) => {
    // if (value === null) return setOtpValue((prev) => prev.map((v, i) => (i === idx ? "" : v)));
    // if (isNaN(parseInt(value))) return;
    setOtpValue((prev) => prev.map((v, i) => (i === idx ? value : v)));
    idx < 5 && value !== "" && otpInputRefs.current[idx + 1]?.focus();
  };

  const sendOtp = async () => {
    if (customerDetails.fullName.match(/((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm)) {
      setNameInvalidErr(true);
      toast.error("Please enter name!", { toastId: "empty-name-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }

    if (validatePhone(customerDetails.mobileNumber) === null) {
      setMobileInvalidErr(true);
      toast.error("Please enter 10 digit number!", { toastId: "phone-num-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }

    isOtpSent && setResendOtpActive(false);
    setIsOtpButtonLoading(true);
    const payload = { mobileNumber: parseInt(customerDetails.mobileNumber), fullName: customerDetails.fullName };
    const responseSignUp = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
      method: "POST",
      headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
      body: JSON.stringify(payload),
    });
    const dataSignUp = await responseSignUp.json();
    if (dataSignUp.success) {
      isOtpSent && setIsOtpResent(true);
      isOtpSent && setResendOtpActive(false);
      setIsOtpSent(true);
      setIsOtpButtonLoading(false);
      // alert(dataSignUp.otp);
      setCustomerDetails((prev) => ({ ...prev, userId: dataSignUp.userId }));
      toast.success("OTP sent to your mobile number!", { autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }
    if (!dataSignUp.success && dataSignUp.message === "User exist with this mobile number") {
      const responseLogin = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
        body: JSON.stringify(payload),
      });
      const dataLogin = await responseLogin.json();
      setIsOtpButtonLoading(false);
      if (!dataLogin.success) return;
      isOtpSent && setIsOtpResent(true);
      setIsOtpSent(true);
      // alert(dataLogin.otp);
      setCustomerDetails((prev) => ({ ...prev, userId: dataLogin.userId }));
      toast.success("OTP sent to your mobile number!", { autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }
  };

  const handleSubmit = async () => {
    if (customerDetails.fullName.match(/((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm)) {
      setNameInvalidErr(true);
      toast.error("Please enter name!", { toastId: "no-name-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }
    if (validatePhone(customerDetails.mobileNumber) === null) {
      setMobileInvalidErr(true);
      toast.error("Please enter 10 digit number!", { toastId: "no-num-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }

    if (validateEmail(customerDetails.email) === null) {
      setEmailInvalidErr(true);
      toast.error("Please enter valid Email!", { toastId: "invalid-email-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }
    if (customerDetails.dob.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/gm) === null) {
      setDobInvalidErr(true);
      toast.error("Please enter Date of Birth!", { toastId: "no-dob-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }

    if (userLoggedIn) return navigateForward("step2", "step3");

    setIsButtonLoading(true);
    const responseVerifyOtp = await fetch(`${process.env.REACT_APP_BASE_URL}/user/verifyOtp/${customerDetails.userId}`, {
      method: "PUT",
      headers: { "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with", "Content-Type": "application/json", "Access-Control-Allow-origin": "*" },
      body: JSON.stringify({ otp: otpValue.join("") }),
    });
    const verifyOtpData = await responseVerifyOtp.json();

    if (!verifyOtpData.success) {
      setOtpInvalidErr(true);
      setIsButtonLoading(false);
      return;
    }

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
      setIsButtonLoading(false);
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

  useEffect(() => {
    if (!otpInvalidErr) return;
    toast.error("OTP is Invalid or Expired", { toastId: "wrong-otp-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
    // setOtpValue(["", "", "", "", "", ""]);
    // setOtpInvalidErr(false);
  }, [otpInvalidErr]);

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
        <input
          disabled={isOtpSent}
          className={`${styles["form-input"]} ${nameInvalidErr && styles["invalid"]}`}
          onChange={(e) => {
            setNameInvalidErr(false);
            onInputChange(e);
          }}
          name="fullName"
          value={customerDetails.fullName}
          type="text"
          placeholder="Your Name"
        />
        <div className="relative">
          <input
            disabled={isOtpSent}
            className={`${styles["form-input"]} ${mobileInvalidErr && styles["invalid"]}`}
            inputMode="numeric"
            onChange={(e) => {
              setMobileInvalidErr(false);
              (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && onInputChange(e);
            }}
            name="mobileNumber"
            maxLength={10}
            minLength={10}
            value={customerDetails.mobileNumber}
            type="text"
            placeholder="Contact Number"
            onFocus={(e) =>
              setTimeout(() => {
                e.target.scrollIntoView();
              }, 500)
            }
          />
          {!userLoggedIn && (
            <button disabled={!resendOtpActive && (isOtpSent || isOtpButtonLoading)} onClick={sendOtp} className={styles["btn-send-otp"]}>
              {isOtpButtonLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ margin: "auto", background: "rgba(241, 242, 243, 0)", display: "block" }}
                  width="60px"
                  height="40px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle cx={84} cy={33} r={10} fill="#4c4c4c">
                    <animate attributeName="r" repeatCount="indefinite" dur="0.5102040816326531s" calcMode="spline" keyTimes="0;1" values="9;0" keySplines="0 0.5 0.5 1" begin="0s" />
                    <animate
                      attributeName="fill"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="discrete"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="#4c4c4c;#808080;#919191;#595959;#4c4c4c"
                      begin="0s"
                    />
                  </circle>
                  <circle cx={16} cy={33} r={10} fill="#4c4c4c">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;9;9;9"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                  </circle>
                  <circle cx={50} cy={33} r={10} fill="#595959">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;9;9;9"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5102040816326531s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5102040816326531s"
                    />
                  </circle>
                  <circle cx={84} cy={33} r={10} fill="#919191">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;9;9;9"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-1.0204081632653061s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-1.0204081632653061s"
                    />
                  </circle>
                  <circle cx={16} cy={33} r={10} fill="#808080">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;9;9;9"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-1.530612244897959s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="2.0408163265306123s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-1.530612244897959s"
                    />
                  </circle>
                </svg>
              ) : resendOtpActive ? (
                "Resend OTP"
              ) : isOtpResent ? (
                "OTP Resent"
              ) : isOtpSent ? (
                resendOtpTimer
              ) : (
                "Send OTP"
              )}
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
                      border: otpInvalidErr ? "2px solid rgb(255 31 31)" : "1px solid #EFEFEF",
                      borderRadius: "4px",
                      transition: "0.1s",
                    }}
                  >
                    <input
                      ref={(ele) => (otpInputRefs.current[index] = ele)}
                      type="text"
                      maxLength={1}
                      value={value}
                      onFocus={(e) => {
                        e.target.select();
                        setTimeout(() => {
                          e.target.scrollIntoView();
                        }, 500);
                      }}
                      inputMode="numeric"
                      style={{
                        width: "100%",
                        color: otpInvalidErr ? "rgb(255 31 31)" : "#000",
                        background: "transparent",
                        textAlign: "center",
                        height: "26px",
                        border: "none",
                        outline: "none",
                        fontSize: "18px",
                      }}
                      onChange={(e) => {
                        setOtpInvalidErr(false);
                        handleOtpInputChange(e.target.value, index);
                      }}
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
        <input
          className={`${styles["form-input"]} ${emailInvalidErr && styles["invalid"]}`}
          onChange={(e) => {
            setEmailInvalidErr(false);
            onInputChange(e);
          }}
          onFocus={(e) =>
            setTimeout(() => {
              e.target.scrollIntoView({ behavior: "smooth" });
            }, 500)
          }
          name="email"
          value={customerDetails.email}
          type="text"
          placeholder="Email"
        />
        <input
          style={{ color: !customerDetails.dob && "#8b8b8b" }}
          className={`${styles["form-input"]} ${dobInvalidErr && styles["invalid"]}`}
          onChange={(e) => {
            setDobInvalidErr(false);
            onInputChange(e);
          }}
          name="dob"
          value={customerDetails.dob || getTodayDate()}
          max={getTodayDate()}
          type="date"
        />
        <button onClick={handleSubmit} disabled={isButtonLoading || (!userLoggedIn && !isOtpSent)} className={styles["primary-button"]}>
          {isButtonLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ margin: "auto", background: "rgba(241, 242, 243, 0)", display: "block" }}
              width="30px"
              height="30px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g transform="translate(84,50)">
                <g transform="rotate(0)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity={1}>
                    <animateTransform attributeName="transform" type="scale" begin="-0.9831460674157303s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.9831460674157303s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(74.04163056034261,74.04163056034261)">
                <g transform="rotate(45)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.875">
                    <animateTransform attributeName="transform" type="scale" begin="-0.8426966292134831s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.8426966292134831s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(50,84)">
                <g transform="rotate(90)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.75">
                    <animateTransform attributeName="transform" type="scale" begin="-0.7022471910112359s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.7022471910112359s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(25.958369439657385,74.04163056034261)">
                <g transform="rotate(135)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.625">
                    <animateTransform attributeName="transform" type="scale" begin="-0.5617977528089888s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.5617977528089888s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(16,50.00000000000001)">
                <g transform="rotate(180)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.5">
                    <animateTransform attributeName="transform" type="scale" begin="-0.42134831460674155s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.42134831460674155s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(25.95836943965738,25.958369439657385)">
                <g transform="rotate(225)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.375">
                    <animateTransform attributeName="transform" type="scale" begin="-0.2808988764044944s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.2808988764044944s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(49.99999999999999,16)">
                <g transform="rotate(270)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.25">
                    <animateTransform attributeName="transform" type="scale" begin="-0.1404494382022472s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="-0.1404494382022472s" />
                  </circle>
                </g>
              </g>
              <g transform="translate(74.04163056034261,25.95836943965738)">
                <g transform="rotate(315)">
                  <circle cx={0} cy={0} r={4} fill="#381867" fillOpacity="0.125">
                    <animateTransform attributeName="transform" type="scale" begin="0s" values="2.73 2.73;1 1" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.1235955056179776s" repeatCount="indefinite" values="1;0" begin="0s" />
                  </circle>
                </g>
              </g>
            </svg>
          ) : (
            <p>Continue</p>
          )}
        </button>
      </div>
    </section>
  );
};

export default Step2;
