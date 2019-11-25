import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = ({ page, clearFretboard, logout, username}) => {
  return (
    <div className="nav_container">
      <ul>
        <li><Link className="button-link" to={`/${page.toLowerCase()}`}><button onClick={clearFretboard}>{page}</button></Link></li>
        <li><img className='navbar-logo' src="/assets/chordtones-icon-black.png" alt="chordtones-logo" /><h3 className="navbar-logo-text">chordTones</h3></li>
        <li><button onClick={logout}>Logout {username}</button></li>
      </ul>
    </div>
  );
}

export default Navbar;
