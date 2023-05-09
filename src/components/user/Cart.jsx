import { useCart } from "../../hooks/index.js";
import ProductCart from "../products/ProductCart.jsx";
import ResumenCompra from "../products/ResumenCompra.jsx";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <>
      {cartItems.length ? (
        <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 min-h-max max-w-full">
          <div className="border-4 rounded-xl w-[950px]">
            <table>
              <thead className="border-b-4 pb-4 p-4">
                <tr>
                  <th className="pl-6">Productos</th>
                </tr>
              </thead>
              <tbody className="pb-8">
                {cartItems.length
                  ? cartItems.map((product) => (
                      <ProductCart
                        key={product.clave_producto}
                        producto={product}
                      />
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <div>
            <ResumenCompra></ResumenCompra>
          </div>
        </section>
      ) : (
        <section className="flex justify-evenly items-center mt-14 space-x-4 min-h-full">
          <div className="border-4 rounded-xl w-[950px]">
            <p className="text-center text-lg font-bold">
              No hay productos en el carrito
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
