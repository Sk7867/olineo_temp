import React from 'react'
import { useNavigate } from 'react-router-dom'
//CSS
import './Footer.css'

//Image
import footerLogo from '../../assets/vector/footer_logo.svg'
import mailBlack from '../../assets/vector/mail_black.svg'
import locationBlack from '../../assets/vector/location_black.svg'
import phoneBlack from '../../assets/vector/phone_black.svg'
import instagramIcon from '../../assets/vector/instagram_white.svg'
import twitterIcon from '../../assets/vector/twitter_white.svg'
import linkedinIcon from '../../assets/vector/linkedin_white.svg'
import youtubeIcon from '../../assets/vector/youtube_white.svg'
import facebookIcon from '../../assets/vector/facebook_white.svg'
import copyrightWhite from '../../assets/vector/copyright_white.svg'

const Footer = () => {
  const nav = useNavigate()

  const contactDetails = [
    {
      image: mailBlack,
      text: 'olineo_nexus@gmail.com',
    },
    {
      image: locationBlack,
      text: 'address, Mumbai, India',
    },
    {
      image: phoneBlack,
      text: '+91 9167658972',
    },
  ]

  const socialIcon = [
    instagramIcon, twitterIcon, linkedinIcon, youtubeIcon, facebookIcon
  ]

  return (
    <footer className='footerContainer'>
      <div className="footer_company_detail">
        <div className="footer_logo">
          <img src={footerLogo} alt="" />
        </div>
        <p className="footer_details">
          Short desciption_Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque enim sagittis consectetur egestas nec, nec amet, ultrices. Leo quis tellus pellentesque neque, mi, pretium.
        </p>
      </div>
      <div className="contact_details">
        <p className="contact_heading">Contact Us</p>
        <div className="contact_link_container">
          {
            contactDetails.map((item, index) => (
              <div className="contact_link" key={index}>
                <img src={item.image} alt="" />
                <p className="contact_link_text">
                  {item.text}
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="footer_last">
        <div className="social_links_container">
          <p className="footer_last_heading">Follow Us</p>
          <div className="social_links_wrapper">
            {
              socialIcon.map((icon, index) => (
                <img key={index} src={icon} alt="" />
              ))
            }
          </div>
        </div>
        <div className="footer_terms_container">
          <p className="footer_last_heading">Useful Links</p>
          <div className="footer_terms_wrapper">
            <div className='footer_terms_column1'>
              <p className="footer_terms">Deals of the day</p>
              <p className="footer_terms">O-Line-O Wallet</p>
              <p className="footer_terms">Wish List</p>
              <p className="footer_terms">Recently Viewed Products</p>
            </div>
            <div className="footer_terms_column2">
              <p className="footer_terms" onClick={() => nav('/customer-support')}>Customer Service</p>
              <p className="footer_terms">Terms & conditions</p>
              <p className="footer_terms">Privacy policy</p>
            </div>
          </div>
        </div>
        <div className="last_contact_details">
          <p className="footer_last_heading">Contact Us</p>
          <div className="contact_link_container">
            {
              contactDetails.map((item, index) => (
                <div className="contact_link last_contact" key={index}>
                  <img src={item.image} alt="" />
                  <p className="contact_link_text">
                    {item.text}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <img src={copyrightWhite} alt="" />
        <p>Olineo Nexus</p>
      </div>
    </footer>
  )
}

export default Footer
