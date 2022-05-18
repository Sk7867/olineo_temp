
import React from 'react'
import { Modal } from 'react-bootstrap';

const CatelogueModal = ({ modalShow, setModalShow, modalData }) => {

  const imageData = modalData.split(',')
  // console.log(imageData)
  const handleClose = () => setModalShow(false);
  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
        backdropClassName='backdrop_active'
      >
        <Modal.Header closeButton>
          <h5>Preview Images</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="image_Preview_Side_Section">
            <div className='image_Preview_Selected section_Wrapper modal_Image_Preview'>
              <img src={imageData[0]} alt="" />
            </div>
            <div className="product_Thumbnails">
              {imageData.map((image, index) => (
                <div className="thumbnail" key={index}>
                  <img src={image} alt="" />
                </div>))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CatelogueModal