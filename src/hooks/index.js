import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};
