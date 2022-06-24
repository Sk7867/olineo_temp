import React from 'react'
import './ScratchCard.css'
import image from '../../assets/png/product_1.png'
import ScratchCard from "react-scratchcard";

const ScratchCardComp = ({ scratcCardActive, setScratchCardActive }) => {
  const settings = {
    width: 300,
    height: 300,
    image: image,
    finishPercent: 50,
    onComplete: () => console.log('The card is now clear!')
  };
  return (
    <>
      <div className={`scratch_Card_Container ${scratcCardActive ? 'scratch_Card_Active' : ''}`} >
        <ScratchCard {...settings}>
          <div>
            <h1>This Works</h1>
            <br />
            <br />
            <h2>Needs some more work</h2>
          </div>
        </ScratchCard>
      </div>
      <div className={`${scratcCardActive ? 'backdrop_active' : ''}`} onClick={() => setScratchCardActive(false)}></div>
    </>
  )
}

export default ScratchCardComp