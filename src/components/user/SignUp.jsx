import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import FormInput from "../form/FormInput.jsx";
import Submit from "../form/Submit.jsx";
import { Link, useNavigate /*useNavigate*/ } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks/index.js";
import Container from "../form/Container.jsx";
import { signUpCliente } from "../../api/clientes.js";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    correo: "",
    contrasena: "",
    confContrasena: "",
  });
  const [isPending, setIsPending] = useState(false);

  //const navigate = useNavigate();

  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const validateSignIn = () => {
    if (!userInfo.correo)
      return { error: "Por favor ingresa un correo electrónico" };
    if (!userInfo.contrasena)
      return { error: "Por favor ingresa una contraseña" };
    if (userInfo.contrasena.length < 8)
      return { error: "La contraseña debe tener al menos 8 caracteres" };
    if (userInfo.contrasena !== userInfo.confContrasena)
      return { error: "Las contraseñas no coinciden" };
    return { error: null };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateSignIn();
    if (error) updateNotification("error", error);
    setIsPending((prevState) => !prevState);
    const response = await signUpCliente(userInfo);
    if (response.error) {
      updateNotification("error", response.error);
      setIsPending((prevState) => !prevState);
    }
    if (response.user) {
      updateNotification("success", "Cuenta creada exitosamente");
      setIsPending((prevState) => !prevState);
      navigate("/login");
    }
  };

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/"); //Mover al usuario a otro lado
  }, [isLoggedIn]);

  return (
    <Container>
      <span className="text-8xl mt-4">
        <FaUserCircle />
      </span>
      <form className="mt-4 w-96" onSubmit={handleSubmit}>
        <h1 className="mt-4 font-bold text-2xl text-center mb-4">
          Crea tu cuenta
        </h1>
        <FormInput
          label="Correo electrónico"
          name="correo"
          placeholder="ej.@ejemplo.com.mx"
          value={userInfo.correo}
          onChange={handleOnChange}
          type="email"
          typeform="email"
        />
        <FormInput
          label="Contraseña"
          name="contrasena"
          placeholder="********"
          value={userInfo.contrasena}
          onChange={handleOnChange}
          type="password"
          typeform="password"
        />
        <FormInput
          label="Confirmar contraseña"
          name="confContrasena"
          placeholder="********"
          value={userInfo.confContrasena}
          onChange={handleOnChange}
          type="password"
          typeform="password"
        />
        <Submit value="Crear cuenta" busy={isPending}></Submit>
      </form>
      <p className="mt-6">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="underline hover:no-underline text-blue-700"
        >
          Iniciar sesión
        </Link>
      </p>
    </Container>
  );
};

export default SignUp;
