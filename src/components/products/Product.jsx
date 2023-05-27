import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { priceFormatter } from "../../utils/formatter.js";
import PropTypes from "prop-types";
import { shortenText } from "../../utils/subsStringText.js";

const Product = ({ product, updateCartItems, updateExistencia }) => {
  const updateCartNItems = (itemProduct) => {
    updateCartItems(itemProduct);
    updateExistencia(itemProduct.clave_producto);
  };

  const { precio } = product;

  return (
    <div className="bg-submitColor p-4 flex flex-col justify-center pt-4 shadow-lg drop-shadow-md h-full w-full">
      <Link to={"/product/" + product.clave_producto}>
        <div className="flex items-center justify-center border-b-4 drop-shadow-md pb-2 mb-2">
          <img alt="PC" src={product.imagen_producto} />
        </div>
      </Link>

      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold">{priceFormatter.format(precio)}</p>
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

      <p>{shortenText(product.descripcion, 24)}</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    clave_producto: PropTypes.string.isRequired,
    clave_proveedor: PropTypes.string,
    clave_departamento: PropTypes.string,
    nombre_producto: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    existencia: PropTypes.number.isRequired,
    imagen_producto: PropTypes.string.isRequired,
  }).isRequired,
  updateCartItems: PropTypes.func.isRequired,
  updateExistencia: PropTypes.func.isRequired,
};

export default Product;
