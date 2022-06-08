import React from 'react'
import { Modal } from 'react-bootstrap';
import image from '../../assets/png/product_1.png'
import ScratchCard from "react-scratchcard";

//CSS
import './ScratchCard.css'

const ScartchCardComp = ({ modalShow, setModalShow }) => {
  const settings = {
    width: 300,
    height: 300,
    image: image,
    finishPercent: 50,
    onComplete: () => console.log('The card is now clear!')
  };

  const handleClose = () => setModalShow(false);
  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
        backdropClassName='backdrop_active'
        contentClassName='luckyDraw_Modal'
        dialogClassName='luckyDraw_Dialog'
      >
        {/* <Modal.Header closeButton>
        </Modal.Header> */}
        <Modal.Body>
          <ScratchCard {...settings}>
            <div>
              <h1>This Works</h1>
              <br />
              <br />
              <h2>Needs some more work</h2>
            </div>
          </ScratchCard>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ScartchCardComp