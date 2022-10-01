import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./styles/dashboardProducts.css";
import DashboardLoader from "../../components/DashboardContent/DashboardLoader";
import { getAdminBanner } from "../../api/AdminApis/Banner";

function DashboardBannerImages() {
  const [loader, setLoader] = useState(true);
  const [allBanners, setAllBanners] = useState([])
  const nav = useNavigate();

  //set the loader and get banners
  useEffect(() => {
    setLoader(true);
    getAdminBanner()
      .then(res => {
        setAllBanners(res.bannerImage)
        setLoader(false);
      })
  }, [])

  return loader ? (
    <DashboardLoader />
  ) : (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Banner Images</h3>
          <div className="d-flex flex-row" style={{ gap: '10px' }}>
            <Button
              className="btn-sm"
              onClick={() => nav("/admin-add-banner")}
              style={{ marginBottom: 20 }}
            >
              Add Banner
            </Button>
          </div>
        </div>
        <div className="row hidden-md-up">
          {
            allBanners.length > 0 ? (
              allBanners.map((image, index) => (
                <div className='col-md-4' key={index}>
                  <div className="card">
                    <img src={image} alt="" className="card-img-top" />
                    {/* <div class="card-body">
                      <p class="card-text">example</p>
                    </div> */}
                  </div>
                </div>
              ))
            ) : (<>
              <div className="d-flex justify-content-center align-items-center p-3">
                No Banner Images
              </div>
            </>)
          }
        </div>
      </div>
    </>
  );
}

export default DashboardBannerImages;
