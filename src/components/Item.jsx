import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './context/CartContext'
import "/src/css/main.css"

export const Item = ({ producto }) => {

  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="producto">
      <img className="producto-detail-image" src={producto.imagen} alt={producto.nombre} />
      <h2 className="producto-detail-name">{producto.nombre}</h2>
      <p className="producto-detail-price">${producto.precio}</p>
      <p className="producto-detail-description">{producto.descripcion}</p>
      <Link to={`/item/${producto.id}`} className="producto-detail-link">Más info</Link>
      <button className="boton-carrito" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  )}