// NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const Nav = ({ children }) => {
  return <nav className='navbar'>{children}</nav>;
};

export const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`} {...props}>
      {children}
    </Link>
  );
};
