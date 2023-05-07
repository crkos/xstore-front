import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import { ProductContext } from "../context/ProductProvider.jsx";
import { CartContext } from "../context/CartProvider.jsx";

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProducts = () => {
  return useContext(ProductContext);
};

export const useCart = () => {
  return useContext(CartContext);
};
