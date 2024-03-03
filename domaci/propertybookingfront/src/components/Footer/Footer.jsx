import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <div>
      <footer className="footer-container"> 
        <div className="footer-text">
          Email: property.booking@gmail.com
        </div> 
        <div className="social-icons">
          Kontaktirajte nas na:
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon" />
          </a>
        </div> 
      </footer> 
    </div>
  );
}

export default Footer;