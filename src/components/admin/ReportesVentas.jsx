import { AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVentas } from "../../api/venta.js";
import { useAuth } from "../../hooks/index.js";
import { priceFormatter } from "../../utils/formatter.js";
import PropTypes from "prop-types";
import { downloadTicket } from "../../utils/downloadTicket.js";
import handlePrint from "./helper/handlePrint.js";

const ReportesVentas = () => {
  const [ventasT, setVentasT] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterEmail, setFilterEmail] = useState("");

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
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchAllVentas = async () => {
      await fetchVentas();
    };
    fetchAllVentas();
  }, []);

  useEffect(() => {
    const filteredData = ventasT.ventas?.filter((venta) => {
      const ventaDate = new Date(venta.fecha).toLocaleDateString("es-MX", {
        timeZone: "UTC",
      });
      const filterDateFormatted = new Date(filterDate).toLocaleDateString(
        "es-MX",
        { timeZone: "UTC" }
      );

      const userEmail = venta.Cliente.correo;

      if (filterDate && filterEmail) {
        return (
          ventaDate === filterDateFormatted && userEmail.includes(filterEmail)
        );
      } else if (filterDate) {
        return ventaDate === filterDateFormatted;
      } else if (filterEmail) {
        return userEmail.includes(filterEmail);
      }
      return true;
    });

    setFilteredVentas(filteredData);
  }, [ventasT.ventas, filterDate, filterEmail]);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Reportes de ventas</h1>
        <button onClick={() => handlePrint("Reporte.pdf", "tabla")}>
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
        <div className="flex items-center space-x-4">
          <input
            type="date"
            placeholder="Filtrar por fecha"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por correo del usuario"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            className="p-2 border rounded w-fit"
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <table
          className="table-auto table border-black border-separate bg-modalBorderColor bg-opacity-50 rounded border-spacing-3"
          id="tabla"
        >
          <thead className="p-2">
            <tr className="space-x-24 p-2">
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Precio total</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredVentas
              ? filteredVentas.map((venta) => (
                  <TableRow key={venta.clave_venta} venta={venta} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const TableRow = ({ venta }) => {
  const formattedDate = new Date(venta.fecha).toLocaleDateString("es-MX", {
    timeZone: "UTC",
  });
  const userEmail = venta.Cliente.correo;

  // eslint-disable-next-line react/prop-types
  const { Productos } = venta;

  return (
    <>
      {/* eslint-disable-next-line react/prop-types */}
      {Productos.map((producto) => (
        <tr key={producto.clave_producto} className="text-center">
          <td className="p-2">{formattedDate}</td>
          <td className="p-2">{userEmail}</td>
          <td className="p-2">{producto.nombre_producto}</td>
          <td className="p-2">{priceFormatter.format(producto.precio)}</td>
          <td className="p-2">
            {priceFormatter.format(
              producto.ventaProducto?.cantidad_comprada * producto.precio
            )}
          </td>
          <td className="p-2">{producto.ventaProducto?.cantidad_comprada}</td>
          <td className="p-2">
            <button onClick={() => downloadTicket(producto, venta.fecha)}>
              <AiFillPrinter />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

TableRow.propTypes = {
  venta: PropTypes.shape({
    clave_venta: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    Cliente: PropTypes.shape({
      correo: PropTypes.string.isRequired,
    }),
    Producto: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ReportesVentas;
