import { useEffect, useState } from "react";
import { getClientes } from "../../api/clientes.js";
import { AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "jspdf-autotable";
import handlePrint from "./helper/handlePrint.js";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    const { clientes } = await getClientes();
    setClientes(clientes);
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchClientes();
    };
    fetch();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button onClick={() => handlePrint("clientes.pdf", "tabla")}>
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
              <th>Clave cliente</th>
              <th>Correo</th>
              <th>Función</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {clientes
              ? clientes.map((cliente) => (
                  <TableRow key={cliente.clave_cliente} cliente={cliente} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const TableRow = ({ cliente }) => {
  const { clave_cliente, correo, funcion } = cliente;

  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{clave_cliente}</td>
      <td>{correo}</td>
      <td>{funcion.funcion}/Cajero</td>
    </tr>
  );
};

TableRow.propTypes = {
  cliente: PropTypes.shape({
    clave_cliente: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    funcion: PropTypes.shape({
      funcion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Clientes;
