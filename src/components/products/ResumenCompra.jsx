import { useCart } from "../../hooks/index.js";
import { priceFormatter } from "../../utils/formatter.js";
import { Link } from "react-router-dom";

const ResumenCompra = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.cantidad * item.precio;
  }, 0);

  return (
    <div className="border-4 w-[425px] rounded-2xl">
      <div className="w-full border-b-4">
        <h2 className="font-bold text-2xl pl-3">Resumen de compras</h2>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <p>Producto</p>
          <p>{priceFormatter.format(totalItems)}</p>
        </div>
        <div className="flex justify-between">
          <p>Envio</p>
          <p>Gratis</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-bold">Total</p>
          <p>{priceFormatter.format(totalItems)}</p>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/checkout">
            <button className="p-2 pl-6 pr-6 bg-compraBoton text-white rounded-2xl font-bold mt-3">
              Continuar compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
