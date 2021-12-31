import './HeaderBar.css'
import { useNavigate } from 'react-router-dom'

//Images
import navbarLogo from '../../assets/vector/navbar_logo.svg'
import navbarLogoDesk from '../../assets/vector/navbar_logo_desk.svg'

const HeaderBar = ({ alternateWay, alternateLink }) => {
  const nav = useNavigate()

  const pageSwitch = (e) => {
    e.preventDefault();
    nav(alternateLink)
  }

  return (
    <div className={'headerContainer'}>
      <div className={'headerWrapper'}>
        <a href='/' className={'logo'}>
          <img src={navbarLogo} alt="" className='logo_mob' />
          <img src={navbarLogoDesk} alt="" className='logo_desk' />
        </a>
        <p className={'alternate-way'} onClick={pageSwitch}>
          {alternateWay}
        </p>
      </div>
    </div>
  )
}

export default HeaderBar
