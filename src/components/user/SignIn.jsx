import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import FormInput from "../form/FormInput.jsx";
import Submit from "../form/Submit.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks/index.js";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    correo: "",
    contrasena: "",
  });

  const { handleLogin, authInfo } = useAuth();

  const { isLoggedIn, isPending } = authInfo;

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const validateSignIn = () => {
    if (!userInfo.correo)
      return { error: "Por favor ingresa un correo electrónico" };
    if (!userInfo.contrasena)
      return { error: "Por favor ingresa una contraseña" };
    if (userInfo.contrasena.length < 8)
      return { error: "La contraseña debe tener al menos 8 caracteres" };
    return { error: null };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateSignIn();
    if (error) updateNotification("error", error);
    handleLogin(userInfo.correo, userInfo.contrasena);
  };

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/"); //Mover al usuario a otro lado
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col mt-4 h-max items-center justify-center">
      <span className="text-8xl mt-4">
        <FaUserCircle />
      </span>
      <form className="mt-4 w-96" onSubmit={handleSubmit}>
        <h1 className="mt-4 font-bold text-2xl text-center mb-4">
          Inicia sesión en tu cuenta
        </h1>
        <FormInput
          label="Correo electrónico"
          name="correo"
          placeholder="ej.@ejemplo.com.mx"
          value={userInfo.correo}
          onChange={handleOnChange}
          type="email"
        />
        <FormInput
          label="Contraseña"
          name="contrasena"
          placeholder="********"
          value={userInfo.contrasena}
          onChange={handleOnChange}
          type="password"
        />
        <Submit value="Iniciar sesión" busy={isPending}></Submit>
      </form>
      <p className="mt-14">
        ¿Aún no tienes una cuenta?{" "}
        <Link
          to="/register"
          className="underline hover:no-underline text-blue-700"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
