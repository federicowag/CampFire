import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemList from "./ItemList";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";


export const ItemListContainer = () => {
  let { categoryId } = useParams();
  console.log("categoryId:", categoryId);
  let [productos, setProductos] = useState([]);
  let [titulo, setTitulo] = useState("Productos");

  useEffect(() => {
    const productosRef = collection(db, "productos");
    const q = categoryId ? query(productosRef, where("categoria.id", "==", categoryId)) : productosRef;

    const categoriasRef = collection(db, "categorias");
    let catQuery = categoryId && query(categoriasRef, where("id", "==", categoryId));

    getDocs(q)
      .then((res) => {
        console.log("Productos response:", res.docs);
        if (!res.empty) {
          setProductos(
            res.docs.map((doc) => ({
              ...doc.data(), id: doc.id
            }))
          );
        } else {
          setProductos([]);
        }
      })
      .catch((error) => {
        console.error("Error getting products:", error);
        setProductos([]);
      });

    if (catQuery) {
      getDocs(catQuery)
        .then((res) => {
          console.log("Categorías response:", res.docs);
          if (res.docs.length > 0) {
            const categoria = res.docs[0].data();
            if (categoria) {
              setTitulo(categoria.nombre);
            } else {
              setTitulo("Productos");
            }
          } else {
            setTitulo("Productos");
          }
        })
        .catch((error) => {
          console.error("Error getting category:", error);
          setTitulo("Productos");
        });
    } else {
      setTitulo("Productos");
    }

  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h1>{titulo}</h1>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
