import { useSearchParams } from "react-router-dom";
import { useCart, useProducts } from "../../hooks/index.js";
import { useEffect, useState } from "react";
import Product from "./Product.jsx";
import { searchProducto } from "../../api/products.js";
import NotFoundText from "./NotFound.jsx";

const SearchStore = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [resultsNotFound, setResultsNotFound] = useState(false);

  const { updateCartItems } = useCart();
  const { updateExistencia } = useProducts();

  let query;

  query = searchParams.get("producto");

  const fetchProducts = async (value) => {
    const { productos } = await searchProducto(value);
    if (!productos.length) {
      setResultsNotFound(true);
      return setProductos([]);
    }
    setResultsNotFound(false);
    setProductos([...productos]);
  };

  useEffect(() => {
    const fetchProductsEffect = async (query) => {
      await fetchProducts(query);
    };
    fetchProductsEffect(query);
  }, [query]);

  if (resultsNotFound) {
    return (
      <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 h-full">
        <NotFoundText
          text="No se encontraron resultados"
          visible={resultsNotFound}
        />
      </section>
    );
  }
  return (
    <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 h-full">
      <div className="grid grid-cols-4 w-full gap-6 first:ml-10 last:mr-10 rounded-2xl">
        {productos.length
          ? productos.map((producto) => (
              <Product
                key={producto.clave_producto}
                product={producto}
                updateCartItems={updateCartItems}
                updateExistencia={updateExistencia}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default SearchStore;
