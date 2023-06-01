import { useNotification } from "../../hooks/index.js";
import ModalContainer from "./ModalContainer.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../form/FormInput.jsx";
import { createSucursal } from "../../api/sucursal.js";

const initalState = {
  nombre_sucursal: "",
};
const AñadirSucursalModal = ({ showContainer, onClose, onSubmit }) => {
  const { updateNotification } = useNotification();

  const [sucursal, setSucursal] = useState({ ...initalState });

  const validateForm = () => {
    const { nombre_sucursal } = sucursal;
    if (!nombre_sucursal)
      return updateNotification("error", "Falta el nombre de la sucursal");
    return true;
  };

  const addSucursal = async () => {
    if (!validateForm()) return;
    const { message, error } = await createSucursal(sucursal);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onClose();
    setSucursal({ ...initalState });
    onSubmit();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSucursal({ ...sucursal, [name]: value });
  };

  return (
    <ModalContainer
      visible={showContainer}
      onClose={onClose}
      ignoreContainer={true}
    >
      <div className="bg-submitColor rounded w-fit h-fit overflow-auto p-2">
        <div className="border-4 border-modalBorderColor rounded-lg pb-8 pl-8 pr-8 space-y-2 w-fit">
          <h1 className="text-xl font-bold">Añadir Proveedor</h1>
          <div className="flex space-x-4">
            <FormInput
              name="nombre_sucursal"
              label="Nombre"
              value={sucursal.nombre_sucursal}
              onChange={handleChange}
              modal={true}
            />
          </div>
          <div className="w-full flex justify-between space-x-4">
            <button
              className="rounded-2xl bg-compraBoton pt-2 pb-2 pl-10 pr-10 hover:bg-blue-500 transition duration-300 ease-in-out text-white"
              onClick={() => addSucursal()}
            >
              Añadir
            </button>
            <button
              className="rounded-2xl bg-eliminarBoton pt-2 pb-2 pl-10 pr-10 hover:bg-red-500 transition duration-300 ease-in-out text-white"
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

AñadirSucursalModal.propTypes = {
  showContainer: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AñadirSucursalModal;
