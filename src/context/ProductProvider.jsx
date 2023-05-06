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

  return (
    <ProductContext.Provider value={{ products, loading, fetchProductos }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
