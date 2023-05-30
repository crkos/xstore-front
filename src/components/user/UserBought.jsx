import { useEffect, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import "jspdf-autotable";
import BoughtSearchForm from "./BoughtSearchBar.jsx";
import BoughtProduct from "./BoughtProduct.jsx";
import { getVentasCliente, searchVenta } from "../../api/venta.js";
import { useAuth, useNotification } from "../../hooks/index.js";
import { useNavigate } from "react-router-dom";
import { downloadTicket } from "../../utils/downloadTicket.js";

const UserBought = () => {
  const [boughtProducto, setBoughtProducto] = useState({});
  const [showResetIcon, setShowResetIcon] = useState(false);

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const getBoughtProduct = async () => {
    const { ventasTotales } = await getVentasCliente();
    setBoughtProducto(ventasTotales);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      updateNotification("error", "No tienes una sesión iniciada");
      navigate("/");
    }
  }, [isLoggedIn, navigate, updateNotification]);

  useEffect(() => {
    getBoughtProduct();
  }, []);

  const handleOnReset = async () => {
    setShowResetIcon(false);
    await getBoughtProduct();
  };

  const handleSearchSale = async (value) => {
    const { ventasTotales } = await searchVenta(value);
    if (!ventasTotales) {
      setShowResetIcon(true);
      setBoughtProducto({});
    } else {
      setShowResetIcon(true);
      setBoughtProducto(ventasTotales);
    }
  };

  return (
    <div className="h-full w-full space-y-4 pl-16 pr-16 pb-6">
      <div className="p-12 space-y-6 ml-16 mr-16">
        <h1 className="text-4xl font-bold">Compras</h1>
        <div className="flex items-center space-x-8">
          <BoughtSearchForm
            placeholder="Buscar"
            inputClassName="text-lg border bg-whit rounded-xl"
            onSubmit={handleSearchSale}
            showResetIcon={showResetIcon}
            onReset={handleOnReset}
          />
          <FaSlidersH className="text-2xl" />
          <p className="pr-6 mr-6 border-r-2 border-b-black">Todas</p>
          <p className="font-light">{boughtProducto.comprasTotales} Compras</p>
        </div>
      </div>
      {boughtProducto.ventas && boughtProducto.ventas.length > 0 ? (
        boughtProducto.ventas.map((venta) =>
          venta.Productos?.map((producto) => (
            <div key={producto.clave_producto}>
              <BoughtProduct
                producto={producto}
                cantidadCompras={producto.ventaProducto?.cantidad_comprada}
                fechaVenta={venta.fecha}
                estado={producto.ventaProducto?.estado_venta}
                clave_venta={producto.ventaProducto?.clave_venta}
                afterReturn={getBoughtProduct}
              />
              <button onClick={() => downloadTicket(producto, venta.fecha)}>
                Download Ticket
              </button>
            </div>
          ))
        )
      ) : (
        <h1 className="text-center font-bold text-xl">No hay compras</h1>
      )}
    </div>
  );
};

export default UserBought;
