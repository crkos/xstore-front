import { createContext, useState, useEffect } from "react";
import { getIsAuth, loginCliente } from "../api/clientes";
import { useNotification } from "../hooks";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (correo, contrasena) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user, message } = await loginCliente({ correo, contrasena });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    updateNotification("success", message);

    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
    setAuthInfo({ ...defaultAuthInfo });
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      localStorage.removeItem("auth-token");
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      await isAuth();
    };
    checkAuth();
  }, []);

  //handleLogout, isAuth
  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
