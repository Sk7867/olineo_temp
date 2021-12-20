import './HeaderBar.css'
import { useNavigate } from 'react-router-dom'

//Images
import navbarLogo from '../../assets/vector/navbar_logo.svg'

const HeaderBar = ({ alternateWay, alternateLink }) => {
  const nav = useNavigate()

  const pageSwitch = (e) => {
    e.preventDefault();
    nav(alternateLink)
  }

  return (
    <div className={'headerContainer'}>
      <div className={'headerWrapper'}>
        <div className={'logo'}>
          <img src={navbarLogo} alt="" />
        </div>
        <p className={'alternate-way'} onClick={pageSwitch}>
          {alternateWay}
        </p>
      </div>
    </div>
  )
}

export default HeaderBar
