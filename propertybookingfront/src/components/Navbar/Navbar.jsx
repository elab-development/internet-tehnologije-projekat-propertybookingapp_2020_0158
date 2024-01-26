import { Link } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  return (
    <div>
      <nav className="nav">
        <div className="nav__title"><h1>PROPERTY BOOKING APP</h1></div>
          <ul className="nav__list">
            <li className="nav__item">   <Link to='/'>WELCOME</Link></li>
            <li className="nav__item"> <Link to='/properties'>PROPERTIES</Link></li>
            <li className="nav__item"> <Link to='/agents'>AGENTS</Link></li>
          </ul>
      </nav>
    </div>
  );
}

export default NavBar;
