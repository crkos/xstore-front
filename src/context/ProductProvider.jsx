import { createContext, useState } from "react";
import { getProductos } from "../api/products.js";
import { useNotification } from "../hooks/index.js";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { updateNotification } = useNotification();

  const fetchProductos = async () => {
    setLoading((prevState) => !prevState);
    const { error, productos } = await getProductos();
    if (error) return updateNotification("error", error);

    setProducts(productos);
    setLoading((prevState) => !prevState);
  };

  const updateExistencia = (clave_producto) => {
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.clave_producto === clave_producto) {
          return {
            ...product,
            existencia: product.existencia - 1,
            cantidad: product.cantidad + 1,
          };
        }
        return product;
      });
    });
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, fetchProductos, updateExistencia }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
