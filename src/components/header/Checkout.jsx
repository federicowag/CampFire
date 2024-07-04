import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../context/CartContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';

export const Checkout = () => {
  const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [docId, setDocId] = useState('');

  const comprar = (data) => {
    const pedido = {
      cliente: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        ciudad: data.ciudad,
        codigoPostal: data.codigoPostal,

      },
      productos: carrito,
      total: calcularTotal(),
      fecha: Timestamp.now(),
      metodoPago: data.metodoPago, 
    };

    const pedidosRef = collection(db, 'pedidos');

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setDocId(doc.id);
        vaciarCarrito();
        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado con exito!',
            text: `¡Genial! Tu pedido ya se encuentra en camino. El codigo para seguir tu pedido es: ${doc.id}.`,
          });
      })
      .catch((error) => {
        console.error('Error al procesar la compra:', error);
      });
  };

  if (docId) {
    return (
      <>
        <h1>Muchas gracias por tu compra</h1>
        <p>Para hacer el seguimiento de tu pedido, el identificador es este: {docId}</p>
      </>
    );
  }

  return (
    <div className="checkout-form-container">
      <div className="checkout-form">
        <h2>Información del Cliente</h2>
        <form onSubmit={handleSubmit(comprar)}>
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" {...register('nombre', { required: true })} className="form-control" />
            {errors.nombre && <span className="error-message">Por favor ingrese su nombre.</span>}
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" {...register('email', { required: true })} className="form-control" />
            {errors.email && <span className="error-message">Por favor ingrese un correo electrónico válido.</span>}
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" {...register('telefono')} className="form-control" />
          </div>

          <div className="form-group">
            <label>Dirección de entrega</label>
            <input type="text" {...register('direccion')} className="form-control" />
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            <input type="text" {...register('ciudad')} className="form-control" />
          </div>

          <div className="form-group">
            <label>Código Postal</label>
            <input type="text" {...register('codigoPostal')} className="form-control" />
          </div>

          <div className="form-group">
            <label>Método de pago</label>
            <select {...register('metodoPago', { required: true })} className="form-control">
              <option value="">Seleccione un método de pago</option>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Comprar</button>
        </form>
      </div>
    </div>
  );
};