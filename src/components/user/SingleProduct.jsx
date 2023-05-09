import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProducto } from "../../api/products.js";
import { useCart, useNotification } from "../../hooks/index.js";
import { priceFormatter } from "../../utils/formatter.js";

const SingleProduct = () => {
  const { productId } = useParams();

  const [singleProduct, setSingleProduct] = useState({});

  const { updateNotification } = useNotification();

  const { updateCartItems } = useCart();

  const navigate = useNavigate();

  const getSingleProduct = async () => {
    const { producto, error } = await getSingleProducto(productId);
    if (error) return updateNotification("error", error);
    setSingleProduct({ ...producto });
  };

  const handleBuy = async (product) => {
    if (product.existencia <= 0)
      return updateNotification("error", "Producto sin existencia");
    if (product.existencia > 0)
      updateNotification("success", "Producto agregado al carrito");
    updateCartItems(product);
    navigate("/checkout");
  };

  const handleAddToCart = async (product) => {
    if (product.existencia <= 0)
      return updateNotification("error", "Producto sin existencia");
    if (product.existencia > 0)
      updateNotification("success", "Producto agregado al carrito");
    updateCartItems(product);
  };

  useEffect(() => {
    const getProduct = async () => {
      await getSingleProduct();
    };
    getProduct();
  }, [productId]);

  const { imagen_producto, descripcion, nombre_producto, precio } =
    singleProduct;

  return (
    <section className="justify-center items-center h-[60vh] w-full">
      <div className="flex justify-center items-center pt-20 h-full">
        <div className="flex space-x-10 p-20 border-4 rounded-xl w-fit">
          <img src={imagen_producto} alt={descripcion} />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{nombre_producto}</h1>
            <p className="text-lg font-bold">{priceFormatter.format(precio)}</p>
            <p className="text-lg">{descripcion}</p>
            <div className="pt-10 space-y-4 text-white">
              <button
                className="mx-auto pb-2 pt-2 w-full bg-compraBoton rounded-xl"
                onClick={() => handleBuy(singleProduct)}
              >
                Comprar ya
              </button>
              <button
                className="mx-auto pb-2 pt-2 w-full bg-compraBoton rounded-xl"
                onClick={() => handleAddToCart(singleProduct)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
