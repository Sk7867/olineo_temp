import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import { getDayGraph } from "../../api/AdminApis/IFD";
import styles from "../../pages/Dashboard/styles/DashboardIFD.module.css";
import { useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("D MMM YYYY"));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

const DayGraph = ({ storeName }) => {
  const [dayGraphLoading, setDayGraphLoading] = useState(false);
  const [dayGraphStartDate, setDayGraphStartDate] = useState(null);
  const [dayGraphEndDate, setDayGraphEndDate] = useState(null);

  const [dayGraphLabels, setDayGraphLabels] = useState([]);
  const [dayGraphData, setDayGraphData] = useState([]);

  const updateDayGraph = () => {
    if (dayGraphStartDate === null || dayGraphEndDate === null)
      return toast.error("Select Start and End Dates!", { toastId: "date-select-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });
    let dayDifference = (dayGraphEndDate.getTime() - dayGraphStartDate.getTime()) / (1000 * 3600 * 24) + 1;
    if (dayDifference <= 0) return toast.error("Start Date must be smaller than End Date", { toastId: "empty-store-id-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });
    if (dayDifference > 30) return toast.error("Maximum 30 days chart can be shown!", { toastId: "empty-store-id-error", autoClose: 3000, hideProgressBar: false, position: "top-center" });

    let dateLabels = getDates(dayGraphStartDate, dayGraphEndDate);
    setDayGraphLoading(true);
    const query = `store_id=201&start_date=${moment(dayGraphStartDate).format("DD-MM-YYYY")}&end_date=${moment(dayGraphEndDate).format("DD-MM-YYYY")}`;
    getDayGraph(query, (err, data) => {
      setDayGraphLoading(false);
      if (err) return console.log(err);
      setDayGraphLabels(dateLabels);
      setDayGraphData(data);
    });
  };

  useEffect(() => {
    if (storeName === "") {
      setDayGraphStartDate(null);
      setDayGraphEndDate(null);
      setDayGraphLabels([]);
      setDayGraphData([]);
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
        <b>Day Graph 📊</b>
      </h4>
      <div className={styles["date-picker-container"]}>
        <div className={styles["date-picker-element"]}>
          <h6>Start Date:</h6>
          <input
            max={moment(new Date()).format("YYYY-MM-DD")}
            onChange={(e) => {
              setDayGraphStartDate(new Date(e.target.value));
            }}
            type="date"
          />
        </div>
        <div className={styles["date-picker-element"]}>
          <h6>End Date:</h6>
          <input max={moment(new Date()).format("YYYY-MM-DD")} onChange={(e) => setDayGraphEndDate(new Date(e.target.value))} type="date" />
        </div>
        <button disabled={dayGraphLoading} onClick={updateDayGraph} className={styles["secondary-btn"]}>
          Apply Filter
        </button>
      </div>

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
            labels: dayGraphLabels,
            datasets: [
              {
                label: dayGraphData.length > 0 ? "Total Redeemed Products" : "",
                data: dayGraphData,
                backgroundColor: dayGraphData.length > 0 && "#7336cf90",
              },
            ],
          }}
          updateMode="show"
        />
      </div>
    </div>
  );
};

export default DayGraph;
