import BoughtSearchForm from "./BoughtSearchBar.jsx";
import { FaSlidersH } from "react-icons/fa";
import BoughtProduct from "./BoughtProduct.jsx";
import { useEffect, useState } from "react";
import { getVentasCliente } from "../../api/venta.js";

const UserBought = () => {
  const [boughtProducto, setBoughProducto] = useState({});

  const getBoughtProduct = async () => {
    const { ventasTotales } = await getVentasCliente();
    setBoughProducto(ventasTotales);
  };

  useEffect(() => {
    const getBoughtProducts = async () => {
      await getBoughtProduct();
    };
    getBoughtProducts();
  }, []);

  if (!boughtProducto) {
    return <h1>No hay ventas</h1>;
  }

  return (
    <div className="h-full w-full space-y-4 pl-16 pr-16 pb-6">
      <div className="p-12 space-y-6 ml-16 mr-16">
        <h1 className="text-4xl font-bold">Compras</h1>
        <div className="flex items-center space-x-8">
          <BoughtSearchForm
            placeholder="Buscar"
            inputClassName="text-lg border bg-whit rounded-xl"
          />
          <FaSlidersH className="text-2xl" />
          <p className="pr-6 mr-6 border-r-2 border-b-black">Todas</p>
          <p className="font-light">{boughtProducto.comprasTotales} Compras</p>
        </div>
      </div>
      {boughtProducto.comprasTotales ? (
        boughtProducto.ventas?.map((venta) =>
          venta.Productos?.map((producto) => (
            <BoughtProduct
              key={producto.clave_producto}
              producto={producto}
              cantidadCompras={producto.ventaProducto?.cantidad_comprada}
              fechaVenta={venta.fecha}
            />
          ))
        )
      ) : (
        <h1>No hay compras</h1>
      )}
    </div>
  );
};

export default UserBought;
