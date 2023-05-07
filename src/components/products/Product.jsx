import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { priceFormatter } from "../../utils/formatter.js";

// eslint-disable-next-line react/prop-types
const Product = ({ product, updateCartItems, updateExistencia }) => {
  const updateCartNItems = (itemProduct) => {
    updateCartItems(itemProduct);
    // eslint-disable-next-line react/prop-types
    updateExistencia(itemProduct.clave_producto);
  };

  const { precio } = product;

  return (
    <div className="bg-submitColor p-4 flex flex-col justify-center pt-4 shadow-lg drop-shadow-md h-full w-full">
      <Link to={"/product/" + product.clave_producto}>
        <div className="flex items-center justify-center border-b-4 drop-shadow-md pb-2 mb-2">
          {/* eslint-disable-next-line react/prop-types */}
          <img alt="PC" src={product.imagen_producto} />
        </div>
      </Link>
      {/* eslint-disable-next-line react/prop-types */}

      <div className="flex items-center justify-between mb-4">
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-2xl font-bold">{priceFormatter.format(precio)}</p>
        {/* eslint-disable-next-line react/prop-types */}
        {product.existencia > 0 ? (
          <button type="button" onClick={() => updateCartNItems(product)}>
            <IoCartSharp className="text-3xl" />
          </button>
        ) : (
          <button type="button" disabled={true}>
            <IoCartSharp className="text-3xl" />
          </button>
        )}
      </div>

      {/* eslint-disable-next-line react/prop-types */}
      <p>{product.descripcion}</p>
    </div>
  );
};

export default Product;
