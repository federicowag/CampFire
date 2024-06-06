import { BsCartCheck } from "react-icons/bs"

export const Carrito = (props) => {
  
  return (
    <div className="carrito">
    <BsCartCheck/> {props.numerito}
    </div>
  )
}
