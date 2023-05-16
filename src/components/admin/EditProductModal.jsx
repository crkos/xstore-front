import ModalContainer from "./ModalContainer.jsx";
import { TiDelete } from "react-icons/ti";
import FormInput from "../form/FormInput.jsx";
import Submit from "../form/Submit.jsx";
import Label from "../form/Label.jsx";
import { useState } from "react";
import PropTypes from "prop-types";
import { editProducto } from "../../api/products.js";
import { useNotification } from "../../hooks/index.js";

// eslint-disable-next-line react/prop-types
const EditProductModal = ({ visible, onClose, producto, afterEdit }) => {
  const [editedProducto, setEditedProducto] = useState({
    nombre_producto: producto.nombre_producto,
    precio: producto.precio,
    descripcion: producto.descripcion,
  });
  const [loading, setLoading] = useState(false);

  const { updateNotification } = useNotification();

  const handleOnChange = (e) => {
    setEditedProducto({ ...editedProducto, [e.target.name]: e.target.value });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const {
      message,
      error,
      producto: newProducto,
    } = await editProducto(producto.clave_producto, editedProducto);
    setLoading((prev) => !prev);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    afterEdit(newProducto);
    onClose();
  };

  const { nombre_producto, precio, descripcion } = editedProducto;

  return (
    <>
      <ModalContainer
        visible={visible}
        onClose={onClose}
        ignoreContainer={true}
      >
        <div className="bg-submitColor rounded w-fit h-fit overflow-auto p-2">
          <div className="border-4 border-modalBorderColor rounded-lg pb-8 pl-8 pr-8 space-y-2 w-fit">
            <div className="flex items-center justify-between mt-2">
              <h1 className="font-bold text-xl ml-[10rem]">Editar Producto</h1>
              <button onClick={onClose}>
                <TiDelete className="text-2xl" />
              </button>
            </div>
            <div>
              <FormInput
                typeform="field"
                name="nombre_producto"
                modal={true}
                label="Nombre del producto"
                placeholder="Nombre del producto..."
                onChange={handleOnChange}
                value={nombre_producto}
              />
              <FormInput
                typeform="field"
                name="precio"
                modal={true}
                label="Precio"
                placeholder="Precio del producto..."
                onChange={handleOnChange}
                value={precio}
              />
              <Label htmlFor="descripcion">Descripción</Label>
              <textarea
                value={descripcion}
                onChange={handleOnChange}
                name="descripcion"
                id="descripcion"
                className="border-b-2 resize-none h-24 bg-modalBorderColor bg-opacity-50 rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="Descripción del producto..."
              ></textarea>
              <div className="flex justify-end space-x-4 w-fit h-fit">
                <Submit value="Cancelar" type="button" onClick={onClose} />
                <Submit
                  value="Guardar cambios"
                  type="button"
                  onClick={handleEditProduct}
                  busy={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

EditProductModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  producto: PropTypes.object.isRequired,
  afterEdit: PropTypes.func.isRequired,
};

export default EditProductModal;
