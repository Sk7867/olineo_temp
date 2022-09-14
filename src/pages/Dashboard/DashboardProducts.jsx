import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./styles/dashboardProducts.css";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import { getAllProducts, getIndiProduct } from "../../api/Product";
import EditProductModal from "../../components/EditProductModal/EditProductModal";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";

function DashboardProducts(props) {
  const [loader, setLoader] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [indProduct, setIndProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const [totalProducts, setTotalProducts] = useState(1)

  //set the loader and get products
  useEffect(() => {
    setLoader(true);
    //the function to get products
    (async () => {
      getAllProducts(`limit=${productsPerPage}&page=${currentPage}`).then((res) => {
        setAllProducts(res.products);
        setTotalProducts(res.total_products)
        setLoader(false);
      });
    })();
  }, [currentPage]);
  const handleEditProd = (id) => {
    setModalShow(true)
    //the function to get products
    getIndiProduct(id)
      .then((res) => {
        setIndProduct(res);
      });
  }

  const deletProduct = async (id) => {
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
        .then(res => {
          setAllProducts(allProducts.filter(message => message._id !== id));
        })
    } else {
      alert("User save!")
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return loader ? (
    <DashboardLoader />
  ) : (
    <>
      <EditProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={indProduct}
      />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Products</h3>
          <div className="d-flex flex-row" style={{ gap: '10px' }}>
            <Button
              className="btn-sm"
              onClick={() => nav("/admin-add-product")}
              style={{ marginBottom: 20 }}
            >
              Add product
            </Button>
            <Button
              className="btn-sm"
              onClick={() => nav("/admin-add-product-csv")}
              style={{ marginBottom: 20 }}
            >
              Add CSV File
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">EAN</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.length > 0 && allProducts?.map((item, index) => (
                <tr key={index}>
                  <td> {item?.name} </td>
                  <td> {item?.ean} </td>
                  <td>{item?.price?.mrp}</td>
                  <td>{item?.qty}</td>
                  <td>
                    <Link to={'/admin-add-product'} state={item = { item }} className="btn p-0" >
                      <FontAwesomeIcon
                        className={"table-icon"}
                        icon={faPenToSquare}
                      />
                    </Link>
                    {/* <button className="btn p-0" onClick={() => handleEditProd(item._id)}>
                      <FontAwesomeIcon
                        className={"table-icon"}
                        icon={faPenToSquare}
                      /></button> */}
                    <button
                      className="btn p-0"
                      onClick={() => deletProduct(item.item._id)}
                    >
                      <FontAwesomeIcon className={"table-icon"} icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination_Container">
          <Pagination productsPerPage={productsPerPage} totalProducts={totalProducts} pageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default DashboardProducts;
