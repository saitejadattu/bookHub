import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer-container">
      <ul className="footer-unordered-container">
        <li className="footer-list-item">
          <FaGoogle />
        </li>
        <li className="footer-list-item">
          <FaTwitter />
        </li>
        <li className="footer-list-item">
          <FaInstagram />
        </li>
        <li className="footer-list-item">
          <FaYoutube />
        </li>
      </ul>
      <p className="footer-para">Contact Us</p>
    </div>
  )
}
export default Footer
