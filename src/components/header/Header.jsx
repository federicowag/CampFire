import React from 'react'
import { NavBar } from './NavBar'
import { CartWidget } from './CartWidget'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
         <Link to="/" className="logo-link">
         <img src="/public/img/logo.jfif" alt="Foto 1" className="logo-img" />
      </Link>
      <NavBar />
      <CartWidget />
    </header>
  )
};

export default Header;