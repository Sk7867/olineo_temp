import React from 'react'
import { useNavigate } from 'react-router-dom'
//CSS
import './HeaderBar3.css'
//image
import arrowLeftWhite from '../../assets/vector/arrow_left_white.svg'
import logo_mob from '../../assets/vector/navbar_logo_mob.svg'

const HeaderBar3 = ({ headerText }) => {
  const nav = useNavigate()

  return (
    <div className='headerbar3_container'>
      <div className="headerbar3_Wrapper">
        <img src={arrowLeftWhite} alt="" onClick={() => nav(-1)} className='back_Btn' />
        <img src={logo_mob} alt="" className='nav_Logo' onClick={() => nav('/')} />
        <p>{headerText}</p>
      </div>
    </div>
  )
}

export default HeaderBar3
