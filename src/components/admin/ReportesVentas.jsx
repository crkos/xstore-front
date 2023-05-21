import { AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVentas } from "../../api/venta.js";
import { useAuth } from "../../hooks/index.js";
import { priceFormatter } from "../../utils/formatter.js";
import PropTypes from "prop-types";
import FloatingButton from "./FloatingButton.jsx";

const ReportesVentas = () => {
  const [ventasT, setVentasT] = useState([]);
  const fetchVentas = async () => {
    const { ventasTotales } = await getAllVentas();
    setVentasT(ventasTotales);
  };

  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchAllVentas = async () => {
      await fetchVentas();
    };
    fetchAllVentas();
  }, []);

  const { ventas } = ventasT;

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Reportes de ventas</h1>
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
              <th>Clave venta</th>
              <th>Código del producto</th>
              <th>Nombre del producto</th>
              <th>Cantidad de producto vendido</th>
              <th>Fecha de la venta</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {ventas
              ? ventas.map((venta) => (
                  <TableRow key={venta.clave_venta} venta={venta} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const TableRow = ({ venta }) => {
  const { clave_venta, fecha } = venta;

  const fechaFormateada = new Date(fecha);

  const { Productos } = venta;

  return (
    <>
      {Productos
        ? // eslint-disable-next-line react/prop-types
          Productos.map((producto) => (
            <tr className="text-center" key={producto.clave_producto}>
              <td>{clave_venta}</td>
              <td>{producto.clave_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.ventaProducto?.cantidad_comprada}</td>
              <td>{fechaFormateada.toLocaleDateString("es-MX")}</td>
              <td>
                {priceFormatter.format(
                  producto.ventaProducto?.cantidad_comprada * producto.precio
                )}
              </td>
            </tr>
          ))
        : null}
    </>
  );
};

TableRow.propTypes = {
  venta: PropTypes.shape({
    clave_venta: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    Productos: PropTypes.arrayOf(
      PropTypes.shape({
        clave_producto: PropTypes.string.isRequired,
        nombre_producto: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        ventaProducto: PropTypes.shape({
          cantidad_comprada: PropTypes.number.isRequired,
        }),
      })
    ),
  }),
};

export default ReportesVentas;
