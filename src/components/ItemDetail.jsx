import React, { useContext } from 'react'
import { CartContext } from './context/CartContext'
import "/src/css/main.css"

export const ItemDetail = ({ producto }) => {

  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className='producto-detail'>
      <img className='producto-detail-image' src={producto.imagen} />
      <h2 className='producto-detail-name'>{producto.nombre}</h2>
      <p className='producto-detail-price'>${producto.precio}</p>
      <p className='producto-detail-description'>{producto.descripcion}</p>
      <button  onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  )
}