import { createContext, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);
    if (productoEncontrado) {
      setCarrito(carrito.map(prod =>
        prod.id === producto.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
      ));
      toast.success(`Agregaste ${producto.nombre} al carrito!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      toast.success(`${producto.nombre} producto agregado!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const calcularCantidad = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0).toFixed(2);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  }

  const eliminarProducto = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id)
    const indice = carrito.indexOf(productoEncontrado);

    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(indice, 1);
    setCarrito(nuevoCarrito);
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito(carrito.map(prod =>
      prod.id === id
        ? { ...prod, cantidad }
        : prod
    ));
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, calcularCantidad, calcularTotal, vaciarCarrito, eliminarProducto, actualizarCantidad }}>
      {children}
    </CartContext.Provider>
  )
}
