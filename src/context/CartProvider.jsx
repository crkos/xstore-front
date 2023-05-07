import { useState, createContext, useEffect } from "react";
import { useNotification } from "../hooks/index.js";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const { updateNotification } = useNotification();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCartItems = (newCartItems) => {
    const existItem = cartItems.find(
      (item) => item.clave_producto === newCartItems.clave_producto
    );

    if (existItem) {
      setCartItems((prevState) => {
        const newCartItems = prevState.map((item) => {
          if (item.clave_producto === existItem.clave_producto) {
            const newCantidad = item.cantidad + 1;
            const newExistencia = item.existencia - 1;
            // Update the corresponding product in the products state
            return {
              ...item,
              cantidad: newCantidad,
              existencia: newExistencia,
            };
          }
          return item;
        });
        if (existItem.existencia <= 0) {
          return prevState;
        }
        return newCartItems;
      });
      return;
    } else {
      newCartItems.cantidad = 1;
      newCartItems.existencia -= 1;
    }

    updateNotification("success", "Producto agregado al carrito");

    setCartItems((prevState) => [...prevState, newCartItems]);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
