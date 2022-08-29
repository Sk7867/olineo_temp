import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addCupon } from "../../api/AdminApis/Cupon";
import * as XLSX from "xlsx/xlsx.mjs";
import { addStoreBulk } from "../../api/AdminApis/AdminStore";
import { Slide, toast } from "react-toastify";
import CatelogueModal from "../../components/ModalComponenr/CatelogueModal";
import CommonModal from "../../components/ModalComponenr/CommonModal";

toast.configure();
function DashboardAddShop() {
  const [imagesObject, setImagesObject] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [fileUploaded, setfileUploaded] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileJsonData, setFileJsonData] = useState({
    loaded: false,
    fileData: [],
  });

  const [fileToSend, setFileToSend] = useState([]);

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
      setFileToSend([]);
      setfileUploaded({
        loaded: true,
        fileData: columnData,
        storeIdPosition: columnData[0].indexOf("brand_store_id"),
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

  const modalHeaderComp = () => {
    return (
      <div className='addProduct_Preview_Modal'>
        <h4>Shop Image Preview</h4>
      </div>
    )
  }

  const modalBodyComp = () => {
    return (
      <>
        <div className="image_Preview_Selected section_Wrapper modal_Image_Preview">
          <img src={modalData} alt="" />
        </div>
      </>
    )
  }

  const imageHandleChange = (e, type, eanNum) => {
    if (e.target.files) {
      let imgObj = {
        imgs: [],
        imgsUrl: [],
      };

      for (let i = 0; i < e.target.files.length; i++) {
        imgObj.imgs.push(e.target.files[i]);
        let url = URL.createObjectURL(e.target.files[i]);
        imgObj.imgsUrl.push(url);
      }

      if (type === "store_image") {
        if (imgObj.imgs.length > 1) {
          e.target.value = "";
          imgObj = {
            imgs: [],
            imgsUrl: [],
          };
          toast.error("Maximum 1 Image can be selected!");
        }
        setImagesObject({ ...imagesObject, [eanNum]: imgObj });
      }
    }
  };
  const handleOpen = (e, imagesPassed) => {
    e.preventDefault();
    setModalOpen(true);
    setModalData(imagesPassed);
  };

  return (
    <>
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
                      <th>
                        <p>Upload Shop Image</p>
                        <p>Add Maximum 1 image</p>
                      </th>
                      <th>Image File Preview</th>
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
                          {/* <td>
                            <form action="" encType="multipart/form-data">
                              <input
                                type="file"
                                name="Product Images"
                                multiple
                                id="productImageInput"
                                className="input-field"
                                accept="image/*"
                                placeholder="Enter Product Images URL"
                                onChange={(e) => imageHandleChange(e, "store_image", item[fileUploaded.storeIdPosition].toString())}
                              />
                            </form>
                          </td>
                          <td>
                            <div className={"button-Container"}>
                              <button
                                type="submit"
                                className="submit-button"
                                disabled={imagesObject[item[fileUploaded.storeIdPosition]] && imagesObject[item[fileUploaded.storeIdPosition]]?.imgs.length !== 0 ? false : true}
                                onClick={(e) => handleOpen(e, imagesObject[item[fileUploaded.storeIdPosition]].imgsUrl, index)}
                              >
                                <p>Preview Images</p>
                              </button>
                            </div>
                          </td> */}
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
      {/* <CatelogueModal modalShow={modalOpen} setModalShow={setModalOpen} imageData={modalData} /> */}
      <CommonModal
        modalShow={modalOpen}
        setModalShow={setModalOpen}
        ModalHeaderComp={modalHeaderComp}
        ModalBodyComp={modalBodyComp}
      />
    </>
  );
}

export default DashboardAddShop;
