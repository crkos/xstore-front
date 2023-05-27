import {
  BsCash,
  BsCashStack,
  FaRegCreditCard,
  RxCheckCircled,
} from "react-icons/all";
import { useEffect, useState } from "react";
import { priceFormatter } from "../../utils/formatter.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCart, useNotification } from "../../hooks/index.js";
import { createVenta } from "../../api/venta.js";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [madePayment, setMadePayment] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("MXN");

  const { cartItems, clearCart } = useCart();

  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.cantidad * item.precio;
  }, 0);

  // Assuming you have the exchange rates for MXN to USD and vice versa
  const exchangeRateMXNtoUSD = 0.05; // 1 MXN = 0.05 USD
  const exchangeRateUSDtoMXN = 20; // 1 USD = 20 MXN

  // Function to convert from MXN to USD
  const convertToUSD = (amountMXN) => {
    return amountMXN * exchangeRateMXNtoUSD;
  };

  // Function to convert from USD to MXN
  const convertToMXN = (amountUSD) => {
    return amountUSD * exchangeRateUSDtoMXN;
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  useEffect(() => {
    setTotal(totalItems);
    setProductos(cartItems);
  }, [totalItems, cartItems]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setTotal(totalItems);
  };

  const handlePayment = async (cartItems) => {
    if (selectedOption === "creditCard") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        clearCart();
        setMadePayment((prevState) => !prevState);
        updateNotification("success", message);
      }
    } else if (selectedOption === "debitCard") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        clearCart();
        setMadePayment((prevState) => !prevState);
        updateNotification("success", message);
      }
    } else if (selectedOption === "cash") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        clearCart();
        setMadePayment((prevState) => !prevState);
        updateNotification("success", message);
      }
    } else if (selectedOption === "transfer") {
      const { message, error } = await createVenta(cartItems);
      if (error) {
        updateNotification("error", error);
      } else if (message) {
        clearCart();
        setMadePayment((prevState) => !prevState);
        updateNotification("success", message);
      }
    } else {
      updateNotification("error", "Selecciona una opción de pago");
    }
  };

  if (cartItems.length === 0 && !madePayment)
    return (
      <p className="text-2xl font-bold mt-14 w-full text-center">
        Sin productos
      </p>
    );

  if (!isLoggedIn) {
    navigate("/login");
    return updateNotification("error", "Inicia sesión para continuar");
  } else if (madePayment) {
    return (
      <div className="w-full h-screen">
        <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
          <span className="text-9xl">
            <RxCheckCircled />
          </span>
          <h1>Pago aprobado</h1>
          <div className="w-96">
            <Link to="/compras">
              <button className="p-2 pl-20 pr-20 bg-compraBoton text-white rounded-2xl font-bold mt-3 w-full">
                Ver en mis compras
              </button>
            </Link>
            <Link to="/">
              <button className="p-2 pl-20 pr-20 bg-compraBoton text-white rounded-2xl font-bold mt-3 w-full">
                Página principal
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <p className="text-2xl font-thin">
              Pagas:{" "}
              {selectedCurrency === "MXN"
                ? priceFormatter.format(total)
                : priceFormatter.format(convertToUSD(total))}
              {selectedCurrency}
            </p>
          </div>
          <div>
            <div>
              <p className="text-2xl font-bold">Selecciona la moneda:</p>
              <div>
                <label>
                  <input
                    type="radio"
                    name="currency"
                    value="MXN"
                    checked={selectedCurrency === "MXN"}
                    onChange={handleCurrencyChange}
                  />
                  MXN
                </label>
                <label>
                  <input
                    type="radio"
                    name="currency"
                    value="USD"
                    checked={selectedCurrency === "USD"}
                    onChange={handleCurrencyChange}
                  />
                  USD
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-16">
            <Link to="/checkout">
              <button
                type="button"
                className="p-2 pl-20 pr-20 bg-compraBoton text-white rounded-2xl font-bold mt-3"
                onClick={() => handlePayment(productos)}
              >
                Continuar
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
