import { useAuth, useNotification } from "../../hooks/index.js";
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FloatingButton from "./FloatingButton.jsx";
import AddProductoModal from "./AddProductoModal.jsx";
import { createProducto, getProductosBySucursal } from "../../api/products.js";
import handlePrint from "./helper/handlePrint.js";

const Inventario = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productos, setProductos] = useState([]);

  const { authInfo } = useAuth();

  const isAdmin = authInfo?.profile?.role === "Administrador";

  const fetchProductos = async () => {
    const { productos } = await getProductosBySucursal();
    setProductos(productos);
  };

  const { updateNotification } = useNotification();
  const handleOpenAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const onSubmit = async (formData) => {
    const { message, error } = await createProducto(formData);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    handleCloseAddProduct();
    await fetchProductos();
    setShowAddProduct(false);
  };

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
        <button
          onClick={() => handlePrint("Inventario.pdf", "tabla", "paisaje")}
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
              <th>Código</th>
              <th>Clave proveedor</th>
              <th>Clave departamento</th>
              <th>Nombre producto</th>
              <th>Cantidad</th>
              <th>Sucursal</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {productos.length
              ? productos.map((product) => (
                  <TableRow key={product.clave_producto} product={product} />
                ))
              : null}
          </tbody>
        </table>
      </div>
      <FloatingButton onClick={handleOpenAddProduct} show={isAdmin} />
      <AddProductoModal
        visible={showAddProduct}
        onClose={handleCloseAddProduct}
        afterAdd={fetchProductos}
        onSubmit={onSubmit}
      />
    </section>
  );
};

const TableRow = ({ product }) => {
  const {
    clave_producto,
    clave_proveedor,
    clave_departamento,
    nombre_producto,
    existencia,
    Sucursal,
  } = product;

  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{clave_producto}</td>
      <td>{clave_proveedor}</td>
      <td>{clave_departamento}</td>
      <td>{nombre_producto}</td>
      <td>{existencia}</td>
      <td>{Sucursal.nombre_sucursal}</td>
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
    Sucursal: PropTypes.shape({
      sucursal: PropTypes.string,
    }),
  }),
};

export default Inventario;
