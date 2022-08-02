import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addCupon } from "../../api/AdminApis/Cupon";
import * as XLSX from "xlsx/xlsx.mjs";
import { addStoreBulk } from "../../api/AdminApis/AdminStore";

function DashboardAddShop() {
  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileToSend, setFileToSend] = useState([]);

  const cuponSubmit = (e) => {
    e.preventDefault();
    const data = {
      "discount": e.target.discount.value,
      "maxAmount": e.target.maxAmount.value,
      "expire": e.target.expire.value,
      "products": e.target.products.value,
      "code": e.target.code.value,
    }
    console.log(data);
    addCupon(data)
      .then(res => console.log(res.data))
  }

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file?.arrayBuffer();
    /* data is an ArrayBuffer */
    if (data) {
      const workbook = XLSX.read(data);
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(workSheet);
      const columnData = XLSX.utils.sheet_to_json(workSheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });
      console.log(jsonData, columnData);
      setFileToSend([]);
      setfileUploaded({
        loaded: true,
        fileData: columnData,
      });
      setFileJsonData({
        loaded: true,
        fileData: jsonData,
      });
    } else {
      setfileUploaded({
        loaded: false,
        fileData: [],
      });

      setFileJsonData({
        loaded: false,
        fileData: [],
      });

      setFileToSend([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    addStoreBulk(fileJsonData.fileData)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <div className="container">
      <Link to="/admin-shops">
        <FontAwesomeIcon icon={faChevronLeft} /> Shops List
      </Link>
      <div className="card-body bg-light shadow-sm">
        <h3>Add Shop</h3>
      </div>
      <input type="file" className="input-field" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => handleFile(e)} />
      {
        fileUploaded.loaded && (
          <>
            <div className="catelogue_Table">
              <table>
                <thead>
                  <tr>
                    {fileUploaded.fileData[0].map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileUploaded.fileData.map((item, index) =>
                    index === 0 ? (
                      ""
                    ) : (
                      <tr key={index}>
                        {item.map((itm, index) => (
                          <td key={index}>{itm}</td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className={"button-Container"}>
              <button id="submitCsvData" disabled={false} type="submit" className="submit-button" onClick={handleSubmit}>
                <p>Submit</p>
              </button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default DashboardAddShop;
