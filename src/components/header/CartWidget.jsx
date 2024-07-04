import React, { useContext } from 'react'
import { BsCartCheck } from "react-icons/bs"
import { Link } from "react-router-dom"
import { CartContext } from '../context/CartContext'

export const CartWidget = () => {

  const { calcularCantidad } = useContext(CartContext)

  return (
    <Link className="carrito" to="/carrito">
      <BsCartCheck /> {calcularCantidad()}
    </Link>
  )
}