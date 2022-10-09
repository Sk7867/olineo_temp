import React, { useState } from "react";
import styles from "./styles/DashboardIFD.module.css";
import { findStore } from "../../api/AdminApis/IFD";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import DayGraph from "../../components/_IFD/DayGraph";
import ProductGraph from "../../components/_IFD/ProductGraph";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardIFD = () => {
  const [storeLoading, setStoreLoading] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [storeName, setStoreName] = useState("");

  const getStore = () => {
    if (storeId === null || !storeId) {
      return toast.error("Please Enter Store ID!", { toastId: "empty-store-id-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });
    }
    setStoreName("");
    setStoreLoading(true);
    findStore(storeId, (err, data) => {
      setStoreLoading(false);
      if (err) return toast.error("No Store Found!", { toastId: "no-store-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });
      setStoreName(data.name);
    });
  };

  return (
    <section>
      <div style={{ position: "relative", maxWidth: "400px" }}>
        <input
          id="store-id-input"
          onKeyUp={(e) => e.key === "Enter" && getStore()}
          className={styles["form-input"]}
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          type="text"
          placeholder="Store ID"
          disabled={storeName && true}
        />
        {storeName ? (
          <span
            onClick={() => {
              setStoreName("");
              setTimeout(() => {
                document.getElementById("store-id-input").select();
              }, 100);
            }}
            style={{ position: "absolute", fontSize: "13px", top: "16px", right: "15px", cursor: "pointer" }}
          >
            change
          </span>
        ) : (
          <FontAwesomeIcon onClick={getStore} style={{ position: "absolute", top: "15px", right: "15px" }} cursor={"pointer"} size="lg" icon={faCheck} />
        )}
      </div>

      {storeName ? (
        <>
          <h5>Store Name: {storeName} </h5>
          <DayGraph storeName={storeName} />
          <ProductGraph storeName={storeName} />
        </>
      ) : (
        <div style={{ width: "40px", visibility: storeLoading ? "visible" : "hidden" }}>
          <DashboardLoader />
        </div>
      )}
    </section>
  );
};

export default DashboardIFD;
