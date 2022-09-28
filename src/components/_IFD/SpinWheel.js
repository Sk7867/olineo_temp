import gsap from "gsap";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import IFDContext from "../../Contexts/IFDContext";
import styles from "./_IFD.module.css";
import ReactCanvasConfetti from "react-canvas-confetti";
import { toast } from "react-toastify";

const SpinWheel = ({ navigateForward }) => {
  const [isSpinningStarted, setIsSpinningStarted] = useState(false);

  const [product_redeemed_id, setProduct_redeemed_id] = useState(null);

  const { storeDetails, customerDetails, productDetails, rewardProducts, setProductDetails, customerExperience } = useContext(IFDContext);

  const audio = new Audio("IFD/confetti.wav");
  audio.volume = 0.2;
  const sendCustomerDetails = async () => {
    let is_gte15k;
    if (productDetails.selectedCategory === "phones") {
      let mop = productDetails.phonesData.find((phone) => phone.id === productDetails.product_purchased).mop;
      is_gte15k = mop >= 15000;
    } else {
      is_gte15k = productDetails.selectedCategory === "tablet" || productDetails.selectedCategory === "laptop" || productDetails.selectedCategory === "tv";
    }
    const payload = {
      store_id: storeDetails.id,
      otp: productDetails.otp,
      name: customerDetails.fullName,
      email: customerDetails.email,
      phone: customerDetails.mobileNumber,
      dob: customerDetails.dob,
      feedback: customerExperience,
      coupon_code: productDetails.coupon_code,
      product_redeemed: productDetails.product_redeemed,
      is_gte15k,
    };
    if (productDetails.selectedCategory === "phones") {
      payload["imei"] = productDetails.imei;
      payload["product_purchased"] = productDetails.product_purchased;
    } else {
      payload["other_product_purchased"] = productDetails.other_product_purchased;
    }
    const response = await fetch(`${process.env.REACT_APP_IFD_BASE_URL}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
  };

  const sendEmailToCustomer = async () => {
    const payload = {
      coupon_code: productDetails.coupon_code,
      otp: productDetails.otp,
      customer_email: customerDetails.email,
      customer_name: customerDetails.fullName,
      product_name: productDetails.product_redeemed,
    };
    const response = await fetch(`${process.env.REACT_APP_IFD_BASE_URL}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
  };

  const spinWheel = () => {
    // navigator.vibrate([30, 20, 40]);
    let timeout;
    clearTimeout(timeout);
    if (product_redeemed_id === null)
      return toast.error("Products unavailable at the store. Please check with the store salesperson.", {
        toastId: "spin-wheel-error",
        autoClose: 3000,
        hideProgressBar: false,
        position: "top-center",
      });
    if (isSpinningStarted) return;
    setIsSpinningStarted(true);
    gsap.fromTo(
      "#spin-circle",
      { rotate: 30 },
      {
        rotate: 6120 - 60 * product_redeemed_id,
        duration: 16,
        ease: "back.inOut(0.3)",
        transformOrigin: "center",
        onComplete: () => {
          fire();
          setTimeout(() => {
            navigateForward("spinWheelSection", "productRevealSection");
            audio.play();
          }, 1500);
          sendEmailToCustomer();
          sendCustomerDetails();
        },
      }
    );
  };

  useEffect(() => {
    gsap.set("#spin-circle", { rotate: 30, transformOrigin: "center" });
  }, []);

  const redeemProduct = async () => {
    let is_gte15k;
    if (productDetails.selectedCategory === "phones") {
      let mop = productDetails.phonesData.find((phone) => phone.id === productDetails.product_purchased).mop;
      is_gte15k = mop >= 15000;
    } else {
      is_gte15k = productDetails.selectedCategory === "tablet" || productDetails.selectedCategory === "laptop" || productDetails.selectedCategory === "tv";
    }
    const response = await fetch(
      `${process.env.REACT_APP_IFD_BASE_URL}/product-redeem?customer_email=${customerDetails.email}&store_id=${storeDetails.id}&otp=${productDetails.otp}&is_gte15k=${is_gte15k}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    // console.log(data);
    if (response.status === 200) {
      setProductDetails((prev) => ({ ...prev, coupon_code: data.coupon_code, product_redeemed: data.product_redeemed, product_redeemed_id: data.id }));
      setProduct_redeemed_id(data.id);
    }
  };

  useEffect(() => {
    console.log(productDetails);
    if (productDetails.product_redeemed !== null) return;
    redeemProduct();
  }, []);

  // Confetti
  const refAnimationInstance = useRef(null);

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 1.1 },
        particleCount: Math.floor(800 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.6, {
      spread: 40,
      startVelocity: 100,
      // gravity: 0.2,
      ticks: 600,
      decay: 0.9,
    });

    makeShot(0.35, {
      startVelocity: 85,
      spread: 50,
      decay: 0.9,
      ticks: 600,
      scalar: 1.2,
    });
  }, [makeShot]);

  return (
    <div className={styles["spin-wheel-container"]}>
      <div className={styles["product-card-section"]}>
        <h2 className={styles["product-card-top-heading"]}>Spin Wheel For Amazing Surprise</h2>

        <div id="product-card-container" className={styles["product-card-container"]}>
          {rewardProducts.map((item, idx) => {
            return (
              <div key={idx} className={styles["product-card"]}>
                <img width="120" height="120" src={item.dataUrl} alt="" />
                <div className={styles["product-card-inner"]}>
                  <span className={styles["mrp"]}>₹{item.mrp}</span>
                  <span className={styles["mop"]}>₹{item.mop}</span>

                  <p className={styles["name"]}>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <svg id={styles["spin-wheel"]} width={387} height={398} viewBox="0 0 387 398" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Wheel ">
            <g id="Background Main">
              <ellipse id="BG Circle" cx={193} cy="200.253" rx={152} ry={154} fill="#79539E" />
              <g id="Vector" filter="url(#filter0_ddii_13_2)">
                <path
                  d="M53.9998 196.253C53.9998 199.015 51.7612 201.253 48.9998 201.253C46.2384 201.253 43.9998 199.015 43.9998 196.253C43.9998 193.492 46.2384 191.253 48.9998 191.253C51.7612 191.253 53.9998 193.492 53.9998 196.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M51.9998 196.253C51.9998 197.91 50.6567 199.253 48.9998 199.253C47.343 199.253 45.9998 197.91 45.9998 196.253C45.9998 194.596 47.343 193.253 48.9998 193.253C50.6567 193.253 51.9998 194.596 51.9998 196.253Z"
                  fill="url(#paint0_radial_13_2)"
                />
              </g>
              <g id="Vector_2" filter="url(#filter1_ddii_13_2)">
                <path
                  d="M82.9998 113.253C82.9998 116.015 80.7612 118.253 77.9998 118.253C75.2384 118.253 72.9998 116.015 72.9998 113.253C72.9998 110.492 75.2384 108.253 77.9998 108.253C80.7612 108.253 82.9998 110.492 82.9998 113.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M80.9998 113.253C80.9998 114.91 79.6567 116.253 77.9998 116.253C76.343 116.253 74.9998 114.91 74.9998 113.253C74.9998 111.596 76.343 110.253 77.9998 110.253C79.6567 110.253 80.9998 111.596 80.9998 113.253Z"
                  fill="url(#paint1_radial_13_2)"
                />
              </g>
              <g id="Vector_3" filter="url(#filter2_ddii_13_2)">
                <path
                  d="M160 60.2532C160 63.0146 157.761 65.2532 155 65.2532C152.238 65.2532 150 63.0146 150 60.2532C150 57.4918 152.238 55.2532 155 55.2532C157.761 55.2532 160 57.4918 160 60.2532Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M158 60.2532C158 61.91 156.657 63.2532 155 63.2532C153.343 63.2532 152 61.91 152 60.2532C152 58.5963 153.343 57.2532 155 57.2532C156.657 57.2532 158 58.5963 158 60.2532Z"
                  fill="url(#paint2_radial_13_2)"
                />
              </g>
              <g id="Vector_4" filter="url(#filter3_ddii_13_2)">
                <path
                  d="M238 61.2532C238 64.0146 235.761 66.2532 233 66.2532C230.238 66.2532 228 64.0146 228 61.2532C228 58.4918 230.238 56.2532 233 56.2532C235.761 56.2532 238 58.4918 238 61.2532Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M236 61.2532C236 62.91 234.657 64.2532 233 64.2532C231.343 64.2532 230 62.91 230 61.2532C230 59.5963 231.343 58.2532 233 58.2532C234.657 58.2532 236 59.5963 236 61.2532Z"
                  fill="url(#paint3_radial_13_2)"
                />
              </g>
              <g id="Vector_5" filter="url(#filter4_ddii_13_2)">
                <path
                  d="M299 96.2532C299 99.0146 296.761 101.253 294 101.253C291.238 101.253 289 99.0146 289 96.2532C289 93.4918 291.238 91.2532 294 91.2532C296.761 91.2532 299 93.4918 299 96.2532Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M297 96.2532C297 97.91 295.657 99.2532 294 99.2532C292.343 99.2532 291 97.91 291 96.2532C291 94.5963 292.343 93.2532 294 93.2532C295.657 93.2532 297 94.5963 297 96.2532Z"
                  fill="url(#paint4_radial_13_2)"
                />
              </g>
              <g id="Vector_6" filter="url(#filter5_ddii_13_2)">
                <path
                  d="M336 157.253C336 160.015 333.761 162.253 331 162.253C328.238 162.253 326 160.015 326 157.253C326 154.492 328.238 152.253 331 152.253C333.761 152.253 336 154.492 336 157.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M334 157.253C334 158.91 332.657 160.253 331 160.253C329.343 160.253 328 158.91 328 157.253C328 155.596 329.343 154.253 331 154.253C332.657 154.253 334 155.596 334 157.253Z"
                  fill="url(#paint5_radial_13_2)"
                />
              </g>
              <g id="Vector_7" filter="url(#filter6_ddii_13_2)">
                <path
                  d="M339 233.253C339 236.015 336.761 238.253 334 238.253C331.238 238.253 329 236.015 329 233.253C329 230.492 331.238 228.253 334 228.253C336.761 228.253 339 230.492 339 233.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M337 233.253C337 234.91 335.657 236.253 334 236.253C332.343 236.253 331 234.91 331 233.253C331 231.596 332.343 230.253 334 230.253C335.657 230.253 337 231.596 337 233.253Z"
                  fill="url(#paint6_radial_13_2)"
                />
              </g>
              <g id="Vector_8" filter="url(#filter7_ddii_13_2)">
                <path
                  d="M148 336.253C148 339.015 145.761 341.253 143 341.253C140.238 341.253 138 339.015 138 336.253C138 333.492 140.238 331.253 143 331.253C145.761 331.253 148 333.492 148 336.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M146 336.253C146 337.91 144.657 339.253 143 339.253C141.343 339.253 140 337.91 140 336.253C140 334.596 141.343 333.253 143 333.253C144.657 333.253 146 334.596 146 336.253Z"
                  fill="url(#paint7_radial_13_2)"
                />
              </g>
              <g id="Vector_9" filter="url(#filter8_ddii_13_2)">
                <path
                  d="M81.9998 285.253C81.9998 288.015 79.7612 290.253 76.9998 290.253C74.2384 290.253 71.9998 288.015 71.9998 285.253C71.9998 282.492 74.2384 280.253 76.9998 280.253C79.7612 280.253 81.9998 282.492 81.9998 285.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M79.9998 285.253C79.9998 286.91 78.6567 288.253 76.9998 288.253C75.343 288.253 73.9998 286.91 73.9998 285.253C73.9998 283.596 75.343 282.253 76.9998 282.253C78.6567 282.253 79.9998 283.596 79.9998 285.253Z"
                  fill="url(#paint8_radial_13_2)"
                />
              </g>
              <g id="Vector_10" filter="url(#filter9_ddii_13_2)">
                <path
                  d="M309 293.253C309 296.015 306.761 298.253 304 298.253C301.238 298.253 299 296.015 299 293.253C299 290.492 301.238 288.253 304 288.253C306.761 288.253 309 290.492 309 293.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M307 293.253C307 294.91 305.657 296.253 304 296.253C302.343 296.253 301 294.91 301 293.253C301 291.596 302.343 290.253 304 290.253C305.657 290.253 307 291.596 307 293.253Z"
                  fill="url(#paint9_radial_13_2)"
                />
              </g>
              <g id="Vector_11" filter="url(#filter10_ddii_13_2)">
                <path
                  d="M234 341.253C234 344.015 231.761 346.253 229 346.253C226.238 346.253 224 344.015 224 341.253C224 338.492 226.238 336.253 229 336.253C231.761 336.253 234 338.492 234 341.253Z"
                  fill="#FFDCE9"
                />
                <path
                  d="M232 341.253C232 342.91 230.657 344.253 229 344.253C227.343 344.253 226 342.91 226 341.253C226 339.596 227.343 338.253 229 338.253C230.657 338.253 232 339.596 232 341.253Z"
                  fill="url(#paint10_radial_13_2)"
                />
              </g>
            </g>
            <g id="spin-circle" className={`${styles["spin-circle"]} `}>
              <g id="Ellipse 2" filter="url(#filter11_d_13_2)">
                <circle cx="193.783" cy="199.68" r="136.5" transform="rotate(-29 193.783 199.68)" fill="#FDFDFD" />
              </g>
              <g id="Group 5">
                <g id="Group 8">
                  <g id="Group 3">
                    <path
                      id="Vector 1"
                      d="M153.058 199.526L57.1736 197.656C57.2726 199.879 57.3904 208.182 57.5487 211.74C57.7467 216.187 59.2338 228.293 61.5644 235.577C63.1126 240.415 66.0322 248.535 69.6294 256.594C73.2265 264.652 83.0391 281.476 93.5618 293.301C98.2986 298.625 104.385 303.975 110.368 308.633C114.76 312.052 122.967 316.314 126.311 318.258L174.121 238.547C172.899 237.706 169.856 235.557 167.463 233.693C164.472 231.364 161.623 227.247 160.898 225.94C160.173 224.633 155.826 216.789 154.761 212.823C153.909 209.649 153.271 202.636 153.058 199.526Z"
                      fill="url(#paint11_linear_13_2)"
                      stroke="#522177"
                      strokeWidth="0.3"
                    />
                    <g id="Ellipse 3" filter="url(#filter12_di_13_2)">
                      <circle cx="83.7759" cy="260.086" r={3} transform="rotate(-29 83.7759 260.086)" fill="url(#paint12_radial_13_2)" />
                      <circle cx="83.7759" cy="260.086" r="2.95" transform="rotate(-29 83.7759 260.086)" stroke="#17AFBB" strokeWidth="0.1" />
                    </g>
                  </g>
                  <g id="Group">
                    <path
                      id="Vector 2"
                      d="M218.89 164.423L267.225 84.6523C265.247 83.6314 264.094 82.0972 253.683 76.7234C243.273 71.3497 233.876 68.8372 229.118 67.4728C220.962 65.134 212.415 64.1546 204.549 63.37C196.682 62.5854 182.406 62.6138 165.5 66.1495C158.526 67.6083 148.918 69.2665 141.9 72.1371C136.748 74.2442 131.794 76.5954 128 79.2703L174.561 163.269C175.9 162.628 178.136 175.931 180.944 174.783C184.453 173.348 189.499 170.905 190.994 170.927C192.488 170.949 198.046 171.198 202.017 172.249C205.193 173.089 214.152 178.671 218.89 164.423Z"
                      fill="url(#paint13_linear_13_2)"
                      stroke="#522177"
                      strokeWidth="0.3"
                    />
                    <g id="Ellipse 8" filter="url(#filter13_di_13_2)">
                      <circle cx="200.703" cy="72.9335" r={3} transform="rotate(-29 200.703 72.9335)" fill="url(#paint14_radial_13_2)" />
                      <circle cx="200.703" cy="72.9335" r="2.95" transform="rotate(-29 200.703 72.9335)" stroke="#17AFBB" strokeWidth="0.1" />
                    </g>
                  </g>
                  <g id="Group 9">
                    <path
                      id="Vector 3"
                      d="M216.036 235.201L261.271 318.338C263.154 317.16 266.859 315.015 272.614 310.992C276.724 308.118 285.056 301.448 290.392 295.975C294.175 292.096 300.86 284.99 306.545 276.688C312.231 268.386 318.388 256.991 323.604 242.054C325.951 235.331 328.088 224.672 329.261 217.195C330.122 211.706 330.44 202.821 330.492 198.79L240.781 196.947C218.02 195.963 218.985 202.86 218.01 206.259C216.967 209.897 215.429 213.978 214.212 216.94C212.68 220.668 212.411 221.94 211.257 226.581C210.466 229.768 211.384 229.369 216.036 235.201Z"
                      fill="url(#paint15_linear_13_2)"
                      stroke="#522177"
                      strokeWidth="0.3"
                    />
                    <g id="Ellipse 5" filter="url(#filter14_di_13_2)">
                      <circle cx="304.642" cy="264.57" r={3} transform="rotate(-29 304.642 264.57)" fill="url(#paint16_radial_13_2)" />
                      <circle cx="304.642" cy="264.57" r="2.95" transform="rotate(-29 304.642 264.57)" stroke="#17AFBB" strokeWidth="0.1" />
                    </g>
                  </g>
                </g>
              </g>
              <g id="Group 6">
                <g id="Ellipse 7" filter="url(#filter15_di_13_2)">
                  <circle cx="85.2532" cy="136.928" r={3} transform="rotate(-29 85.2532 136.928)" fill="url(#paint17_radial_13_2)" />
                  <circle cx="85.2532" cy="136.928" r="2.95" transform="rotate(-29 85.2532 136.928)" stroke="#17AFBB" strokeWidth="0.1" />
                </g>
                <g id="Ellipse 4" filter="url(#filter16_di_13_2)">
                  <circle cx="305.54" cy="138.304" r={3} transform="rotate(-29 305.54 138.304)" fill="url(#paint18_radial_13_2)" />
                  <circle cx="305.54" cy="138.304" r="2.95" transform="rotate(-29 305.54 138.304)" stroke="#17AFBB" strokeWidth="0.1" />
                </g>
                <g id="Ellipse 6" filter="url(#filter17_di_13_2)">
                  <circle cx="193.565" cy="326.141" r={3} transform="rotate(-29 193.565 326.141)" fill="url(#paint19_radial_13_2)" />
                  <circle cx="193.565" cy="326.141" r="2.95" transform="rotate(-29 193.565 326.141)" stroke="#17AFBB" strokeWidth="0.1" />
                </g>
              </g>
              <rect id="pngwing_6" x="173.71" y="88.9122" width={47} height={49} transform="rotate(1.32954 173.71 88.9122)" fill="url(#product-img-1)" />
              <rect id="pngwing_4" width={54} height={54} transform="matrix(-0.625416 -0.780292 -0.780292 0.625416 311.651 159.101)" fill="url(#product-img-2)" />
              <rect id="pngwing_5" x="300.155" y="218.818" width={54} height="56.8929" transform="rotate(91.7824 300.155 218.818)" fill="url(#product-img-3)" />
              <rect id="pngwing" width={43} height={50} transform="matrix(0.961261 -0.275637 -0.275637 -0.961261 180.846 317.783)" fill="url(#product-img-4)" />
              <rect id="pngwing_2" width={54} height={59} transform="matrix(0.494714 0.869056 0.869056 -0.494714 75.7308 236.919)" fill="url(#product-img-5)" />
              <rect id="pngwing_3" x="82.3574" y="167.697" width={54} height={54} transform="rotate(-63.0836 82.3574 167.697)" fill="url(#product-img-6)" />
            </g>
            <g id="Top">
              <g onClick={spinWheel} style={{ cursor: product_redeemed_id === null && "help" }} id="center_spin_btn" className={styles["center-spin-btn"]}>
                <g id="Ellipse 2_2" filter="url(#filter18_d_13_2)">
                  <circle cx="195.5" cy="202.753" r="45.5" fill="#4E3088" />
                  <circle cx="195.5" cy="202.753" r={44} stroke="url(#paint20_linear_13_2)" strokeWidth={3} />
                </g>
                <g id="Spin & win" filter="url(#filter19_d_13_2)">
                  <path
                    d="M162.466 210.428C163.494 210.428 164.278 210.142 164.816 209.57C165.361 208.992 165.633 208.153 165.633 207.053C165.633 206.375 165.441 205.8 165.058 205.328C164.68 204.856 164.086 204.448 163.275 204.103C163.197 204.053 163.08 203.989 162.925 203.912C162.775 203.828 162.655 203.759 162.566 203.703C162.483 203.648 162.391 203.581 162.291 203.503C162.191 203.425 162.119 203.339 162.075 203.245C162.03 203.15 162.008 203.045 162.008 202.928C162.008 202.484 162.364 202.262 163.075 202.262C163.369 202.262 163.678 202.325 164 202.453C164.328 202.575 164.6 202.764 164.816 203.02L165.233 201.412C165.216 201.384 165.189 201.348 165.15 201.303C165.111 201.253 165.016 201.17 164.866 201.053C164.722 200.931 164.561 200.825 164.383 200.737C164.205 200.648 163.958 200.567 163.641 200.495C163.33 200.417 162.997 200.378 162.641 200.378C160.403 200.378 159.283 201.37 159.283 203.353C159.283 203.72 159.339 204.064 159.45 204.387C159.561 204.703 159.689 204.964 159.833 205.17C159.978 205.37 160.164 205.564 160.391 205.753C160.625 205.937 160.811 206.07 160.95 206.153C161.089 206.231 161.258 206.32 161.458 206.42C162.008 206.687 162.394 206.914 162.616 207.103C162.844 207.292 162.958 207.52 162.958 207.787C162.958 208.037 162.858 208.209 162.658 208.303C162.464 208.398 162.144 208.445 161.7 208.445C161.255 208.445 160.841 208.334 160.458 208.112C160.075 207.884 159.769 207.617 159.541 207.312L159.333 209.337C159.439 209.448 159.569 209.559 159.725 209.67C159.886 209.781 160.091 209.898 160.341 210.02C160.591 210.142 160.9 210.239 161.266 210.312C161.639 210.389 162.039 210.428 162.466 210.428ZM169.774 210.253V208.187C169.78 208.187 169.813 208.189 169.874 208.195C169.936 208.2 169.977 208.203 169.999 208.203C170.022 208.203 170.063 208.206 170.124 208.212C170.191 208.212 170.241 208.214 170.274 208.22C170.313 208.22 170.363 208.223 170.424 208.228C170.491 208.228 170.547 208.231 170.591 208.237C170.641 208.237 170.694 208.237 170.749 208.237C170.811 208.237 170.869 208.237 170.924 208.237C171.358 208.237 171.769 208.139 172.158 207.945C172.547 207.75 172.894 207.473 173.199 207.112C173.505 206.75 173.747 206.289 173.924 205.728C174.108 205.162 174.199 204.534 174.199 203.845C174.199 202.7 173.922 201.842 173.366 201.27C172.811 200.698 171.994 200.412 170.916 200.412C170.533 200.412 170.044 200.425 169.449 200.453C168.855 200.475 168.411 200.487 168.116 200.487H167.016V210.253H169.774ZM171.466 203.478V204.712C171.466 205.267 171.344 205.692 171.099 205.987C170.861 206.281 170.522 206.428 170.083 206.428H169.774V202.095H170.174C170.591 202.095 170.911 202.223 171.133 202.478C171.355 202.734 171.466 203.067 171.466 203.478ZM175.354 210.253H178.195V200.487H175.354V210.253ZM182.483 210.253V207.178L181.991 203.978L183.216 206.395L185.199 210.253H187.741V200.487H185.083V203.103L185.491 206.812L184.024 203.653L182.491 200.487H179.424L179.833 201.27V210.253H182.483ZM199.185 209.953C199.624 210.253 200.252 210.403 201.069 210.403C201.158 210.403 201.277 210.395 201.427 210.378L202.069 208.92C201.68 208.837 201.288 208.631 200.894 208.303C201.066 208.075 201.199 207.887 201.294 207.737C201.388 207.581 201.483 207.334 201.577 206.995C201.672 206.65 201.719 206.262 201.719 205.828L199.494 205.762C199.533 205.878 199.541 206.02 199.519 206.187C199.502 206.353 199.477 206.503 199.444 206.637C199.416 206.764 199.377 206.892 199.327 207.02C199.144 206.87 198.941 206.662 198.719 206.395C198.502 206.123 198.352 205.912 198.269 205.762C198.974 205.323 199.494 204.862 199.827 204.378C200.166 203.889 200.335 203.334 200.335 202.712C200.335 202.412 200.283 202.128 200.177 201.862C200.072 201.589 199.908 201.334 199.685 201.095C199.463 200.85 199.147 200.656 198.735 200.512C198.324 200.367 197.847 200.295 197.302 200.295C196.069 200.295 195.188 200.512 194.66 200.945C194.138 201.378 193.877 202.02 193.877 202.87C193.877 203.098 193.913 203.325 193.985 203.553C194.058 203.781 194.138 203.967 194.227 204.112C194.316 204.256 194.41 204.412 194.51 204.578C194.616 204.745 194.685 204.864 194.719 204.937C194.202 205.148 193.747 205.462 193.352 205.878C192.958 206.295 192.76 206.784 192.76 207.345C192.76 208.256 193.08 209.017 193.719 209.628C194.358 210.234 195.233 210.537 196.344 210.537C197.76 210.537 198.708 210.342 199.185 209.953ZM195.235 207.395C195.235 207.106 195.26 206.895 195.31 206.762C195.36 206.628 195.452 206.523 195.585 206.445C196.13 207.378 196.852 208.159 197.752 208.787C197.697 208.814 197.624 208.85 197.535 208.895C197.447 208.939 197.38 208.973 197.335 208.995C197.291 209.012 197.238 209.034 197.177 209.062C197.116 209.084 197.058 209.1 197.002 209.112C196.947 209.117 196.885 209.12 196.819 209.12C196.397 209.12 196.027 208.959 195.71 208.637C195.394 208.314 195.235 207.9 195.235 207.395ZM197.26 201.462C197.733 201.462 197.969 201.867 197.969 202.678C197.969 202.945 197.958 203.153 197.935 203.303C197.919 203.448 197.858 203.62 197.752 203.82C197.647 204.02 197.485 204.209 197.269 204.387C196.858 203.914 196.652 203.395 196.652 202.828C196.652 201.917 196.855 201.462 197.26 201.462ZM211.037 210.253L211.895 206.328L212.92 210.253H215.762L217.912 200.487H215.378L214.887 203.853L214.428 207.12L213.695 203.853L213.095 200.487H210.37L211.012 202.962L210.795 203.853L209.953 207.12L209.295 203.853L208.853 200.487H206.078L208.403 210.253H211.037ZM218.612 210.253H221.454V200.487H218.612V210.253ZM225.741 210.253V207.178L225.25 203.978L226.475 206.395L228.458 210.253H231V200.487H228.341V203.103L228.75 206.812L227.283 203.653L225.75 200.487H222.683L223.091 201.27V210.253H225.741Z"
                    fill="url(#paint21_radial_13_2)"
                  />
                </g>
              </g>
              <path
                id="Pointer"
                d="M194 46.7532C183 46.7532 174.5 47.2532 168 48.7532C168.666 51.2532 172.1 59.7798 174.5 65.3798C177.5 72.3798 182.176 81.7532 186 88.2532C187.445 90.7095 193.836 101.104 194 100.88C199.5 93.3798 201.5 89.2532 203.5 85.7532C204.657 83.7281 208.411 76.2532 210.5 71.3798C212.9 65.7798 217.666 53.5865 219 48.7532C217 48.2532 205.207 46.7532 194 46.7532Z"
                fill="url(#paint22_linear_13_2)"
                stroke="url(#paint23_linear_13_2)"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_ddii_13_2" x="37.9998" y="185.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter1_ddii_13_2" x="66.9998" y="102.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter2_ddii_13_2" x={144} y="49.2532" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter3_ddii_13_2" x={222} y="50.2532" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter4_ddii_13_2" x={283} y="85.2532" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter5_ddii_13_2" x={320} y="146.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter6_ddii_13_2" x={323} y="222.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter7_ddii_13_2" x={132} y="325.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter8_ddii_13_2" x="65.9998" y="274.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter9_ddii_13_2" x={293} y="282.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter10_ddii_13_2" x={218} y="330.253" width={22} height={22} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_13_2" result="effect2_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_13_2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_13_2" result="effect4_innerShadow_13_2" />
            </filter>
            <filter id="filter11_d_13_2" x="29.2582" y="35.1548" width="329.05" height="329.05" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={3} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2" />
              <feOffset />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.320668 0 0 0 0 0.127931 0 0 0 0 0.508333 0 0 0 0.94 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
            </filter>
            <filter id="filter12_di_13_2" x="78.7754" y="256.086" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <filter id="filter13_di_13_2" x="195.702" y="68.9329" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <filter id="filter14_di_13_2" x="299.642" y="260.57" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <filter id="filter15_di_13_2" x="80.2526" y="132.928" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <filter id="filter16_di_13_2" x="300.539" y="134.303" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <filter id="filter17_di_13_2" x="188.565" y="322.141" width="10.0011" height="10.0011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={1} />
              <feGaussianBlur stdDeviation={1} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect2_innerShadow_13_2" />
              <feOffset dy={-1} />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_13_2" />
            </filter>
            <pattern id="product-img-1" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image1_13_2-img-1" transform="translate(-0.157895) scale(0.00138775 0.00107875)" />
            </pattern>
            <pattern id="product-img-2" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image2_13_2-img-2" transform="scale(0.00125)" />
            </pattern>
            <pattern id="product-img-3" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image3_13_2-img-3" transform="translate(-0.107143 -0.0677966) scale(0.00120326 0.00114208)" />
            </pattern>
            <pattern id="product-img-4" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image4_13_2-img-4" transform="translate(-0.00872093) scale(0.00170999 0.00147059)" />
            </pattern>
            <pattern id="product-img-5" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image5_13_2-img-5" transform="translate(-0.414634) scale(0.000783972 0.000714286)" />
            </pattern>
            <pattern id="product-img-6" patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref="#image6_13_2-img-6" transform="scale(0.000714286)" />
            </pattern>
            <filter id="filter18_d_13_2" x={142} y="149.253" width={107} height={107} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={4} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.909804 0 0 0 0 0.737255 0 0 0 0 0.384314 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
            </filter>
            <filter id="filter19_d_13_2" x="156.783" y="199.795" width="76.7166" height="15.2416" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={2} />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2" result="shape" />
            </filter>
            <radialGradient id="paint0_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(48.9998 196.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint1_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(77.9998 113.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint2_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(155 60.2532) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint3_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(233 61.2532) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint4_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(294 96.2532) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint5_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(331 157.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint6_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(334 233.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint7_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(143 336.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint8_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(76.9998 285.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint9_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(304 293.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <radialGradient id="paint10_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(229 341.253) rotate(90) scale(3)">
              <stop stopColor="white" />
              <stop offset={1} stopColor="#90EBFF" />
            </radialGradient>
            <linearGradient id="paint11_linear_13_2" x1="78.0831" y1="271.845" x2="158.704" y2="220.952" gradientUnits="userSpaceOnUse">
              <stop stopColor="#502076" />
              <stop offset={1} stopColor="#6A2575" />
            </linearGradient>
            <radialGradient id="paint12_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(83.7759 260.086) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <linearGradient id="paint13_linear_13_2" x1="193.483" y1="63.3994" x2="197.496" y2="158.655" gradientUnits="userSpaceOnUse">
              <stop stopColor="#502076" />
              <stop offset={1} stopColor="#6A2575" />
            </linearGradient>
            <radialGradient id="paint14_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(200.703 72.9335) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <linearGradient id="paint15_linear_13_2" x1="315.74" y1="263.876" x2="232.966" y2="218.853" gradientUnits="userSpaceOnUse">
              <stop stopColor="#502076" />
              <stop offset={1} stopColor="#6A2575" />
            </linearGradient>
            <radialGradient id="paint16_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(304.642 264.57) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <radialGradient id="paint17_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(85.2531 136.928) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <radialGradient id="paint18_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(305.539 138.304) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <radialGradient id="paint19_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(193.565 326.141) rotate(90) scale(3)">
              <stop stopColor="#1DE1F1" />
              <stop offset={1} stopColor="#75D0E4" />
            </radialGradient>
            <linearGradient id="paint20_linear_13_2" x1="195.5" y1="157.253" x2="195.5" y2="248.253" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DC972F" />
              <stop offset={1} stopColor="#ECCB76" />
            </linearGradient>
            <radialGradient id="paint21_radial_13_2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(197.556 205.003) rotate(-3.05524) scale(42.2149 436.613)">
              <stop offset="0.282641" stopColor="#FFD76F" />
              <stop offset={1} stopColor="#FFAE10" />
            </radialGradient>
            <linearGradient id="paint22_linear_13_2" x1="193.5" y1="48.8016" x2="193.5" y2="100.886" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EA9957" />
              <stop offset="0.592545" stopColor="#FCDA80" />
            </linearGradient>
            <linearGradient id="paint23_linear_13_2" x1="193.25" y1="48.8016" x2="193.25" y2="101.291" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEE8AE" />
              <stop offset={1} stopColor="#D08021" />
            </linearGradient>
            <image id="image1_13_2-img-1" data-name="pngwing.png" width={1024} height={927} xlinkHref={rewardProducts[0].dataUrl} />
            <image id="image2_13_2-img-2" data-name="pngwing.png" width={800} height={800} xlinkHref={rewardProducts[1].dataUrl} />
            <image id="image3_13_2-img-3" data-name="pngwing.png" width={1024} height={1024} xlinkHref={rewardProducts[2].dataUrl} />

            <image id="image4_13_2-img-4" data-name="pngwing.png" width={595} height={680} xlinkHref={rewardProducts[3].dataUrl} />
            <image id="image5_13_2-img-5" data-name="pngwing.png" width={2000} height={1400} xlinkHref={rewardProducts[4].dataUrl} />
            <image id="image6_13_2-img-6" data-name="pngwing.png" width={1400} height={1400} xlinkHref={rewardProducts[5].dataUrl} />
          </defs>
        </svg>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

export default SpinWheel;
