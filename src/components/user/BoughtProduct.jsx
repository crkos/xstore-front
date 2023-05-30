import { cancelarVenta, devolverVenta } from "../../api/venta.js";

const BoughtProduct = ({
  producto,
  cantidadCompras,
  fechaVenta,
  estado,
  clave_venta,
  afterReturn,
}) => {
  const fechaFormateada = new Date(fechaVenta);
  const fechaVentaFormateada = fechaFormateada.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let unidades = "Unidad";

  if (cantidadCompras > 1) {
    unidades = "Unidades";
  }

  let estadoVenta;

  if (estado === "Entregado") {
    estadoVenta = "Devolver";
  } else if (estado === "Envío") {
    estadoVenta = "Cancelar";
  } else {
    estadoVenta = null;
  }

  const handleDevolverVenta = async () => {
    await devolverVenta(clave_venta);
    await afterReturn();
  };

  const handleCancelVenta = async () => {
    await cancelarVenta(clave_venta);
    await afterReturn();
  };

  return (
    <div className="border-4 rounded-xl h-full">
      <div className="w-full ">
        <div className="border-b-4">
          <h2 className="ml-4 p-2">{fechaVentaFormateada}</h2>
        </div>
        <div className="flex items-center">
          <div className="pt-2">
            <div className="rounded-2xl border-4 m-4 h-36 w-36">
              <img alt="Imagen de producto" src="/xstore.png"></img>
            </div>
          </div>
          <div className="w-full">
            <div className="space-y-2">
              <p className="text-green-600 font-bold mb-8">{estado}</p>
              <div className="flex space-x-14">
                <div>
                  {/* eslint-disable-next-line react/prop-types */}
                  <p className="text-lg font-light">
                    {producto.nombre_producto}
                  </p>
                  <p className="text-md font-light">
                    {cantidadCompras + " " + unidades}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {estadoVenta !== null && // Nueva condición añadida
              (estadoVenta === "Entregado" ? (
                <button
                  className="pt-2 pb-2 pl-5 pr-5 border-2 mr-5 bg-red-400"
                  onClick={() => handleDevolverVenta()}
                >
                  {estadoVenta}
                </button>
              ) : (
                <button
                  className="pt-2 pb-2 pl-5 pr-5 border-2 mr-5 bg-red-400"
                  onClick={() => handleCancelVenta()}
                >
                  {estadoVenta}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoughtProduct;
