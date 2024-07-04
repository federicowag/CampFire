import { ItemListContainer } from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Header from "./components/header/Header"; 
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/main.css";
import { Carrito } from "./components/header/Carrito"; 
import { NotFound } from "./components/NotFound";
import { CartProvider } from "./components/context/CartContext";
import { Suma } from "./components/Suma";
import { Checkout } from "./components/header/Checkout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from "./components/header/NavBar"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/suma" element={<Suma />} />
          <Route path="/finalizar-compra" element={<Checkout />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer /> {ToastContainer}
    </CartProvider>


  )
}

export default App