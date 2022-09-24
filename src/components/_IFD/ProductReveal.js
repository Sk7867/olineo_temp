import React, { useCallback, useState } from "react";
import { useRef } from "react";
import styles from "./_IFD.module.css";
import html2canvas from "html2canvas";
import ReactCanvasConfetti from "react-canvas-confetti";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { useEffect } from "react";
import { useContext } from "react";
import IFDContext from "../../Contexts/IFDContext";
// import blob from "../../assets/png/product_1.png";

const ProductReveal = () => {
  const eleRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { rewardProducts, storeDetails, productDetails } = useContext(IFDContext);

  const share = async () => {
    const blob = await fetch("poster-1.png").then((r) => r.blob());
    let data = {
      title: "Indian Festival Days at O-LINE-O ",
      text: `I just won a ${productDetails.product_redeemed} at ${storeDetails.name} in O-LINE-O Indian Festival Days`,
      files: [new File([blob], "image.png", { type: blob.type })],
    };

    try {
      if (!navigator.canShare(data)) {
        throw new Error("Can't share data.", data);
      }
      await navigator.share(data);
    } catch (err) {
      alert(err.name, err.message);
    }
  };

  const download = async () => {
    setIsDownloading(true);
    setTimeout(async () => {
      const canvas = await html2canvas(eleRef.current);
      canvas.getContext("2d");
      let imgData = canvas.toDataURL("image/jpeg", 10000000000);
      let a = document.createElement("a");
      a.href = imgData;
      a.download = `O-line-O Coupon.png`;
      a.click();
      setIsDownloading(false);
      console.log("done");
    }, 100);
  };

  // Confetti
  const refAnimationInstance = useRef(null);

  const canvasStyles = {
    position: "absolute",
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
        origin: { y: 0.55 },
        particleCount: Math.floor(500 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.6, {
      spread: 80,
      startVelocity: 70,
      // gravity: 0.2,
      ticks: 600,
      decay: 0.9,
    });

    makeShot(0.35, {
      startVelocity: 60,
      spread: 50,
      decay: 0.9,
      ticks: 600,
      scalar: 1.2,
    });

    makeShot(0.2, {
      spread: 80,
      startVelocity: 30,
      ticks: 600,
      decay: 0.92,
      scalar: 1,
    });
  }, [makeShot]);

  useEffect(() => {
    setTimeout(() => {
      fire();
    }, 200);
    setTimeout(() => {
      fire();
    }, 450);
    setTimeout(() => {
      fire();
    }, 700);
  }, []);

  return (
    <div style={{ paddingBottom: "80px" }} className={styles["product-reveal-container"]}>
      <div ref={eleRef} style={{ backgroundColor: "#41236d", padding: "40px 0", position: "relative" }}>
        <h2 className={styles["product-reveal-heading"]}>You Won A Reward</h2>
        <div className={styles["product-img-box"]}>
          {/* <img style={{ position: "absolute", top: "-50px", left: "25px" }} src="/confetti.png" alt="" /> */}
          <img src={rewardProducts[productDetails.product_redeemed_id]?.dataUrl} alt="" />
        </div>
        <h3 className={styles["product-reveal-thankyou-text"]}>THANK YOU FOR SHOPPING AT O-LINE-O.</h3>
        <div className={styles["coupon-card"]}>
          <div className={styles["coupon-card-code-heading"]}>Coupon Code</div>
          <p className={styles["coupon-card-code-number"]}>{productDetails.coupon_code}</p>
          <div className={styles["terms-conditions-box"]}>
            <h4>Terms and conditions</h4>
            <p>
              Cash discounts, if any, will apply only on the net amount of invoices sent to Buyer after deducting transportation charges, taxes and duties, and will be allowed only if (a) the invoice
              is paid according to Seller's payment terms and
            </p>
            <button disabled={isDownloading} onClick={download}>
              <span>{isDownloading ? "Downloading..." : "Download"}</span>
            </button>
          </div>
        </div>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </div>

      <button onClick={share} className={styles["primary-button"]}>
        <p>Share</p>
      </button>

      <div className={styles["social-share-buttons"]}>
        <WhatsappShareButton
          title={`I just won a ${productDetails.product_redeemed} at ${storeDetails.name} in O-LINE-O Indian Festival Days`}
          url="https://olineo-temp-sid.netlify.app/"
          children={
            <svg width={43} height={42} viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <circle cx="21.3874" cy="20.8732" r="20.8732" fill="#F9F9F9" />
              <rect x="5.86279" y="4.86975" width={32} height={32} fill="url(#pattern0-whatsapp)" />
              <defs>
                <pattern id="pattern0-whatsapp" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#image0_4250_22336" transform="scale(0.0104167)" />
                </pattern>
                <image
                  id="image0_4250_22336"
                  width={96}
                  height={96}
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          }
        />
        <FacebookShareButton
          url="https://olineo-temp-sid.netlify.app/"
          quote={`I just won a ${productDetails.product_redeemed} at ${storeDetails.name} in O-LINE-O Indian Festival Days`}
          children={
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <circle cx="20.8732" cy="20.8732" r="20.8732" fill="#F9F9F9" />
              <rect x="5" y="5" width="32" height="32" fill="url(#pattern0-facebook-icon)" />
              <defs>
                <pattern id="pattern0-facebook-icon" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_4250_22339" transform="scale(0.0104167)" />
                </pattern>
                <image
                  id="image0_4250_22339"
                  width="96"
                  height="96"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAIqUlEQVR4nO2dbXBVRxnH/8+ee3O5IYQSKCE3iQ7tgDiILVJSWqtURoUqM3aEdkbUdtom3CK21LcRRccy+NZ+YIa0nQ4J2mmxMzrSUseX8MEpCq0tAhZrlbepUAg3cRgkIYGEe8/u44dQLRXI7p4999ybnN/M/bbPy9lnz57dZ18uEBMTExMTExMTExMTExMzmqCoHbgiG3OVCSGbFNMMATGdhZrBTPUErgJoAoCxF0qeBfg0g/qJ+AQpcUAJdVAo74DPvBvZzLkoH+NKlFwAku2d8xi0iIEFAG4EUBFQZR7AqwRsJ6U6CtnGXcG9dEdpBOCnJxqFj2WCcC8D00O29hYRfu5L2Y7se94M2dawRBqA5E86r1MSXwPRMgBekc0rAL8TpNYVmhv/XGTb/yWSACTbc3MU+PsAFkVh//8g7hCgNYXm+teKbrqo1p46clXCr1jLwEoUv8UPhwLzszKFr+DuhlPFMlq0AHjtnUsBehxAbbFsWtIN0ErZknm+GMbCD0Dr4VQiXfkoAw+GbsslzJtlP2fx1caBMM2EG4D27qkC8jkCZodqJzz2Sl8sxYq6o2EZCC0AFZu6PyBZbgNQH5aNItEtmG8rLG/YF4ZyEYbSRFvXfMnqJZR/5QPAFEW0PbEp99EwlDt/AxJtXfOZ1DYAY1zrjpgBIlrkN2d2uFTqNAAVG4/PkkL8EcAEl3pLBsYZAZ7vsjtyF4D27qke1MsA1znTWZrkpC8+7OrD7OYb0Ho4JSC3jILKB4CMl1Bb0Ho45UJZwoUSr7JyPRgfcqHLBdPGJzA5LVCTGvoJAH0FRkEx+n1GXjJODSocOyvRX2AbE3MS6cpHfWBVUF8Dd0EXZri/DKonCFVJwp3XpLGwIYVbpqRQm9Z/sTfuP4uVL/faGWb6rFye2WonPESwN+Bnp6oxcL4VsGpFgUkIYNXMKqy+vgoTUna9aYUXoA0SP4mnjmzHPVN7bFUECoA3OPgjAJH0+7Vpgec+UYN5k4Ou1wRzIyGTD/vAQ7YKrD/CyfbcHDCytvJBmJwW+MPiSVFXPgCAmb6cbOu83lbeOgAK/ANEkFL2CNjy8RpMG+9k/OACTxGtsxW2CkBy04nZAD5pazQID8ysws210bf8d7E42Z6bYyNoFQDF+C4iWE0blyR8a3ZVsc1qoYBv2siZB6C9eyqAz9gYC8rnrk1jouVoJ3x4CTbl3msqZdyRCpJfBIeTRR2OO65JW8nlzkn865y65GD5WJ8M5tT/EILxeQX80ETIPACMZVGM+hMCaDIc9ezoyuOhV3rx+r8LIXl1MQJ8t2kAjFry0KYpvM/MLTfMqklibEL/s7OzO4+FHaeKVvkAwMD0ZFvXXBMZowAw021mLrmj6Wr91q8YuH9nDwqq+O+qJGm01cYsAISPmbnjDpP8zou58zjY64fozeUhFkZ1ZJC1ylUCaDJ1yBXjK/Rd/f2J8yF6MgzEN2P9ce3RgvZTJYRsAuAkB27DhJR+///G6eL1+5cglaj2tL8D2gFQTDPs/HHDuKT+G9B1ToXoyfCw0h+oaD+VoGhGP29jMu0e8KNJj78NGdSVdgA44gCYEMHg5yIYHEIAWDTYuTP6YEajblntABC42s6d0QcRj9MtazIP0FYaQ9qN1SQApZkHLk20G2vky0qTxgjsv2PysOWqkvrjoF23T9L+ED+8tw9P/OOstm7XmASgH0CNawcEwXpHw+UwmTW/1e8sHf1O+nQLmjy5ttJyIpycEZ/RLak/DAVpKy0X8opxpM99AJjJ/RtApDrt3Cld3jwj4YeQtSDCcd2y+gFgHLRzp3Q52BNOyppA2nVlkIwbeQE4ENKaARvUlX4yDt5+O3dKl0NhvQGEA7pltQPgM+8GEOFKh3tCWjUb9PvkHt3C+sPQoStfSuqmkaAcCicAfzI5W2w0EyZgOwNOTwueHFC4enP3sOWevvUqfKpR79xf0wsncURjv8/p8+6HQMy83aS8WQCU6mAhvmfm0pVh6FVE3mDC2lfgUCpXB49Eh4lloxxAIdu4izDyRkOuIGB/oSWz10TGOAmjwM+ayowWFNFmUxnzAPjeZgxddhRzMUpJGDdO8zTkirqjAL9gLDfy2YJs5pipkFUeWDDWIaqTeaUJC0WP2AhaBaCwvGEfiLfZyI5QflPIZv5iI2i9EiJAawCEsppRZvge1Hdsha0DUGiufw2MJ23lRwrE9Fi+pfF1W/lAa4GycswaALkgOsqcbp8H1gZREGwx9gsTzwD0QCAd5QsDuB/Zay3vORgi8Gq4bMk8D8bjQfWUGwTeIFvqfxVUj5PtCHLw3NcBGE3By5w9/vheq2Op78bNfpAHp52XvliK0fE9OCEVLcGdM/MulLnbkLOi7qhH3kIAp53pLDmoVwj+tM2M93I43RGVb57yBhHdDiDUy04jYoAUFhfua/irS6XOD1z7zZkdArwAQNHuXy4CPQRa6GczL7lWHMqJ90JLw6sei/kARsBeIuoSgm/1WzI7w9Ae2pUD+eV1f5e++AjKenTEu6XCPNfdzjsJ986HFXVHpeq6iQiPoOyyp9wmx/fe4vKDeynC356evaHgA6u9ttwuEJ4og6stcwC+JFsaAk+ydCjarSdyeWarTIlpF96GaI6xXxmfgFaZHvN+FzNcXYp77cxdU876zfWrBfNcMP0WpdEtMYBfe1Bz/Jb6VUP5reIRyQmZC3cvL67YeHyWJPpGpH/iI2ht4b7MnqgWNiI9opTPNv4NwF1o7/y2YLEE4HuIcF2YNgk4AOAXvpd4BvfW/jPqFaXIz4gBAFoaOhWwAcCGZFvXXElyEUEsAPgmBL+fYhBMrzDUix6JDtN9O2FTGn/kdjnWH08nqr25zJjx4xurl9wwMfHBiWO86poUVYxNkjc2QUQg9PuKB3zIk4My35vnM9mdPVsP9cp9BOz3++SesP8HJiYmJiYmJiYmJiYmJiYmRpf/AJdjvZwuEvXfAAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          }
        />
        <TwitterShareButton
          url="https://olineo-temp-sid.netlify.app/"
          title={`I just won a ${productDetails.product_redeemed} at ${storeDetails.name} in O-LINE-O Indian Festival Days`}
          hashtags={["olineo", "indianfestivaldays"]}
          children={
            <svg width={43} height={42} viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <circle cx="21.5493" cy="20.8732" r="20.8732" fill="#F9F9F9" />
              <rect x={6} y={6} width={32} height={32} fill="url(#pattern0-twitter)" />
              <defs>
                <pattern id="pattern0-twitter" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#image0_4250_22337" transform="scale(0.0104167)" />
                </pattern>
                <image
                  id="image0_4250_22337"
                  width={96}
                  height={96}
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          }
        />
        <EmailShareButton
          url="https://olineo-temp-sid.netlify.app/"
          subject="Product won at O-LINE-O Store"
          body={`I just won a ${productDetails.product_redeemed} at ${storeDetails.name} in O-LINE-O Indian Festival Days`}
          children={
            <svg version="1.1" width={43} height={43} viewBox="0 0 256 256" xmlSpace="preserve">
              <defs></defs>
              <g
                style={{ stroke: "none", strokeWidth: 0, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1 }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <circle
                  cx={45}
                  cy={45}
                  r={45}
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "white",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="  matrix(1 0 0 1 0 0) "
                />
                <path
                  d="M 41.893 53.108 L 13.5 41.926 v 21.835 c 0 3.348 3.551 6.087 7.891 6.087 h 41.005 c 4.34 0 7.891 -2.739 7.891 -6.087 V 41.926 L 41.893 53.108 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "white",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 41.893 45.452 L 13.5 34.27 c 0 -3.348 3.551 -6.087 7.891 -6.087 h 41.005 c 4.34 0 7.891 2.739 7.891 6.087 L 41.893 45.452 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "white",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 45.107 49.894 L 16.714 38.711 v 21.835 c 0 3.348 3.551 6.087 7.891 6.087 h 41.005 c 4.34 0 7.891 -2.739 7.891 -6.087 V 38.711 L 45.107 49.894 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(32,196,203)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 45.107 42.238 L 16.714 31.056 c 0 -3.348 3.551 -6.087 7.891 -6.087 h 41.005 c 4.34 0 7.891 2.739 7.891 6.087 L 45.107 42.238 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(32,196,203)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default ProductReveal;
