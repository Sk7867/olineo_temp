import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { getUserLocation } from '../../api/Auth';
import useGeolocation from '../../hooks/useGeolocation';

//CSS
import './Modal.css'

//Images
import locationBlue from '../../assets/vector/location_blue.svg'
import navigationBlue from '../../assets/vector/navigation_outline_blue.svg'
import { UserDataContext } from '../../Contexts/UserContext';

const ModalComp = ({ modalShow, setModalShow, userLoggedIn }) => {
  const [pincode, setPincode] = useState('')
  const matches = useMediaQuery("(min-width:768px)")
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const { location, locationFetch } = useGeolocation()
  const [enterPinClicked, setEnterPinClicked] = useState(false)
  const { userLocation, setUserLocation, setUserDefaultAddress } = useContext(UserDataContext)

  const getLocation = () => {
    locationFetch()
    handleClose()
  }

  const handleLength = (length) => {
    if (length === 5) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }

  const validateForm = () => (
    (pincode !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPincode(e.target.value)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (pincode !== '') {
      setUserLocation(prev => ({
        ...prev,
        loaded: true,
        useThis: true,
        address: { city: '', state: '', zip: pincode }
      }))
      setUserDefaultAddress(prev => ({
        ...prev,
        useThis: false
      }))
    }
    handleClose()
  }

  useEffect(() => {
    if (location.loaded && location.coordinates.lat !== '') {
      setUserLocation({
        loaded: true,
        useThis: true,
        coordinates: location.coordinates,
        address: location.address
      })
      setUserDefaultAddress(prev => ({
        ...prev,
        useThis: false
      }))
    }
  }, [location])

  const handleUseAddress = () => {
    setUserDefaultAddress(prev => ({
      ...prev,
      useThis: true
    }))
    setUserLocation(prev => ({
      ...prev,
      useThis: false
    }))
    handleClose()
  }

  const handleClose = () => {
    setModalShow(false)
    setPincode('')
    setBtnDisable(true)
    setEnterPinClicked(false)
  };
  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
        backdropClassName='backdrop_active'
        className={`${userLoggedIn ? 'pincode_Modal' : 'location_Modal'}`}
      >
        <Modal.Header closeButton>
          {
            userLoggedIn ? (
              <div className="header_content">
                <h4 className="modal_heading">Enter pincode</h4>
                <p className="modal_header_desc">Enter pincode to see product availability and delivery options.</p>
                <form onSubmit={formSubmit} onChange={validateForm} className='header_Pincode_Section'>
                  <div className='header_Pincode_Input'>
                    {
                      matches ? (
                        <input type='tel' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { validateNumber(e); handleLength(e.target.value.length) }} />
                      ) : (
                        <input type='number' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { setPincode(e.target.value); handleLength(e.target.value.length) }} />
                      )
                    }
                  </div>
                  <div className='header_Submit_Btn'>
                    <button className='submit-button' type='submit' disabled={btnDisable}><p>Apply</p></button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="header_content">
                <h4 className="modal_heading">Choose your location</h4>
                <p className="modal_header_desc">Select location to see product availability and delivery options.</p>
              </div>
            )
          }
        </Modal.Header>
        {
          userLoggedIn ? ('') : (
            <Modal.Body>
              <Link to={'/signup'}><button type='submit' className='submit-button'><p>Sign in to see your address</p></button></Link>
            </Modal.Body>
          )
        }
        <Modal.Footer>
          {
            userLoggedIn ? (<>
              <div className='modal_footer_link' onClick={() => handleUseAddress()}>
                <img src={locationBlue} alt="" />
                <p>Use Default Address</p>
              </div>
            </>) : (
              <div className="modal_footer_link">
                {
                  enterPinClicked ? (
                    <form onChange={validateForm} onSubmit={formSubmit}>
                      <div className='header_Pincode_Input'>
                        {
                          matches ? (
                            <input type='tel' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { validateNumber(e); handleLength(e.target.value.length) }} />
                          ) : (
                            <input type='number' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { setPincode(e.target.value); handleLength(e.target.value.length) }} />
                          )
                        }
                      </div>
                      <div className='header_Submit_Btn'>
                        <button className='submit-button' type='submit' disabled={btnDisable}><p>Apply</p></button>
                      </div>
                    </form>
                  ) : (<div className='modal_footer_link' onClick={() => setEnterPinClicked(true)}>
                    <img src={locationBlue} alt="" />
                    <p>Enter pincode</p>
                  </div>)
                }
              </div>
            )
          }
          <div className="modal_footer_link" onClick={() => { getLocation() }} >
            <img src={navigationBlue} alt="" />
            <p>Use current location</p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComp
