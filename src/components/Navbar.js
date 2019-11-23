import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = props => {
  return (
    <div className="nav_container">
      <ul>
        <li><Link className="button-link" to={`/${props.page}`}><button onClick={() => props.clearFretboard()}>{props.page[0].toUpperCase() + props.page.slice(1)}</button></Link></li>
        <li><img className='navbar-logo' src="/assets/chordtones-icon-black.png" alt="chordtones-logo" /><h3 className="navbar-logo-text">chordTones</h3></li>
        <li><button onClick={props.logout}>Logout {props.username}</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
