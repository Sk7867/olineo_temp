import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DashboardLoader from '../../components/DashboardContent/DashboardLoader';
import {
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { allUsers, deletUser, singleUSer } from '../../api/AdminApis/Users';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteIndiStore, getAllStore } from '../../api/AdminApis/AdminStore';
import EditStoreModal from '../../components/EditStoreModal/EditStoreModal';
import Pagination from '../../components/Pagination/Pagination';

const DashboardShop = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState([]);
  const [singleShopData, setSingleShopData] = useState({})
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const [totalShops, setTotalShops] = useState(1)

  useEffect(() => {
    setLoader(true);
    getAllStore(`limit=${productsPerPage}&page=${currentPage}`).then((res) => {
      setData(res.stores)
      setTotalShops(res.total_stores)
      setLoader(false);
    })
  }, [currentPage]);

  const handleStoreDelete = (id) => {
    deleteIndiStore(id)
      .then(res => {
        getAllStore().then((res) => {
          setData(res.stores)
          setLoader(false);
        })
      })
  }
  const editStore = (item) => {
    setSingleShopData(item)
    setModalShow(true)
    // singleUSer(id)
    //   .then(res => {
    //     setUser(res)
    //   })
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return loader ? (
    <DashboardLoader />
  ) : (
    <>
      <EditStoreModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        singleShopData={singleShopData}
        setSingleShopData={setSingleShopData}
        setModalShow={setModalShow}
        setData={setData}
        setLoader={setLoader}
      />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>All Shops</h3>
          <Button
            className="btn-sm"
            onClick={() => nav("/admin-add-shop")}
            style={{ marginBottom: 20 }}
          >
            Add Shops
          </Button>
        </div>
        <div className="table-responsive">
          {
            data?.length === 0 ? (
              <>
                <div>
                  <h5>No Shops in Database</h5>
                </div>
              </>
            ) : (
              <>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Store Id</th>
                      <th scope="col">Store Name</th>
                      <th scope="col">Store City</th>
                      <th scope="col">Store Pincode</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 && data?.map((item, index) => (
                      <tr key={index}>
                        <td> {item?.brand_store_id} </td>
                        <td>{item?.fc_name}</td>
                        <td>{item?.city}</td>
                        <td>{item?.pincode}</td>
                        <td>
                          <button className='btn' onClick={() => editStore(item)}>
                            <FontAwesomeIcon
                              className={"table-icon"}
                              icon={faPenToSquare}
                            />
                          </button>
                          <button className='btn' onClick={() => handleStoreDelete(item._id)}><FontAwesomeIcon className={"table-icon"} icon={faTrashCan} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          }
        </div>
        <div className="pagination_Container">
          <Pagination productsPerPage={productsPerPage} totalProducts={totalShops} pageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default DashboardShop;