import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IFDContext from "../../Contexts/IFDContext";
import styles from "./_IFD.module.css";

const Step1 = ({ userLoggedIn, navigateBackward, navigateForward }) => {
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { setActiveState, storeDetails, setStoreDetails } = useContext(IFDContext);

  const handleInputChange = (e) => {
    setStoreDetails((prev) => ({ ...prev, id: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (storeDetails?.id.toString().match(/((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm))
      return toast.error("Please Enter Store ID!", { toastId: "empty-store-id-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });

    try {
      setIsButtonLoading(true);
      const response = await fetch(`${process.env.REACT_APP_IFD_BASE_URL}/store/${storeDetails.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const storeData = await response.json();
      setIsButtonLoading(false);
      if (response.status === 404 || storeData.detail === "Not found.")
        return toast.error("Store not found!", { toastId: "no-store-err", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      if (response.status === 200) {
        setStoreDetails(storeData);
        navigateForward("step1", "step2");
      }
    } catch (error) {
      setIsButtonLoading(false);
      toast.error("Something went wrong!", { autoClose: 3000, hideProgressBar: false, position: "top-center" });
      return;
    }
  };
  return (
    <section style={{ paddingBottom: "80px" }}>
      <header className={styles["header"]}>
        <svg onClick={() => navigateBackward("step1", "home")} style={{ cursor: "pointer" }} width="15" height="20" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.54117 6.92943L3.47046 7.00014L3.54117 7.07085L8.06784 11.5975C8.48378 12.0135 8.48378 12.6851 8.06784 13.1011C7.65124 13.5177 6.96789 13.5164 6.56426 13.1128L1.20925 7.75776C0.793307 7.34181 0.793307 6.67013 1.20925 6.25418L6.56426 0.899184C6.9802 0.483237 7.65189 0.483237 8.06784 0.899184C8.48378 1.31513 8.48378 1.98682 8.06784 2.40276L3.54117 6.92943Z"
            fill="#F8F9FA"
            stroke="#1B325E"
            strokeWidth="0.2"
          />
        </svg>
        <h3 className={styles["header-msg"]}>Claim your reward in two simple steps. </h3>
      </header>
      <div className={styles["form-container"]}>
        <h3 className={styles["form-heading"]}>1. Enter the store ID</h3>
        <form onSubmit={handleSubmit} action="">
          <input onChange={handleInputChange} value={storeDetails?.id} className={styles["form-input"]} type="text" placeholder="Store ID" />
          <button type="submit" disabled={isButtonLoading} className={styles["primary-button"]}>
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
        </form>

        <hr className={styles["form-divider"]} />
        <svg
          // onClick={() => navigate(userLoggedIn ? "/" : "/signup")}
          onClick={() => navigateBackward("step1", "home")}
          className={styles["secondary-button"]}
          width="310"
          height="50"
          viewBox="0 0 330 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M328 1H15.7326L3.43877 38.5083C1.74332 43.6811 5.59726 49 11.0408 49H312.744L328 1Z" stroke="url(#paint0_linear_4235_21073)" strokeWidth="2" />
          <path
            d="M129.041 28.44V18.864C129.041 18.71 128.929 18.598 128.775 18.598H127.571C127.417 18.598 127.305 18.71 127.305 18.864V26.228C127.305 26.312 127.263 26.354 127.235 26.354C127.193 26.354 127.151 26.312 127.123 26.242L123.861 19.046C123.693 18.682 123.539 18.598 123.245 18.598H121.733C121.425 18.598 121.173 18.85 121.173 19.158V28.72C121.173 28.874 121.299 29 121.453 29H122.643C122.797 29 122.909 28.874 122.909 28.72V21.678C122.909 21.594 122.937 21.566 122.979 21.566C123.021 21.566 123.063 21.594 123.105 21.678L126.213 28.496C126.437 29 126.731 29 127.067 29H128.481C128.789 29 129.041 28.748 129.041 28.44ZM138.454 25.626V24.492C138.454 22.49 137.306 21.006 135.108 21.006C132.91 21.006 131.762 22.49 131.762 24.492V25.626C131.762 27.628 132.91 29.112 135.108 29.112C137.306 29.112 138.454 27.628 138.454 25.626ZM136.606 25.626C136.606 26.774 136.088 27.516 135.108 27.516C134.128 27.516 133.61 26.774 133.61 25.626V24.492C133.61 23.344 134.128 22.602 135.108 22.602C136.088 22.602 136.606 23.344 136.606 24.492V25.626ZM145.093 28.762V27.88C145.093 27.74 144.981 27.67 144.799 27.67H144.057C143.553 27.67 143.511 27.586 143.511 26.886V22.49H144.771C144.925 22.49 145.051 22.364 145.051 22.21V21.384C145.051 21.23 144.925 21.104 144.771 21.104H143.511V19.662C143.511 19.522 143.413 19.452 143.287 19.452C143.273 19.452 143.245 19.452 143.231 19.452L141.929 19.676C141.775 19.704 141.649 19.802 141.649 19.956V21.104H140.333C140.179 21.104 140.053 21.23 140.053 21.384V22.014C140.053 22.168 140.179 22.266 140.333 22.294L141.649 22.49V26.886C141.649 28.762 142.293 29.112 143.875 29.112C144.183 29.112 144.491 29.07 144.827 29.014C145.009 28.986 145.093 28.902 145.093 28.762ZM153.943 28.72V18.864C153.943 18.71 153.817 18.598 153.663 18.598H152.277C152.123 18.598 151.997 18.71 151.997 18.864V28.72C151.997 28.874 152.123 29 152.277 29H153.663C153.817 29 153.943 28.874 153.943 28.72ZM163.372 28.706V24.142C163.372 22.364 162.966 21.006 160.95 21.006C160.026 21.006 159.494 21.16 158.682 21.678V21.384C158.682 21.23 158.556 21.104 158.402 21.104H157.184C157.03 21.104 156.904 21.23 156.904 21.384V28.706C156.904 28.86 157.03 29 157.184 29H158.472C158.626 29 158.752 28.86 158.752 28.706V23.078C159.34 22.77 159.858 22.574 160.334 22.574C161.412 22.574 161.524 22.924 161.524 24.142V28.706C161.524 28.86 161.65 29 161.804 29H163.092C163.246 29 163.372 28.86 163.372 28.706ZM177.129 26.186C177.129 25.08 176.723 24.184 175.183 23.33L173.503 22.392C172.593 21.888 172.355 21.608 172.355 21.146C172.355 20.516 172.789 20.152 173.825 20.152C174.735 20.152 175.659 20.208 176.583 20.292C176.597 20.292 176.597 20.292 176.611 20.292C176.751 20.292 176.849 20.18 176.849 20.04V19.004C176.849 18.864 176.737 18.766 176.597 18.738C176.121 18.626 174.833 18.486 173.909 18.486C171.305 18.486 170.409 19.606 170.409 21.146C170.409 22.126 170.759 22.938 172.061 23.708L173.909 24.814C174.833 25.36 175.099 25.64 175.099 26.186C175.099 26.998 174.721 27.446 173.475 27.446C172.957 27.446 171.557 27.376 170.997 27.306C170.983 27.306 170.983 27.306 170.969 27.306C170.829 27.306 170.703 27.418 170.703 27.572V28.58C170.703 28.734 170.829 28.832 170.969 28.86C171.641 29.014 172.397 29.112 173.447 29.112C176.247 29.112 177.129 27.6 177.129 26.186ZM183.591 28.762V27.88C183.591 27.74 183.479 27.67 183.297 27.67H182.555C182.051 27.67 182.009 27.586 182.009 26.886V22.49H183.269C183.423 22.49 183.549 22.364 183.549 22.21V21.384C183.549 21.23 183.423 21.104 183.269 21.104H182.009V19.662C182.009 19.522 181.911 19.452 181.785 19.452C181.771 19.452 181.743 19.452 181.729 19.452L180.427 19.676C180.273 19.704 180.147 19.802 180.147 19.956V21.104H178.831C178.677 21.104 178.551 21.23 178.551 21.384V22.014C178.551 22.168 178.677 22.266 178.831 22.294L180.147 22.49V26.886C180.147 28.762 180.791 29.112 182.373 29.112C182.681 29.112 182.989 29.07 183.325 29.014C183.507 28.986 183.591 28.902 183.591 28.762ZM192.173 25.626V24.492C192.173 22.49 191.025 21.006 188.827 21.006C186.629 21.006 185.481 22.49 185.481 24.492V25.626C185.481 27.628 186.629 29.112 188.827 29.112C191.025 29.112 192.173 27.628 192.173 25.626ZM190.325 25.626C190.325 26.774 189.807 27.516 188.827 27.516C187.847 27.516 187.329 26.774 187.329 25.626V24.492C187.329 23.344 187.847 22.602 188.827 22.602C189.807 22.602 190.325 23.344 190.325 24.492V25.626ZM198.818 22.294V21.286C198.818 21.132 198.692 21.006 198.538 21.006C197.978 21.006 197.222 21.146 196.536 21.678V21.384C196.536 21.23 196.41 21.104 196.256 21.104H195.038C194.884 21.104 194.758 21.23 194.758 21.384V28.706C194.758 28.86 194.884 29 195.038 29H196.326C196.48 29 196.606 28.86 196.606 28.706V23.078C197.194 22.77 197.782 22.574 198.538 22.574C198.692 22.574 198.818 22.448 198.818 22.294ZM207.202 25.346V24.562C207.202 22.476 206.026 21.006 203.87 21.006C201.728 21.006 200.51 22.378 200.51 24.562V25.598C200.51 28.356 202.498 29.112 203.898 29.112C205.158 29.112 205.704 29.042 206.614 28.874C206.866 28.832 206.908 28.734 206.908 28.51V27.586C206.908 27.446 206.796 27.376 206.656 27.376C206.642 27.376 206.628 27.376 206.614 27.376C206.026 27.432 205.06 27.516 204.038 27.516C202.694 27.516 202.358 26.55 202.358 25.738V25.696H206.922C207.118 25.696 207.202 25.57 207.202 25.346ZM205.34 24.38H202.372V24.324C202.372 23.218 203.002 22.602 203.87 22.602C204.738 22.602 205.34 23.232 205.34 24.324V24.38Z"
            fill="url(#paint1_linear_4235_21073)"
          />
          <defs>
            <linearGradient id="paint0_linear_4235_21073" x1="164" y1="1" x2="164" y2="49" gradientUnits="userSpaceOnUse">
              <stop offset="0.503125" stopColor="#EFC255" />
              <stop offset="1" stopColor="#DD9E2C" />
            </linearGradient>
            <linearGradient id="paint1_linear_4235_21073" x1="164" y1="17" x2="164" y2="33" gradientUnits="userSpaceOnUse">
              <stop offset="0.503125" stopColor="#EFC255" />
              <stop offset="1" stopColor="#DD9E2C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Step1;
