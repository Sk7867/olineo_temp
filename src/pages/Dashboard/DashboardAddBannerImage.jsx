import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/dashAddproduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { addBannerImage } from '../../api/AdminApis/Banner';
import { toast } from "react-toastify";

toast.configure()
const DashboardAddBannerImage = () => {
  const [bannerFileShow, setBannerFileShow] = useState(null)
  const [bannerFileSend, setBannerFileSend] = useState(null)
  const nav = useNavigate()

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerFileShow(reader.result);
          setBannerFileSend(e.target.files[0])
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleSubmit = () => {
    addBannerImage(bannerFileSend)
      .then(res => res ? (
        console.log(res),
        toast.success('Banner Image Added'),
        nav('/admin-banner')
      ) : (''))
  }
  return (
    <>
      <div className='container'>
        <Link to="/admin-products">
          <FontAwesomeIcon icon={faChevronLeft} /> Products
        </Link>
        <form encType="multipart/form-data" className='p-3 my-4'>
          <div className='form-group'>
            <input type="file" name="bannerImage" id="bannerImage" className='input-field' onChange={handleFileUpload} accept=".jpg, .jpeg, .png" />
          </div>
        </form>
        {
          bannerFileShow && (
            <>
              <div className='row mb-4'>
                <img src={bannerFileShow} alt="" />
              </div>
              <div className='my-5'>
                <button type="submit" className="submit-button" onClick={handleSubmit}>
                  <p>Submit</p>
                </button>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default DashboardAddBannerImage