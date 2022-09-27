import React from "react";
import SpinWheel from "../../components/_IFD/SpinWheel";
import Step1 from "../../components/_IFD/Step1";
import Step2 from "../../components/_IFD/Step2";
import Step3 from "../../components/_IFD/Step3";
import styles from "./IFD.module.css";
import gsap from "gsap";
import { useContext } from "react";
import IFDContext from "../../Contexts/IFDContext";
import ProductReveal from "../../components/_IFD/ProductReveal";
import { useState, useEffect } from "react";
import { useRef } from "react";

const IFD = ({ userLoggedIn, setIsHomePage }) => {
  const { activeState, setActiveState, setCustomerDetails, setProductDetails, setCustomerExperience } = useContext(IFDContext);

  const [counterWidth, setCounterWidth] = useState(10);

  // useEffect(() => {
  //   if (!activeState.step2 && activeState.step1) {
  //     gsap.fromTo("#step-1-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 100, delay: 0.2 });
  //   }
  //   if (activeState.step2) {
  //     gsap.fromTo("#step-2-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 100, delay: 0.2 });
  //   }
  //   if (activeState.step3) {
  //     gsap.fromTo("#step-3-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 100, delay: 0.2 });
  //   }
  // }, [activeState]);

  // console.log(activeState);

  const stepCounterSvgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo("#step-1-section", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1)" });
    gsap.fromTo("#steps-counter", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: "back.out(1)" });
  }, []);

  useEffect(() => {
    if (activeState.step3 && activeState.step2 && activeState.step1) return setCounterWidth(200);
    if (!activeState.step3 && activeState.step2 && activeState.step1) return setCounterWidth(100);
    if (!activeState.step3 && !activeState.step2 && activeState.step1) return setCounterWidth(5);
  }, [activeState]);

  const navigateForward = (from, to) => {
    if (from === "step1" && to === "step2") {
      setActiveState((prev) => ({ ...prev, step2: true }));
      setTimeout(() => {
        gsap.fromTo("#step-1-section", { scale: 1 }, { scale: 0.9, transformOrigin: "left", duration: 0.4 });
        gsap.fromTo("#step-2-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 });
      }, 100);
    }
    if (from === "step2" && to === "step3") {
      setActiveState((prev) => ({ ...prev, step2: true, step3: true }));
      setTimeout(() => {
        gsap.fromTo("#step-2-section", { scale: 1 }, { scale: 0.9, transformOrigin: "left", duration: 0.4 });
        gsap.fromTo("#step-3-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 });
      }, 100);
    }
    if (from === "step3" && to === "spinWheelSection") {
      setActiveState((prev) => ({ ...prev, step2: true, step3: true, spinWheelSection: true }));
      setTimeout(() => {
        gsap.fromTo(
          ["#step-3-section", "#step-2-section", "#step-1-section"],
          { y: 0, opacity: 1 },
          {
            y: -20,
            opacity: 0,
            transformOrigin: "left",
            duration: 0.6,
            onComplete: () => {
              setActiveState((prev) => ({ ...prev, step1: false, step2: false, step3: false, spinWheelSection: true }));
              document.getElementById("steps-counter").style.display = "none";
            },
          }
        );
        gsap.fromTo("#spin-wheel-section", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "back", duration: 1.5, delay: 0.7 });
      }, 100);
    }
    if (from === "spinWheelSection" && to === "productRevealSection") {
      setActiveState((prev) => ({ ...prev, step2: true, step3: true, spinWheelSection: true, productRevealSection: true }));
      setTimeout(() => {
        gsap.fromTo("#spin-wheel-section", { scale: 1 }, { scale: 0.9, transformOrigin: "left", duration: 0.4 });
        gsap.fromTo("#product-reveal-section", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 });
      }, 100);
    }
  };
  const navigateBackward = (from, to) => {
    if (from === "step1" && to === "home") {
      gsap.fromTo("#step-1-section", { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.4, onComplete: () => setIsHomePage(true) });
    }

    if (from === "step2" && to === "step1") {
      gsap.fromTo("#step-2-section", { xPercent: 0, opacity: 1 }, { xPercent: 100, opacity: 0, duration: 0.4 });
      gsap.fromTo("#step-1-section", { scale: 0.9 }, { scale: 1, transformOrigin: "left", duration: 0.4 });
      setTimeout(() => {
        setActiveState((prev) => ({ ...prev, step2: false, step3: false }));
        setCustomerDetails({
          userId: "",
          fullName: "",
          mobileNumber: "",
          email: "",
          dob: "",
        });
      }, 500);
    }
    if (from === "step3" && to === "step2") {
      gsap.fromTo("#step-3-section", { xPercent: 0, opacity: 1 }, { xPercent: 100, opacity: 0, duration: 0.4 });
      gsap.fromTo("#step-2-section", { scale: 0.9 }, { scale: 1, transformOrigin: "left", duration: 0.4 });
      setTimeout(() => {
        setActiveState((prev) => ({ ...prev, step3: false }));
        setCustomerExperience(null);
        setProductDetails({
          selectedCategory: null,
          phonesData: [],
          other_product_purchased: null,
          product_purchased: 0,
          imei: null,
          otp: null,
          coupon_code: "",
          product_redeemed: null,
          product_redeemed_id: "",
        });
      }, 500);
    }
  };

  return (
    <>
      <div className={styles["ifd-from-wrapper"]}>
        {activeState.step1 && (
          <div id="step-1-section" className={styles["form-screen"]}>
            <Step1 navigateBackward={navigateBackward} navigateForward={navigateForward} userLoggedIn={userLoggedIn} />
          </div>
        )}
        {activeState.step1 && activeState.step2 && (
          <div id="step-2-section" className={styles["form-screen"]}>
            <Step2 navigateBackward={navigateBackward} navigateForward={navigateForward} userLoggedIn={userLoggedIn} />
          </div>
        )}
        {activeState.step1 && activeState.step2 && activeState.step3 && (
          <div id="step-3-section" className={styles["form-screen"]}>
            <Step3 setCounterWidth={setCounterWidth} stepCounterSvgRef={stepCounterSvgRef} navigateBackward={navigateBackward} navigateForward={navigateForward} />
          </div>
        )}

        {activeState.spinWheelSection && (
          <div id="spin-wheel-section" className={styles["form-screen"]}>
            <SpinWheel navigateForward={navigateForward} />
          </div>
        )}
        {activeState.productRevealSection && (
          <div id="product-reveal-section" className={styles["form-screen"]}>
            <ProductReveal navigateForward={navigateForward} />
          </div>
        )}
      </div>

      <div id="steps-counter" className={`${styles["steps-counter"]}`}>
        <svg ref={stepCounterSvgRef} style={{ transforOrigin: "center" }} width="300" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="8" rx="4" fill="#D9D9D9" />
          <rect style={{ transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.36, 1.23) 0s" }} width={counterWidth} height="8" rx="4" fill="url(#paint0_linear_4124_20559)" />
          <defs>
            <linearGradient id="paint0_linear_4124_20559" x1="46.8696" y1="-9.44252" x2="46.8696" y2="19.4537" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D99A39" />
              <stop offset="0.0588235" stopColor="#D99A39" />
              <stop offset="0.101961" stopColor="#E8B643" />
              <stop offset="0.219608" stopColor="#D99A39" />
              <stop offset="0.278431" stopColor="#EFC254" />
              <stop offset="0.368627" stopColor="#EFC254" />
              <stop offset="0.45098" stopColor="#EFC254" />
              <stop offset="0.568627" stopColor="#CC8F23" />
              <stop offset="0.611765" stopColor="#E7B93F" />
              <stop offset="0.631373" stopColor="#E7B93F" />
              <stop offset="0.65098" stopColor="#E7B93F" />
              <stop offset="0.678431" stopColor="#CC8F23" />
              <stop offset="0.701961" stopColor="#FCEB80" />
              <stop offset="0.721569" stopColor="#FCEB80" />
              <stop offset="0.741176" stopColor="#FCEB80" />
              <stop offset="0.811765" stopColor="#D19335" />
              <stop offset="0.858824" stopColor="#D19335" />
              <stop offset="1" stopColor="#FCEB80" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles["steps-counter-text"]}>
          <p style={{ color: counterWidth >= 10 && "#efc255", transition: "0.5s" }}>Step 1</p>
          <p style={{ color: counterWidth > 100 && "#efc255", transition: "0.5s" }}>Step 2</p>
          <p style={{ color: counterWidth > 200 && "#efc255", transition: "0.5s" }}>Step 3</p>
        </div>
      </div>
    </>
  );
};

export default IFD;
