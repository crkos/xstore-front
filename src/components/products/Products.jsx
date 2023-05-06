import { useEffect } from "react";
import { useProducts } from "../../hooks/index.js";
import Product from "./Product.jsx";

const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const { fetchProductos, products } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductos();
    };
    fetchProducts();
  }, []);

  return (
    <section className="flex justify-center items-center h-[55vh]">
      <div className="grid grid-cols-4 w-full gap-6 first:ml-10 last:mr-10 rounded-2xl">
        {products.length
          ? products.map((product) => (
              <Product key={product.clave_producto} product={product} />
            ))
          : null}
      </div>
    </section>
  );
};

export default Products;
