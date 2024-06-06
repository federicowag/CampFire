import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from "../data/productos.json";

const ItemDetailContainer = () => {

    let { itemId } = useParams();
    let [producto, setProducto] = useState(undefined);

    useEffect(() => {
        setProducto(data.find((prod) => prod.id === parseInt(itemId)));
    }, [itemId])
    

    return (
      <div className='item-detail-container'> {
        producto ? 
        <div className='producto-detail'>
          <img className='producto-detail-image' src={producto.imagen} />
          <h2 className='producto-detail-name'>{producto.nombre}</h2>  
          <p className='producto-detail-price'>${producto.precio}</p>
          <p className='producto-detail-description'>{producto.descripcion}</p>
        </div>
        : "Espere..."
      }
      </div>
    )
  }

export default ItemDetailContainer