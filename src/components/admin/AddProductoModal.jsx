import ModalContainer from "./ModalContainer.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../form/FormInput.jsx";
import ProveedorSelector from "./ProveedorSelector.jsx";
import DepartamentoSelector from "./DepartamentoSelector.jsx";
import ImageSelector from "./ImageSelector.jsx";
import { IoAddCircle } from "react-icons/io5";
import { useNotification } from "../../hooks/index.js";

const defaultProducto = {
  proveedorId: "",
  departamentoId: "",
  nombre_producto: "",
  descripcion: "",
  existencia: "",
  imagen_producto: null,
  precio: "",
};
const AddProductoModal = ({ visible, onClose, onSubmit }) => {
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const [producto, setProducto] = useState({ ...defaultProducto });

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "imagen_producto") {
      const file = files[0];
      updateSelectedAvatarForUI(file);
      setProducto({ ...producto, [name]: file });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const updateProveedor = (profile) => {
    setProducto({ ...producto, proveedorId: profile.clave_proveedor });
  };

  const updateDepartamento = (profile) => {
    setProducto({ ...producto, departamentoId: profile.clave_departamento });
  };

  const updateSelectedAvatarForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };

  const validateProducto = (producto) => {
    const {
      nombre_producto,
      descripcion,
      existencia,
      precio,
      proveedorId,
      departamentoId,
    } = producto;
    if (!nombre_producto.trim()) return { error: "Falta el nombre" };
    if (!descripcion.trim()) return { error: "Falta la descripción" };
    if (!existencia.trim()) return { error: "Falta la existencia" };
    if (!precio.trim()) return { error: "Falta el precio" };
    if (!proveedorId.trim()) return { error: "Falta el proveedor" };
    if (!departamentoId.trim()) return { error: "Falta el departamento" };

    return { error: null };
  };

  const { updateNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateProducto(producto);
    if (error) return updateNotification("error", error);

    const { imagen_producto } = producto;

    const formData = new FormData();

    const productoFinal = {
      ...producto,
    };

    if (imagen_producto) productoFinal.imagen_producto = imagen_producto;

    for (let key in productoFinal) {
      formData.append(key, productoFinal[key]);
    }

    await onSubmit(formData);
    setProducto({ ...defaultProducto });
    setSelectedAvatarForUI(null);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <div className="bg-submitColor rounded w-[45rem] h-[36rem] overflow-auto p-2">
        <div className="border-4 border-modalBorderColor rounded-lg pb-8 pl-8 pr-8 space-y-2 w-full h-full">
          <h1 className="text-xl font-bold">Añadir Producto</h1>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <ImageSelector
              onChange={handleChange}
              name="imagen_producto"
              className="w-15 h-15 aspect-square object-cover"
              label="Imagen Producto"
              selectedPoster={selectedAvatarForUI}
              accept="image/jpg, image/jpeg, image/png"
            />
            <FormInput
              name="nombre_producto"
              modal={true}
              label="Nombre producto"
              type="string"
              placeholder="Nombre producto..."
              onChange={handleChange}
              value={producto.nombre_producto}
            />
            <FormInput
              name="precio"
              modal={true}
              label="Precio"
              type="number"
              placeholder="Precio..."
              onChange={handleChange}
              value={producto.precio}
            />
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <div className="relative w-full">
              <div className="flex flex-col-reverse mb-8">
                <div className="relative">
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="bg-modalBorderColor resize-none bg-opacity-50 rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    placeholder="Descripcion..."
                    onChange={handleChange}
                    value={producto.descripcion}
                  />
                </div>
                <label
                  htmlFor="descripcion"
                  className="font-bold text-secondary peer-focus:text-primary transition self-start mb-1"
                >
                  Descripción
                </label>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full items-center justify-evenly">
            <FormInput
              name="existencia"
              modal={true}
              label="Existencia"
              type="number"
              placeholder="Existencia..."
              onChange={handleChange}
              value={producto.existencia}
            />
            <ProveedorSelector
              onSelect={updateProveedor}
              prevSelected={producto.nombre_proveedor}
            />
            <DepartamentoSelector
              onSelect={updateDepartamento}
              prevSelected={producto.nombre_departamento}
            />
          </div>
          <div className="flex space-x-4 w-full items-center justify-end">
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
              <IoAddCircle className="text-2xl" />
              Añadir producto
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

AddProductoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  afterAdd: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddProductoModal;
