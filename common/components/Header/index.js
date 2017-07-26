import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => (
  <header className="header">
    <Link to='/counter' className="link">Counter</Link>
    <Link to='/' className="link">Home</Link>
    <Link to='/users' className="link">Users</Link>
  </header>
)

export default Header;
