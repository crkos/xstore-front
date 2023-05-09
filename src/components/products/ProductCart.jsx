import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { priceFormatter } from "../../utils/formatter.js";
import { useCart } from "../../hooks/index.js";

const ProductCart = ({ producto }) => {
  const { updateCantidad, deleteItem } = useCart();

  return (
    <tr>
      <td className="pt-2">
        <div className="rounded-2xl border-4 m-4">
          <img alt="Imagen de producto" src={producto.imagen_producto}></img>
        </div>
      </td>
      <td className="border-b-8 w-full">
        <div className="space-y-2">
          <div className="flex space-x-14">
            <div>
              {/* eslint-disable-next-line react/prop-types */}
              <p>{producto.nombre_producto}</p>
            </div>
            <div className="relative space-x-2 flex">
              <button
                type="button"
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-l-md"
                onClick={() => {
                  updateCantidad(
                    producto.clave_producto,
                    producto.cantidad - 1,
                    1
                  );
                }}
              >
                <HiMinusSm className="w-5 h-5" />
              </button>
              <input
                type="number"
                className="w-16 py-2 pr-8 text-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={producto.cantidad}
                onChange={() => {}}
              />
              <button
                type="button"
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-r-md"
                onClick={() => {
                  updateCantidad(
                    producto.clave_producto,
                    producto.cantidad + 1,
                    -1
                  );
                }}
              >
                <HiPlusSm className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="text-blue-600 font-bold"
            onClick={() => deleteItem(producto.clave_producto)}
          >
            Eliminar
          </button>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center pl-8 pr-8">
          {/* eslint-disable-next-line react/prop-types */}
          <p className="text-2xl">
            {priceFormatter.format(producto.precio * producto.cantidad)}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default ProductCart;
