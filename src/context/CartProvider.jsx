import { useState, createContext, useEffect } from "react";
import { useNotification } from "../hooks/index.js";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hadItems, setHadItems] = useState(false);

  const { updateNotification } = useNotification();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setHadItems(true);
    }
    if (cartItems.length === 0 && hadItems) {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const deleteItem = (clave_producto) => {
    const newCartItems = cartItems.filter(
      (item) => item.clave_producto !== clave_producto
    );
    setCartItems(newCartItems);
  };

  const updateCantidad = (clave_producto, cantidad, cantidadExistencia) => {
    const getItem = cartItems.filter(
      (item) => item.clave_producto === clave_producto
    );

    if (getItem[0].existencia <= 0 && cantidadExistencia < 0) {
      return updateNotification("error", "No hay mas existencia");
    }

    if (getItem[0].cantidad <= 1 && cantidad <= 0) {
      return deleteItem(clave_producto);
    }

    setCartItems((prevState) => {
      return prevState.map((item) => {
        if (item.clave_producto === clave_producto) {
          return {
            ...item,
            cantidad: cantidad,
            existencia: item.existencia + cantidadExistencia,
          };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItems,
        updateCantidad,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
