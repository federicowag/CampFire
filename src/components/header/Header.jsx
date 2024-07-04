import React from 'react'
import { NavBar } from './NavBar'
import { CartWidget } from './CartWidget'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito</Link>
      </nav>
    </header>
  );
};

export default Header;