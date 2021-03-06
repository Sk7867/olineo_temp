import { useNavigate, Link } from 'react-router-dom'
//CSS
import './HeaderBar.css'
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
        <Link to='/' className={'logo'}>
          <img src={navbarLogo} alt="" className='logo_mob' />
          <img src={navbarLogoDesk} alt="" className='logo_tab logo_desk' />
        </Link>
        <p className={'alternate-way'} onClick={pageSwitch}>
          {alternateWay}
        </p>
      </div>
    </div>
  )
}

export default HeaderBar
