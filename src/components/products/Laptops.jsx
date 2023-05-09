import { useEffect, useState } from "react";
import { useCart, useProducts } from "../../hooks/index.js";
import Product from "./Product.jsx";

const Computadoras = () => {
  // eslint-disable-next-line no-unused-vars
  const { fetchProductos, products } = useProducts();
  const { updateCartItems } = useCart();
  const { updateExistencia } = useProducts();
  const [soloLaptops, setSoloLaptops] = useState([]);

  useEffect(() => {
    const soloLaptops = products.filter(
      (product) => product.Departamento?.nombre_departamento === "Laptops"
    );

    setSoloLaptops(soloLaptops);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductos();
    };
    fetchProducts();
  }, []);

  return (
    <section className="flex justify-evenly items-center mt-14 space-x-4 p-6 h-full">
      <div className="grid grid-cols-4 w-full gap-6 first:ml-10 last:mr-10 rounded-2xl">
        {soloLaptops.length
          ? soloLaptops.map((product) => (
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

export default Computadoras;
