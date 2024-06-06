import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import data from "../data/productos.json"
import categories from "../data/categorias.json" 
import ItemList from "./ItemList";



export const ItemListContainer = () => {
  let { categoryId } = useParams();
  let [productos, setProductos] = useState([]);
  let [titulo, setTitulo] = useState("Productos");
  
  const pedirProductos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    })
  }

  useEffect(() => {
    pedirProductos()
      .then((res) => {
        if (!categoryId) {
          setTitulo("Productos");
          setProductos(res);
        } else {
          const category = categories.find((cat) => cat.id.toString() === categoryId);
          setTitulo(category.nombre);
          setProductos(res.filter((prod) => prod.categoria.id.toString() === categoryId));
        }
      })
  }, [categoryId]);
  
  return (
    <div className="item-list-container">
      <h1>{titulo}</h1>
      <ItemList productos={productos} />
    </div>
  )
}

export default ItemListContainer;
