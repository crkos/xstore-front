import { useNotification } from "../../hooks/index.js";
import ModalContainer from "./ModalContainer.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../form/FormInput.jsx";
import { createProveedor } from "../../api/proveedor.js";

const initalState = {
  nombre_proveedor: "",
  direccion: "",
  telefono: "",
  correo: "",
  rfc: "",
};
const AñadirProveedorModal = ({ showContainer, onClose, onSubmit }) => {
  const { updateNotification } = useNotification();

  const [proveedor, setProveedor] = useState({ ...initalState });

  const validateForm = () => {
    const { nombre_proveedor, direccion, telefono, correo, rfc } = proveedor;
    return !!(nombre_proveedor && direccion && telefono && correo && rfc);
  };
  const addProveedor = async () => {
    if (!validateForm()) return updateNotification("error", "Faltan campos");
    const { message, error } = await createProveedor(proveedor);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onClose();
    setProveedor({ ...initalState });
    onSubmit();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProveedor({ ...proveedor, [name]: value });
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
              name="nombre_proveedor"
              label="Nombre"
              value={proveedor.nombre_proveedor}
              onChange={handleChange}
              modal={true}
            />
            <FormInput
              name="direccion"
              label="Direccion"
              value={proveedor.direccion}
              onChange={handleChange}
              modal={true}
            />
          </div>
          <div className="flex space-x-4">
            <FormInput
              name="telefono"
              label="Telefono"
              value={proveedor.telefono}
              onChange={handleChange}
              modal={true}
            />
            <FormInput
              name="correo"
              label="Correo"
              value={proveedor.correo}
              onChange={handleChange}
              modal={true}
            />
            <FormInput
              name="rfc"
              label="RFC"
              value={proveedor.rfc}
              onChange={handleChange}
              modal={true}
            />
          </div>
          <div className="w-full flex justify-between">
            <button
              className="rounded-2xl bg-compraBoton pt-2 pb-2 pl-10 pr-10 hover:bg-blue-500 transition duration-300 ease-in-out text-white"
              onClick={() => addProveedor()}
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

AñadirProveedorModal.propTypes = {
  showContainer: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AñadirProveedorModal;
