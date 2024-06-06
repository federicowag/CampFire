
import  ItemListContainer  from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import { Header } from "./components/header/Header"
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/main.css"

function App() {

  const [numerito, setNumerito] = useState(1);


  return (
    
      <BrowserRouter>
        <Header numerito={numerito} setNumerito={setNumerito} />
        <Routes>
          <Route path="/" element={<ItemListContainer />}/>
          <Route path="/category/:categoryId" element={<ItemListContainer />}/>
          <Route path="/item/:itemId" element={<ItemDetailContainer />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App