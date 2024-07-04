import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemList from "./ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";



export const ItemListContainer = () => {
  let { categoryId } = useParams();
  let [productos, setProductos] = useState([]);

  let [titulo, setTitulo] = useState("Productos");
  
  useEffect(() => {

    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((res) => {
        setProductos(
          res.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
          })
        )
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
