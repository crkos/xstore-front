import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import { ProductContext } from "../context/ProductProvider.jsx";
import { CartContext } from "../context/CartProvider.jsx";
import { SearchContext } from "../context/SearchProvider.jsx";

// Hook para las notificaciones
export const useNotification = () => {
  return useContext(NotificationContext);
};

// Hook para la autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Hook para los productos
export const useProducts = () => {
  return useContext(ProductContext);
};

// Hook para el carrito de compras
export const useCart = () => {
  return useContext(CartContext);
};
// Hook para el buscador de cualquier cosa
export const useSearch = () => {
  return useContext(SearchContext);
};
