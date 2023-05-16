import ModalContainer from "./ModalContainer.jsx";
import { TiDelete } from "react-icons/ti";
import FormInput from "../form/FormInput.jsx";
import Submit from "../form/Submit.jsx";
import { useState } from "react";
import { deleteProducto, editCantidadProducto } from "../../api/products.js";
import { useNotification } from "../../hooks/index.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DeleteProductModal = ({
  visible,
  onClose,
  idProducto,
  cantidadInicial,
}) => {
  const [cantidadEliminar, setCantidadEliminar] = useState(cantidadInicial);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    if (target.value < 0) return setCantidadEliminar(0);
    setCantidadEliminar(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEditProduct();
    onClose();
  };

  const handleEditProduct = async () => {
    setLoadingEdit((prev) => !prev);
    const { message, error } = await editCantidadProducto(
      idProducto,
      cantidadEliminar
    );
    if (error) {
      setLoadingEdit((prev) => !prev);
      return updateNotification("error", error);
    }
    setLoadingEdit((prev) => !prev);
    updateNotification("success", message);
  };

  const handleDeleteProduct = async () => {
    setLoadingDelete((prev) => !prev);
    const { message } = await deleteProducto(idProducto);
    setLoadingDelete((prev) => !prev);
    updateNotification("success", message);
    navigate("/");
  };

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
              <h1 className="font-bold text-xl ml-[20rem]">
                Eliminar producto
              </h1>
              <button onClick={onClose}>
                <TiDelete className="text-2xl" />
              </button>
            </div>
            <div>
              <FormInput
                typeform="field"
                name="cantidadEliminar"
                modal={true}
                label="Cantidad de producto a cambiar"
                placeholder="Ingrese la cantidad de producto a eliminar"
                onChange={handleChange}
                value={cantidadEliminar}
              />
              <div className="flex justify-end space-x-4 w-fit h-fit">
                <Submit value="Cancelar" type="button" onClick={onClose} />
                <Submit
                  value="Eliminar todo el producto"
                  type="button"
                  onClick={handleDeleteProduct}
                  busy={loadingDelete}
                />
                <Submit
                  value="Cambiar existencia"
                  type="submit"
                  busy={loadingEdit}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

DeleteProductModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idProducto: PropTypes.string.isRequired,
  cantidadInicial: PropTypes.number.isRequired,
};

export default DeleteProductModal;
