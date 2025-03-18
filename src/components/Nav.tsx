import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Search</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className="nav-link">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
