import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h1`
  font-size: 18px;
  margin: 0 0 10px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin: 0 0 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 10px;
`;

const QuantitySelect = styled.select`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #ffffff;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const Total = styled.h2`
  font-size: 22px;
  margin-top: 20px;
  text-align: right;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const EmptyCartMessage = styled.h2`
  font-size: 18px;
  text-align: center;
  color: #6c757d;
`;

export const Carrito = () => {
  const { carrito, calcularTotal, vaciarCarrito, eliminarProducto, actualizarCantidad } = useContext(CartContext);

  const handleCantidadChange = (id, cantidad) => {
    actualizarCantidad(id, cantidad);
  };
  
  return (
    <Container>
      {carrito.map((prod) => (
        <Product key={prod.id}>
          <ProductImage src={prod.imagen} alt={prod.nombre} />
          <ProductDetails>
            <ProductName>{prod.nombre}</ProductName>
            <ProductPrice>${prod.precio}</ProductPrice>
            <ProductDescription>{prod.descripcion}</ProductDescription>
          </ProductDetails>
          <QuantitySelect
            value={prod.cantidad}
            onChange={(e) => handleCantidadChange(prod.id, parseInt(e.target.value))}
          >
            {[...Array(51).keys()].slice(1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </QuantitySelect>
          <DeleteButton onClick={() => eliminarProducto(prod)}>❌</DeleteButton>
        </Product>
      ))}

      {carrito.length > 0 ? (
        <>
          <Total>Total: ${calcularTotal()}</Total>
          <ActionButton onClick={vaciarCarrito}>Vaciar carrito</ActionButton>
          <Link to="/finalizar-compra">
            <ActionButton>Finalizar compra</ActionButton>
          </Link>
        </>
      ) : (
        <EmptyCartMessage>¡Actualmente el carrito esta vacio, echa un vistazo a todos los productos que tenemos!</EmptyCartMessage>
      )}
    </Container>
  );
};
