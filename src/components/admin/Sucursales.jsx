import handlePrint from "./helper/handlePrint.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import FloatingButton from "./FloatingButton.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSucursales } from "../../api/sucursal.js";
import { AiFillPrinter } from "react-icons/ai";
import AñadirSucursalModal from "./AñadirSucursalModal.jsx";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [showAnadirSucursal, setShowAnadirSucursal] = useState(false);
  const fetchSucursales = async () => {
    const { sucursales } = await getSucursales();
    setSucursales(sucursales);
  };

  useEffect(() => {
    const fetchSucursalesAll = async () => {
      await fetchSucursales();
    };
    fetchSucursalesAll();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Sucursales</h1>
        <button
          onClick={() => handlePrint("Sucursales.pdf", "tabla", "paisaje")}
        >
          <AiFillPrinter className="text-3xl" />
        </button>
        <button className="flex items-center justify-center">
          <IoArrowBackOutline />
          <Link
            className="text-black font-bold text-xl underline"
            to="/consultas"
          >
            Volver
          </Link>
        </button>
      </div>
      <div className="flex justify-center mt-12">
        <table
          className="table-auto table border-black border-separate bg-modalBorderColor bg-opacity-50 rounded border-spacing-3"
          id="tabla"
        >
          <thead className="p-2">
            <tr className="space-x-24 p-6 text-center">
              <th className="border-separate">Clave Sucursal</th>
              <th>Nombre sucursal</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {sucursales.length
              ? sucursales.map((sucursal) => (
                  <TableRow key={sucursal.clave_sucursal} sucursal={sucursal} />
                ))
              : null}
          </tbody>
        </table>
        <FloatingButton onClick={() => setShowAnadirSucursal(true)} />
        <AñadirSucursalModal
          onClose={() => setShowAnadirSucursal(false)}
          showContainer={showAnadirSucursal}
          onSubmit={fetchSucursales}
        />
      </div>
    </section>
  );
};

const TableRow = ({ sucursal }) => {
  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{sucursal.clave_sucursal}</td>
      <td>{sucursal.nombre_sucursal}</td>
    </tr>
  );
};

TableRow.propTypes = {
  sucursal: PropTypes.object.isRequired,
  handleEliminar: PropTypes.func,
  handleSelectedSucursal: PropTypes.func,
};

export default Sucursales;
