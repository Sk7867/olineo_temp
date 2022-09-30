import React, { useState } from "react";
import styles from "./IFD.module.css";
import IFD from "./IFD.js";
import { useEffect } from "react";
import { Parallax } from "react-parallax";
import { useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export const IFDHome = ({ setHeaderData, userLoggedIn }) => {
  const [isHomePage, setIsHomePage] = useState(true);
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "",
      categoriesCond: false,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  const ref = useRef();
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const [img1Scale, setimg1Scale] = useState(0);
  const [img2Scale, setimg2Scale] = useState(0);
  const [img3Scale, setimg3Scale] = useState(0);
  const [img4Scale, setimg4Scale] = useState(0);
  const [img5Scale, setimg5Scale] = useState(0);

  const tl = gsap.timeline({ id: "homePageTransition" });

  const navigateToRewardPage = () => {
    // navigator.vibrate([0, 30, 10]);
    tl.to("#home-button-span", { opacity: 1, duration: 0.2 });
    tl.to(
      "#home-button-span",
      {
        scale: 90,
        opacity: 0.05,
        duration: 1.3,
        delay: 0.2,
        onComplete: () => {
          setIsHomePage(false);
          tl.kill();
          return;
        },
      },
      "<"
    );
    tl.to(["#poster-container", "#thumbnail-container"], { opacity: 0, duration: 1 }, "<");
    tl.to(["#primary-floating-button", "#secondary-floating-button"], { opacity: 0, duration: 0.6 }, "<");
  };

  useEffect(() => {
    if (!isHomePage) return;
    gsap.fromTo("#poster-container", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, delay: 0.2, ease: "back.out(1)" });
    gsap.fromTo(
      ["#primary-floating-button", "#home-button-span"],
      { bottom: -70 },
      {
        bottom: 20,
        duration: 0.6,
        ease: "back.out(1)",
        delay: 0.6,
        onComplete: () => {
          document.getElementById("primary-floating-button").style.transition = "0.3s";
        },
      }
    );
    gsap.fromTo("#thumbnail-container", { opacity: 0 }, { opacity: 1, duration: 1.8, delay: 1.3, ease: "back.out(1)" });
    gsap.fromTo(
      ["#secondary-floating-button"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 1,
      }
    );
  }, [isHomePage]);

  useEffect(() => {
    document.title = "Indian Festival Days | O-LINE-O";

    return () => {
      document.title = "Olineo Nexus";
    };
  }, []);

  function handleUnLoad(event) {
    event.returnValue = null;
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnLoad);
    // setCustomerDetails({ ...customerDetails, dob: getTodayDate() });
  }, []);

  return (
    <div className={`${styles["ifd-wrapper"]} `}>
      <div className={`${styles["container"]} `}>
        {isHomePage ? (
          <>
            <div id="poster-container" className={styles["poster-container"]} ref={sliderRef} style={{ overflow: "auto", maxHeight: "100%" }}>
              <Parallax renderLayer={(percentage) => setimg1Scale(Math.round(percentage * 10) / 10)} parent={sliderRef.current} bgImage={"/IFD/banner-1.png"} strength={100}>
                <div style={{ height: 580 }}></div>
              </Parallax>
              <Parallax renderLayer={(percentage) => setimg2Scale(Math.round(percentage * 10) / 10)} parent={sliderRef.current} bgImage={"/IFD/banner-2.png"} strength={80}>
                <div style={{ height: 580 }}></div>
              </Parallax>
              <Parallax renderLayer={(percentage) => setimg3Scale(Math.round(percentage * 10) / 10)} parent={sliderRef.current} bgImage={"/IFD/banner-3.png"} strength={50}>
                <div style={{ height: 580 }}></div>
              </Parallax>
              <Parallax renderLayer={(percentage) => setimg4Scale(Math.round(percentage * 10) / 10)} parent={sliderRef.current} bgImage={"/IFD/banner-4.png"} strength={-20}>
                <div style={{ height: 580 }}></div>
              </Parallax>
            </div>

            <div style={{ width: "100%", zIndex: 1, position: "fixed", bottom: 0, left: 0, right: 0, margin: "auto", height: "max-content", maxWidth: "400px" }}>
              <div id="thumbnail-container" className={styles["thumbnail-container"]}>
                <div className={styles["thumbnail"]} style={{ transition: "0.5s", transform: `scale(${0.5 <= img1Scale && img1Scale <= 1 ? 0.3 + img1Scale : 1})` }}>
                  <img src="/IFD/banner-1.png" alt="" />
                </div>
                <div className={styles["thumbnail"]} style={{ transition: "0.5s", transform: `scale(${0.5 <= img2Scale && img2Scale <= 1.1 ? 0.4 + img2Scale : 1})` }}>
                  <img src="/IFD/banner-2.png" alt="" />
                </div>
                <div className={styles["thumbnail"]} style={{ transition: "0.5s", transform: `scale(${0.5 <= img3Scale && img3Scale <= 1.1 ? 0.5 + img3Scale : 1})` }}>
                  <img src="/IFD/banner-3.png" alt="" />
                </div>
                <div className={styles["thumbnail"]} style={{ transition: "0.5s", transform: `scale(${0.5 <= img4Scale && img4Scale <= 1.1 ? 0.5 + img4Scale : 1})` }}>
                  <img src="/IFD/banner-4.png" alt="" />
                </div>
              </div>
              <button id="primary-floating-button" onClick={navigateToRewardPage} className={styles["primary-floating-button"]}>
                <p>Participate in IFD</p>
              </button>

              {/* <svg
                id="secondary-floating-button"
                style={{ position: "absolute", bottom: "30px", right: "20px" }}
                width={45}
                height={106}
                viewBox="0 0 45 106"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <g onClick={() => window.open("/store-finder", "_blank")} style={{ cursor: "pointer" }} id="discount-offer">
                    <circle id="Ellipse 25" cx="22.5" cy="83.5" r="22.5" fill="url(#paint0_linear_4292_21012)" />
                    <g id="Group 217">
                      <path id="Vector" d="M28.9689 76.9946L15.2278 90.0814" stroke="#41197B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        id="Vector_2"
                        d="M17.1364 81.3578C18.612 81.3578 19.8082 80.2186 19.8082 78.8132C19.8082 77.4078 18.612 76.2686 17.1364 76.2686C15.6607 76.2686 14.4645 77.4078 14.4645 78.8132C14.4645 80.2186 15.6607 81.3578 17.1364 81.3578Z"
                        stroke="#41197B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_3"
                        d="M27.0603 90.8088C28.5359 90.8088 29.7322 89.6695 29.7322 88.2641C29.7322 86.8588 28.5359 85.7195 27.0603 85.7195C25.5847 85.7195 24.3884 86.8588 24.3884 88.2641C24.3884 89.6695 25.5847 90.8088 27.0603 90.8088Z"
                        stroke="#41197B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                  <g onClick={() => window.open("/store-finder", "_blank")} style={{ cursor: "pointer" }} id="store-finder">
                    <circle id="Ellipse 24" cx="22.5" cy="22.5" r="22.5" fill="url(#paint1_linear_4292_21012)" />
                    <g id="store" clipPath="url(#clip0_4292_21012)">
                      <path
                        id="Vector_4"
                        d="M30.2782 18.3014C30.1968 17.8855 29.8262 17.5781 29.3923 17.5781H16.4106C15.9766 17.5781 15.606 17.8855 15.5246 18.3014L14.7653 22.0982V23.0022C14.7653 23.4995 15.1721 23.9063 15.6693 23.9063V28.4264C15.6693 28.9236 16.0761 29.3304 16.5733 29.3304H23.8054C24.3026 29.3304 24.7095 28.9236 24.7095 28.4264V23.9063H28.3255V28.4264C28.3255 28.9236 28.7323 29.3304 29.2295 29.3304C29.7267 29.3304 30.1336 28.9236 30.1336 28.4264V23.9063C30.6308 23.9063 31.0376 23.4995 31.0376 23.0022V22.0982L30.2782 18.3014ZM22.9014 27.5223H17.4773V23.9063H22.9014V27.5223ZM16.5733 16.6741H29.2295C29.7267 16.6741 30.1336 16.2673 30.1336 15.7701C30.1336 15.2729 29.7267 14.8661 29.2295 14.8661H16.5733C16.0761 14.8661 15.6693 15.2729 15.6693 15.7701C15.6693 16.2673 16.0761 16.6741 16.5733 16.6741Z"
                        fill="#41197B"
                      />
                    </g>
                  </g>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_4292_21012" x1="22.5" y1={61} x2="22.5" y2={106} gradientUnits="userSpaceOnUse">
                    <stop offset="0.503125" stopColor="#EFC255" />
                    <stop offset={1} stopColor="#DD9E2C" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_4292_21012" x1="22.5" y1={0} x2="22.5" y2={45} gradientUnits="userSpaceOnUse">
                    <stop offset="0.503125" stopColor="#EFC255" />
                    <stop offset={1} stopColor="#DD9E2C" />
                  </linearGradient>
                  <clipPath id="clip0_4292_21012">
                    <rect width="21.6964" height="21.6964" fill="white" transform="translate(12.0532 11.25)" />
                  </clipPath>
                </defs>
              </svg> */}
            </div>
            <span
              id="home-button-span"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "48%",
                zIndex: 0,
                opacity: 0,
                borderRadius: "100%",
                background: "linear-gradient(180deg, #efc255 50.31%, #dd9e2c 100%)",
                width: "30px",
                height: "30px",
              }}
            ></span>
          </>
        ) : (
          <IFD setIsHomePage={setIsHomePage} userLoggedIn={userLoggedIn} />
        )}
      </div>
      <p style={{ position: "absolute", bottom: "-5px", margin: 0 }} ref={ref}></p>
    </div>
  );
};
