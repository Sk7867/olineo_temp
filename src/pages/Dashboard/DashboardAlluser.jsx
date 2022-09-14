import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DashboardLoader from '../../components/DashboardContent/DashboardLoader';
import {
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import EditUserModal from '../../components/EditUserModal/EditUserModal';
import { allUsers, deletUser, singleUSer } from '../../api/AdminApis/Users';
import Pagination from '../../components/Pagination/Pagination';

const DashboardAlluser = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const [totalUsers, setTotalUsers] = useState(1)

  useEffect(() => {
    setLoader(true);
    allUsers(`limit=${productsPerPage}&page=${currentPage}`).then((res) => {
      setData(res.users);
      setTotalUsers(res.total_users)
      setLoader(false);
    })
  }, [currentPage]);

  const handleDelet = (id) => {
    deletUser(id)
      .then(res => {
        setData(data.filter(message => message._id !== id));
      })
      .catch(err => {
        console.log(err);
      })
  }
  const editUser = (id) => {
    singleUSer(id)
      .then(res => {
        setUser(res)
      })
    setModalShow(true)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return loader ? (
    <DashboardLoader />
  ) : (
    <>
      <EditUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
        setUser={setUser}
        setModalShow={setModalShow}
      />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>All Users</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 && data?.map((item, index) => (
                <tr key={index}>
                  <td> {item?.fullName} </td>
                  <td>{item?.email}</td>
                  <td>{item?.mobileNumber}</td>
                  <td>
                    <button className='btn' onClick={() => editUser(item._id)}>
                      <FontAwesomeIcon
                        className={"table-icon"}
                        icon={faPenToSquare}
                      />
                    </button>
                    <button className='btn' onClick={() => handleDelet(item._id)}><FontAwesomeIcon className={"table-icon"} icon={faTrashCan} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination_Container">
          <Pagination productsPerPage={productsPerPage} totalProducts={totalUsers} pageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default DashboardAlluser;