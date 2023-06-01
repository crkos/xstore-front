import { useNotification } from "../../hooks/index.js";
import ModalContainer from "./ModalContainer.jsx";
import PropTypes from "prop-types";
import { deleteProveedor } from "../../api/proveedor.js";

const EliminarModal = ({
  showContainer,
  onClose,
  claveProveedor,
  afterDelete,
}) => {
  const { updateNotification } = useNotification();

  const deleteProveedorId = async () => {
    const { message, error } = await deleteProveedor(claveProveedor);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onClose();
    afterDelete();
  };
  return (
    <ModalContainer
      visible={showContainer}
      onClose={onClose}
      ignoreContainer={true}
    >
      <div className="bg-submitColor rounded w-fit h-fit overflow-auto p-2">
        <div className="border-4 border-modalBorderColor rounded-lg pb-8 pl-8 pr-8 space-y-2 w-fit">
          <h1 className="text-xl font-bold">
            ¿Seguro que desea eliminar el proveedor?
          </h1>
          <div className="w-full flex justify-between">
            <button
              className="rounded-2xl bg-eliminarBoton pt-2 pb-2 pl-10 pr-10 hover:bg-red-500 transition duration-300 ease-in-out text-white"
              onClick={deleteProveedorId}
            >
              Eliminar
            </button>
            <button
              className="rounded-2xl bg-compraBoton pt-2 pb-2 pl-10 pr-10 hover:bg-blue-500 transition duration-300 ease-in-out text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

EliminarModal.propTypes = {
  showContainer: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  empleado: PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    apellido_paterno: PropTypes.string.isRequired,
    apellido_materno: PropTypes.string.isRequired,
  }),
  afterDelete: PropTypes.func.isRequired,
  claveProveedor: PropTypes.string.isRequired,
};

export default EliminarModal;
