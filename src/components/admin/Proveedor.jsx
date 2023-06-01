import handlePrint from "./helper/handlePrint.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import FloatingButton from "./FloatingButton.jsx";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { getProveedores } from "../../api/proveedor.js";
import PropTypes from "prop-types";
import EliminarProveedorModal from "./EliminarProveedorModal.jsx";
import AñadirProveedorModal from "./AñadirProveedorModal.jsx";
import { AiFillPrinter } from "react-icons/ai";

const Proveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showAnadirProveedor, setShowAnadirProveedor] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState("");
  const fetchProveedores = async () => {
    const { proveedores } = await getProveedores();
    setProveedores(proveedores);
  };

  const handleEliminar = () => {
    setShowEliminar(true);
  };

  const handleEliminarClose = () => {
    setShowEliminar(false);
  };

  const handleSelectedProveedor = (proveedor) => {
    setSelectedProveedor(proveedor);
  };

  useEffect(() => {
    const fetchProveedoresAll = async () => {
      await fetchProveedores();
    };
    fetchProveedoresAll();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <button
          onClick={() => handlePrint("Proveedores.pdf", "tabla", "paisaje")}
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
              <th className="border-separate">Clave proveedor</th>
              <th>Nombre proveedor</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>RFC</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {proveedores.length
              ? proveedores.map((proveedor) => (
                  <TableRow
                    key={proveedor.clave_proveedor}
                    proveedor={proveedor}
                    handleEliminar={handleEliminar}
                    handleSelectedProveedor={handleSelectedProveedor}
                  />
                ))
              : null}
          </tbody>
        </table>
        <FloatingButton onClick={() => setShowAnadirProveedor(true)} />
        <EliminarProveedorModal
          claveProveedor={selectedProveedor}
          onClose={handleEliminarClose}
          afterDelete={fetchProveedores}
          showContainer={showEliminar}
        />
        <AñadirProveedorModal
          onClose={() => setShowAnadirProveedor(false)}
          showContainer={showAnadirProveedor}
          onSubmit={fetchProveedores}
        />
      </div>
    </section>
  );
};

const TableRow = ({ proveedor, handleEliminar, handleSelectedProveedor }) => {
  const handleEliminarSelected = () => {
    handleSelectedProveedor(proveedor.clave_proveedor);
    handleEliminar();
  };

  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{proveedor.clave_proveedor}</td>
      <td>{proveedor.nombre_proveedor}</td>
      <td>{proveedor.direccion}</td>
      <td>{proveedor.telefono}</td>
      <td>{proveedor.correo}</td>
      <td>{proveedor.rfc}</td>
      <td>
        <button onClick={handleEliminarSelected}>{<MdDeleteForever />}</button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  proveedor: PropTypes.object.isRequired,
  handleEliminar: PropTypes.func,
  handleSelectedProveedor: PropTypes.func,
};

export default Proveedor;
