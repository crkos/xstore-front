import BoughtSearchForm from "./BoughtSearchBar.jsx";
import { FaSlidersH } from "react-icons/fa";
import BoughtProduct from "./BoughtProduct.jsx";
import { useEffect, useState } from "react";
import { getVentasCliente, searchVenta } from "../../api/venta.js";
import { useAuth, useNotification } from "../../hooks/index.js";
import { useNavigate } from "react-router-dom";

const UserBought = () => {
  const [boughtProducto, setBoughtProducto] = useState({});
  const [showResetIcon, setShowResetIcon] = useState(false);

  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  useEffect(() => {
    if (!isLoggedIn) {
      updateNotification("error", "No tienes una sesión iniciada");
      navigate("/");
    }
  });

  const getBoughtProduct = async () => {
    const { ventasTotales } = await getVentasCliente();
    setBoughtProducto(ventasTotales);
  };

  const handleOnReset = async () => {
    setShowResetIcon(false);
    await getBoughtProduct();
  };

  const handleSearchSale = async (value) => {
    const { ventasTotales } = await searchVenta(value);
    //No era ventasTotales.length porque era un objeto... no un array, no olvidar...
    if (!ventasTotales) {
      setShowResetIcon(true);
      setBoughtProducto({});
    }
    setShowResetIcon(true);
    setBoughtProducto(ventasTotales);
  };

  useEffect(() => {
    const getBoughtProducts = async () => {
      await getBoughtProduct();
    };
    getBoughtProducts();
  }, []);

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
        boughtProducto.ventas.map((venta) => {
          return venta.Productos?.map((producto) => {
            return (
              <BoughtProduct
                key={producto.clave_producto}
                producto={producto}
                cantidadCompras={producto.ventaProducto?.cantidad_comprada}
                fechaVenta={venta.fecha}
              />
            );
          });
        })
      ) : (
        <h1 className="text-center font-bold text-xl">No hay compras</h1>
      )}
    </div>
  );
};

export default UserBought;
