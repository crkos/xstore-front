import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/index.js";

const Consultas = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  if (!isLoggedIn && authInfo.profile.role !== "Administrador") {
    navigate("/", { replace: true });
  }

  return (
    <section className="flex flex-col h-[100vh]">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <Link to="/plantilla">
          <BotonConsulta>Plantilla laboral</BotonConsulta>
        </Link>
        <Link to="/inventario">
          <BotonConsulta>Inventario</BotonConsulta>
        </Link>
        <Link to="/reportes">
          <BotonConsulta>Reportes de ventas</BotonConsulta>
        </Link>
      </div>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const BotonConsulta = ({ children }) => {
  return (
    <button className="bg-submitColor hover:bg-modalBorderColor transition pl-48 pr-48 pb-4 pt-4 drop-shadow-md shadow-lg rounded-lg text-2xl max-w-[675px] min-w-[600px] font-bold">
      {children}
    </button>
  );
};

export default Consultas;