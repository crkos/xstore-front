import { useProducts } from "../../hooks/index.js";
import { useEffect } from "react";
import { AiFillEdit, AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FloatingButton from "./FloatingButton.jsx";
import { MdDeleteForever } from "react-icons/md";

//TODO: Poder agregar mas productos
const Inventario = () => {
  const { fetchProductos, products } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductos();
    };
    fetchProducts();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <AiFillPrinter className="text-3xl" />
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
        <table className="table-auto table border-black border-separate bg-modalBorderColor bg-opacity-50 rounded border-spacing-3">
          <thead className="p-2">
            <tr className="space-x-24 p-6 text-center">
              <th>Código</th>
              <th>Clave proveedor</th>
              <th>Clave departamento</th>
              <th>Nombre producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {products.map((product) => (
              <TableRow key={product.clave_producto} product={product} />
            ))}
          </tbody>
        </table>
      </div>
      <FloatingButton />
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const TableRow = ({ product }) => {
  const {
    clave_producto,
    clave_proveedor,
    clave_departamento,
    nombre_producto,
    existencia,
  } = product;

  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{clave_producto}</td>
      <td>{clave_proveedor}</td>
      <td>{clave_departamento}</td>
      <td>{nombre_producto}</td>
      <td>{existencia}</td>
    </tr>
  );
};

TableRow.propTypes = {
  product: PropTypes.shape({
    clave_producto: PropTypes.string.isRequired,
    clave_proveedor: PropTypes.string.isRequired,
    clave_departamento: PropTypes.string.isRequired,
    nombre_producto: PropTypes.string.isRequired,
    existencia: PropTypes.number.isRequired,
  }),
};

export default Inventario;
