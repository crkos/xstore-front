import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProducto } from "../../api/products.js";
import { useAuth, useCart, useNotification } from "../../hooks/index.js";
import { priceFormatter } from "../../utils/formatter.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteProductModal from "../admin/DeleteProductModal.jsx";
import EditProductModal from "../admin/EditProductModal.jsx";

const SingleProduct = () => {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [showEditRemoveModal, setShowEditRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOnCloseRemove = () => setShowEditRemoveModal(false);

  const handleOnCloseEdit = () => setShowEditModal(false);

  const { updateNotification } = useNotification();

  const { updateCartItems } = useCart();

  const navigate = useNavigate();

  const { authInfo } = useAuth();

  const { profile } = authInfo;

  const admin = profile?.role;

  const isGerente = admin === "Gerente";

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

  const afterEdit = async (producto) => {
    setSingleProduct(producto);
  };

  useEffect(() => {
    const getProduct = async () => {
      await getSingleProduct();
    };
    getProduct();
  }, [productId]);

  const { imagen_producto, descripcion, nombre_producto, precio } =
    singleProduct;

  if (
    Object.keys(singleProduct).length === 0 &&
    singleProduct.constructor === Object
  )
    return (
      <section className="flex justify-center items-center h-[60vh] w-full">
        <h1 className="text-xl font-bold text-center">
          No existe este producto
        </h1>
      </section>
    );

  return (
    <section className="justify-center items-center h-[60vh] w-full">
      <div className="flex flex-col justify-center items-center pt-20 h-full">
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
                className="mx-auto pb-2 pt-2 w-full bg-compraBoton rounded-xl opacity-70"
                onClick={() => handleAddToCart(singleProduct)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        {isGerente ? (
          <BotonesEdicion
            handleEdit={() => setShowEditModal(true)}
            handleDelete={() => setShowEditRemoveModal(true)}
          />
        ) : null}
      </div>
      <DeleteProductModal
        visible={showEditRemoveModal}
        onClose={handleOnCloseRemove}
        idProducto={productId}
        cantidadInicial={singleProduct.existencia}
      />
      <EditProductModal
        visible={showEditModal}
        onClose={handleOnCloseEdit}
        producto={singleProduct}
        afterEdit={afterEdit}
      />
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const BotonesEdicion = ({ handleEdit, handleDelete }) => {
  return (
    <div className="flex justify-between items-center w-[50vh] mt-4">
      <div className="text-lg">
        <button
          className="flex justify-center items-center space-x-2"
          onClick={handleEdit}
        >
          <p>Editar</p>
          <FaEdit />
        </button>
      </div>
      <div className="text-lg">
        <button
          className="flex justify-center items-center space-x-2"
          onClick={handleDelete}
        >
          <FaTrash />
          <p>Eliminar</p>
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
