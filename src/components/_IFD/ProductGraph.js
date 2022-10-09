import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import { getProductGraph } from "../../api/AdminApis/IFD";
import styles from "../../pages/Dashboard/styles/DashboardIFD.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const ProductGraph = ({ storeName }) => {
  // ---------> Product Graph <-------------
  const [productGraphLoading, setProductGraphLoading] = useState(false);
  const [productGraphDates, setProductGraphDates] = useState([
    {
      startDate: null,
      endDate: null,
    },
  ]);
  const [productGraphDataset, setProductGraphDataset] = useState([]);

  const updateProductGraphDate = (idx, key, value) => {
    let newDates = productGraphDates.map((item, index) => {
      if (index === idx) item[key] = value;
      return item;
    });
    setProductGraphDates(newDates);
  };

  const updateProductGraph = () => {
    const graphBarColours = ["#3caae190", "#7336cf90", "#3ce16590", "#f3e52aa6", "#e13c44a6"];

    if (productGraphDates.find((item) => item.startDate === null || item.endDate === null))
      return toast.error("Select Start and End Dates!", { toastId: "date-select-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });

    const dayDifference = productGraphDates.find((item) => {
      let diff = (item.endDate.getTime() - item.startDate.getTime()) / (1000 * 3600 * 24) + 1;
      return diff <= 0;
    });
    if (dayDifference) return toast.error("Start Date must be smaller than End Date", { toastId: "empty-store-id-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });

    setProductGraphDataset([]);
    setProductGraphLoading(true);
    productGraphDates.forEach((item, idx) => {
      const query = `store_id=201&start_date=${moment(item.startDate).format("DD-MM-YYYY")}&end_date=${moment(item.endDate).format("DD-MM-YYYY")}`;
      getProductGraph(query, (err, data) => {
        if (productGraphDates.length === idx + 1) {
          setProductGraphLoading(false);
        }
        if (err) {
          setProductGraphLoading(false);
          return toast.error("Select Start and End Dates!", { toastId: "date-select-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });
        }
        setProductGraphDataset((prev) => [
          ...prev,
          {
            label: `${moment(item.startDate).format("D MMM YYYY")} - ${moment(item.endDate).format("D MMM YYYY")}`,
            data: data,
            backgroundColor: graphBarColours[idx],
          },
        ]);
      });
    });
  };

  useEffect(() => {
    if (storeName === "") {
      setProductGraphDates([
        {
          startDate: null,
          endDate: null,
        },
      ]);
      setProductGraphDataset([]);
    }
  }, [storeName]);
  return (
    <div
      style={{
        pointerEvents: !storeName && "none",
      }}
      className={styles["chart-container"]}
    >
      <h4>
        <b>Products Graph 📊</b>
      </h4>
      {productGraphDates.map((item, idx) => {
        return (
          <div key={idx} className={styles["date-picker-container"]}>
            <div className={styles["date-picker-element"]}>
              <h6>Start Date:</h6>
              <input
                max={moment(new Date()).format("YYYY-MM-DD")}
                value={moment(item.startDate).format("YYYY-MM-DD")}
                onChange={(e) => {
                  updateProductGraphDate(idx, "startDate", e.target.value ? new Date(e.target.value) : null);
                }}
                type="date"
              />
            </div>
            <div className={styles["date-picker-element"]}>
              <h6>End Date:</h6>
              <input
                max={moment(new Date()).format("YYYY-MM-DD")}
                value={moment(item.endDate).format("YYYY-MM-DD")}
                onChange={(e) => updateProductGraphDate(idx, "endDate", e.target.value ? new Date(e.target.value) : null)}
                type="date"
              />
            </div>
            {productGraphDates.length === idx + 1 ? (
              <FontAwesomeIcon
                onClick={() => {
                  productGraphDates.length < 5 &&
                    setProductGraphDates((prev) =>
                      prev.concat({
                        startDate: null,
                        endDate: null,
                      })
                    );
                }}
                cursor={productGraphDates.length < 5 ? "pointer" : "not-allowed"}
                size="lg"
                icon={faPlusCircle}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  setProductGraphDates((prev) => prev.filter((item, index) => index !== idx));
                }}
                cursor={"pointer"}
                size="md"
                icon={faRemove}
              />
            )}
          </div>
        );
      })}
      <button disabled={productGraphLoading} style={{ margin: "15px 0" }} onClick={updateProductGraph} className={styles["secondary-btn"]}>
        Apply Filter
      </button>
      <div className={styles["chart-wrapper"]}>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: false,
                text: "Total Redeemed Products",
              },
            },
          }}
          data={{
            labels: ["Ziox Neckband", "Play T20 TWS", "Harman Infinity Neckband", "Dizo Watch 2 Sports i", "Realme Speaker", "JBL Headphone"],
            datasets:
              productGraphDataset.length !== 0
                ? productGraphDataset
                : [
                    {
                      label: "",
                      data: [],
                      backgroundColor: [],
                    },
                  ],
          }}
          updateMode="show"
        />
      </div>
    </div>
  );
};

export default ProductGraph;
