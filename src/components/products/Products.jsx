import { useEffect, useState } from "react";
import { useAuth, useCart, useProducts } from "../../hooks/index.js";
import Product from "./Product.jsx";
import { getProductosBySucursal } from "../../api/products.js";

const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const { fetchProductos, products } = useProducts();
  const [productosGerente, setProductosGerente] = useState([]);
  const { updateCartItems } = useCart();
  const { updateExistencia } = useProducts();

  const { authInfo } = useAuth();

  const { profile } = authInfo;

  const gerente = profile?.role;

  const isGerente = gerente === "Gerente";

  const fetchProductosGerente = async () => {
    const { productos } = await getProductosBySucursal();
    setProductosGerente(productos);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductosGerente();
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductos();
    };
    fetchProducts();
  }, []);

  if (isGerente) {
    return (
      <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 h-full">
        <div className="grid grid-cols-4 w-full gap-6 first:ml-10 last:mr-10 rounded-2xl">
          {productosGerente.length
            ? productosGerente.map((product) => (
                <Product
                  key={product.clave_producto}
                  product={product}
                  updateCartItems={updateCartItems}
                  updateExistencia={updateExistencia}
                />
              ))
            : null}
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 h-full">
      <div className="grid grid-cols-4 w-full gap-6 first:ml-10 last:mr-10 rounded-2xl">
        {products.length
          ? products.map((product) => (
              <Product
                key={product.clave_producto}
                product={product}
                updateCartItems={updateCartItems}
                updateExistencia={updateExistencia}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default Products;
