import ModalContainer from "./ModalContainer.jsx";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import FormInput from "../form/FormInput.jsx";
import { IoAddCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  createPersonal,
  editPersonal,
  getSinglePersonal,
} from "../../api/personal.js";
import { useNotification } from "../../hooks/index.js";
import Selector from "./Selector.jsx";
import SucursalSelector from "./SucursalSelector.jsx";
import { AiFillEdit } from "react-icons/ai";

const defaultPersonal = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  curp: "",
  rfc: "",
  telefono: "",
  correo_electronico: "",
  direccion: "",
  turno: "",
  funcion: "",
  sucursal: "",
  contrasena: "",
};
const EditPersonal = ({ visible, onClose, afterAdd, selectedPersonal }) => {
  const [personal, setPersonal] = useState({
    ...defaultPersonal,
  });

  useEffect(() => {
    const fetchPersonal = async () => {
      const { personal } = await getSinglePersonal(selectedPersonal);
      setPersonal(personal);
    };

    fetchPersonal();
  }, [selectedPersonal]);

  const handleChange = ({ target }) => {
    setPersonal((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const { updateNotification } = useNotification();

  const updateSucursal = (profile) => {
    setPersonal({ ...personal, sucursal: profile.clave_sucursal });
  };
  const handleSubmit = async () => {
    const { message, error } = await editPersonal(personal, selectedPersonal);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setPersonal({ ...defaultPersonal });
    afterAdd();
    onClose();
  };

  const funcionOptions = [
    { value: "b27c8153-3859-4ecf-88bc-a95d86bc3a89", title: "Administrador" },
    { value: "e10a43e1-1e09-4e57-9ff3-c310f7be7822", title: "Gerente" },
  ];

  const turnoOptions = [
    { value: "Matutino", title: "Matutino" },
    { value: "Vespertino", title: "Vespertino" },
  ];

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <div className="bg-submitColor rounded w-fit h-fit overflow-auto p-2">
        <div className="border-4 border-modalBorderColor rounded-lg pb-8 pl-8 pr-8 space-y-2 w-fit">
          <h1 className="text-xl font-bold">Editar empleado</h1>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <FaUserCircle className="text-5xl" />
            <FormInput
              name="nombre"
              modal={true}
              label="Nombre(s)"
              type="string"
              placeholder="Nombre..."
              onChange={handleChange}
              value={personal.nombre}
            />
            <FormInput
              name="apellidoPaterno"
              modal={true}
              label="Apellido paterno"
              type="string"
              placeholder="Apellido paterno..."
              onChange={handleChange}
              value={personal.apellidoPaterno}
            />
            <FormInput
              name="apellidoMaterno"
              modal={true}
              label="Apellido materno"
              type="string"
              placeholder="Apellido materno..."
              onChange={handleChange}
              value={personal.apellidoMaterno}
            />
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <FormInput
              name="curp"
              modal={true}
              label="CURP"
              type="string"
              placeholder="Curp..."
              onChange={handleChange}
              value={personal.curp}
            />
            <FormInput
              name="rfc"
              modal={true}
              label="RFC"
              type="string"
              placeholder="RFC..."
              onChange={handleChange}
              value={personal.rfc}
            />
            <FormInput
              name="telefono"
              modal={true}
              label="Telefono"
              type="string"
              placeholder="612..."
              onChange={handleChange}
              value={personal.telefono}
            />
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <div className="relative w-full">
              <div className="flex flex-col-reverse mb-8">
                <div className="relative">
                  <textarea
                    id="direccion"
                    name="direccion"
                    className="bg-modalBorderColor resize-none bg-opacity-50 rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    placeholder="Dirección..."
                    onChange={handleChange}
                    value={personal.direccion}
                  />
                </div>
                <label
                  htmlFor="direccion"
                  className="font-bold text-secondary peer-focus:text-primary transition self-start mb-1"
                >
                  Dirección
                </label>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <FormInput
              name="correo_electronico"
              modal={true}
              label="Email"
              type="email"
              placeholder="Email..."
              onChange={handleChange}
              value={personal.correo_electronico}
            />
            <SucursalSelector
              onSelect={updateSucursal}
              prevSelected={personal.sucursal.nombre_sucursal}
            />
            <Selector
              name="funcion"
              onChange={handleChange}
              value={personal.funcion}
              label="Funcion"
              options={funcionOptions}
            />
            <Selector
              name="turno"
              onChange={handleChange}
              value={personal.turno}
              label="Turno"
              options={turnoOptions}
            />
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <FormInput
              name="contrasena"
              modal={true}
              label="Contraseña"
              type="password"
              placeholder="Contraseña..."
              onChange={handleChange}
              value={personal.contrasena}
            />
          </div>
          <div className="w-full flex justify-evenly items-end">
            <button
              className="bg-submitColor hover:bg-submitColor hover:bg-opacity-50 text-black border-2 rounded-xl border-black font-bold py-2 px-4 pl-6 pr-6"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-submitColor hover:bg-submitColor hover:bg-opacity-50 text-black border-2 rounded-xl border-black font-bold py-2 px-4 pl-6 pr-6 flex items-center justify-center"
              onClick={handleSubmit}
            >
              <AiFillEdit className="text-2xl" />
              Editar empleado
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

EditPersonal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  afterAdd: PropTypes.func,
  selectedPersonal: PropTypes.string,
};

export default EditPersonal;
