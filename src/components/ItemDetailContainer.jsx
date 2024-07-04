import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from "./ItemDetail"
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';


const ItemDetailContainer = () => {
  let { itemId } = useParams();
  let [producto, setProducto] = useState(undefined);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null); 

      try {
        if (!itemId) {
          throw new Error('ID del producto no proporcionado');
        }

        const docRef = doc(db, "productos", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No existe el documento');
          setError('No existe el documento');
        }
      } catch (error) {
        console.error('Error al recuperar el producto:', error);
        setError('Error al recuperar el producto. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  return (
    <div className='item-detail-container'>
      {loading ? (
        'Espere...'
      ) : error ? (
        <div className='error'>{error}</div>
      ) : producto ? (
        <ItemDetail producto={producto} />
      ) : (
        'Producto no encontrado.'
      )}
    </div>
  );
};

export default ItemDetailContainer;