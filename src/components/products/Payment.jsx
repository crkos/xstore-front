import { BsCash, BsCashStack, FaRegCreditCard } from "react-icons/all";
import { useEffect, useState } from "react";
import { priceFormatter } from "../../utils/formatter.js";
import { Link } from "react-router-dom";
import { useCart, useNotification } from "../../hooks/index.js";
import { createVenta } from "../../api/venta.js";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const { cartItems } = useCart();

  const { updateNotification } = useNotification();

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.cantidad * item.precio;
  }, 0);

  useEffect(() => {
    setTotal(totalItems);
    setProductos(cartItems);
  }, [totalItems]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePayment = async (cartItems) => {
    if (selectedOption === "creditCard") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        updateNotification("success", message);
      }
    } else if (selectedOption === "debitCard") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        updateNotification("success", message);
      }
    } else if (selectedOption === "cash") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        updateNotification("success", message);
      }
    } else if (selectedOption === "transfer") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        updateNotification("success", message);
      }
    } else {
      updateNotification("error", "Selecciona una opción de pago");
    }
  };

  if (cartItems.length === 0)
    return (
      <p className="text-2xl font-bold mt-14 w-full text-center">
        Sin productos
      </p>
    );

  return (
    <div className="h-screen flex items-center justify-evenly w-full">
      <section className="flex items-center justify-evenly h-full w-full space-x-8 pl-4 pr-4">
        <div>
          <div className="pb-4">
            <p className="text-2xl font-bold">¿Cómo quieres pagar?</p>
          </div>
          <div className="border-2 border-spacing-4 w-[650px] flex-shrink space-y-4">
            <div className="flex items-center space-x-8 border-b-4 p-4">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={selectedOption === "creditCard"}
                onChange={handleOptionChange}
              />
              <span className="text-2xl">
                <FaRegCreditCard />
              </span>
              <p>Tarjeta de Crédito</p>
            </div>
            <div className="flex items-center space-x-8 border-b-4 p-4">
              <input
                type="radio"
                name="payment"
                value="debitCard"
                checked={selectedOption === "debitCard"}
                onChange={handleOptionChange}
              />
              <span className="text-2xl">
                <FaRegCreditCard />
              </span>
              <p>Tarjeta de débito</p>
            </div>
            <div className="flex items-center space-x-8 border-b-4 p-4">
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={selectedOption === "transfer"}
                onChange={handleOptionChange}
              />
              <span className="text-2xl">
                <BsCashStack />
              </span>
              <p>Transferencia electrónica</p>
            </div>
            <div className="flex items-center space-x-8 border-b-4 p-4">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={selectedOption === "cash"}
                onChange={handleOptionChange}
              />
              <span className="text-2xl">
                <BsCash />
              </span>
              <div>
                <p>Efectivo en puntos de pago</p>
                <p className="text-xs">Oxxo, Soriana y otros</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[27rem] h-full bg-compraFondo flex flex-col items-center pl-4 pr-4">
          <img
            src={cartItems[0].imagen_producto}
            className="w-40 h-40 mt-6 rounded-full"
            alt={cartItems[0].descripcion}
          />
          <div className="pb-6 border-b-2 w-[85%] text-center mt-4 border-b-bordeColor">
            <p className="text-2xl font-thin">{cartItems[0].nombre_producto}</p>
            <p className="font-thin text-center">
              Cantidad: {cartItems[0].cantidad}
            </p>
          </div>
          <div className="mt-8 pl-4 pr-4 space-y-4 border-b-bordeColor border-b-2 w-[85%] pb-6">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-thin">Producto</p>
              <p className="text-2xl font-thin">
                {priceFormatter.format(total)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-thin">Envío</p>
              <p className="text-2xl font-thin">Gratis</p>
            </div>
          </div>
          <div className="mt-8 flex justify-between w-[85%] pl-4 pr-4">
            <p className="text-2xl font-thin">Pagas</p>
            <p className="text-2xl font-thin">{priceFormatter.format(total)}</p>
          </div>
          <div className="flex items-center justify-center mt-16">
            <button
              className="p-2 pl-20 pr-20 bg-compraBoton text-white rounded-2xl font-bold mt-3"
              onClick={() => handlePayment(productos)}
            >
              <Link to="/checkout">Continuar</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
