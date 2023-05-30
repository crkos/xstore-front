import { AiFillEdit, AiFillPrinter } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPersonal } from "/src/api/personal";
import { useAuth } from "../../hooks/index.js";
import PropTypes from "prop-types";
import FloatingButton from "./FloatingButton.jsx";
import { MdDeleteForever } from "react-icons/md";
import EliminarModal from "./EliminarModal.jsx";
import AddPersonal from "./AddPersonal.jsx";
import handlePrint from "./helper/handlePrint.js";
import EditPersonal from "./EditPersonal.jsx";

const Plantilla = () => {
  const [personnel, setPersonnel] = useState([]);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showAnadirEmpleado, setShowAnadirEmpleado] = useState(false);
  const [showEditarEmpleado, setShowEditarEmpleado] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
  });
  const [personalId, setPersonalId] = useState("");

  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  const handleSelectedEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
  };

  const handleSelectedPersonalId = (id) => {
    setPersonalId(id);
  };

  const handleAfterDelete = () => {
    const newPersonnel = personnel.filter(
      (empleado) => empleado.id !== selectedEmpleado.id
    );
    setPersonnel(newPersonnel);
  };

  const handleEliminar = () => {
    setShowEliminar(true);
  };

  const handleEliminarClose = () => {
    setShowEliminar(false);
  };

  const handleCloseAddPersonal = () => {
    setShowAnadirEmpleado(false);
  };

  const handleOpenEditPersonal = () => {
    setShowEditarEmpleado(true);
  };

  const handleCloseEditPersonal = () => {
    setShowEditarEmpleado(false);
  };

  const handleOpenAddPersonal = () => {
    setShowAnadirEmpleado(true);
  };

  const handleAfterAddEmpleado = async () => {
    await fetchPersonal();
  };

  const fetchPersonal = async () => {
    const { personal } = await getPersonal();
    setPersonnel(personal);
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-evenly mt-8">
        <h1 className="text-2xl font-bold">Plantilla de empleado</h1>
        <button
          onClick={() => handlePrint("Plantilla.pdf", "tabla", "paisaje")}
        >
          <AiFillPrinter className="text-3xl" />
        </button>
        <button className="flex items-center justify-center">
          <IoArrowBackOutline />
          <Link
            className="text-black font-bold text-xl underline"
            to="/consultas"
          >
            Volver
          </Link>
        </button>
      </div>
      <div className="flex justify-center mt-12">
        <table
          className="table-auto table border-black border-separate bg-modalBorderColor bg-opacity-50 rounded border-spacing-3"
          id="tabla"
        >
          <thead className="p-2">
            <tr className="space-x-24 p-6 text-center">
              <th className="border-separate">Id</th>
              <th>Nombre(s)</th>
              <th>AP</th>
              <th>AM</th>
              <th>CURP</th>
              <th>RFC</th>
              <th>E-mail</th>
              <th>Teléfono</th>
              <th>Sucursal</th>
              <th>Puesto</th>
              <th>Turno</th>
              <th>Año ingreso</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody className="p-2 bg-transparent">
            {personnel.length
              ? personnel.map((personal) => (
                  <TableRow
                    key={personal.id}
                    personal={personal}
                    handleEliminar={handleEliminar}
                    handleSelectedEmpleado={handleSelectedEmpleado}
                    handleSelectedPersonalId={handleSelectedPersonalId}
                    handleEdit={handleOpenEditPersonal}
                  />
                ))
              : null}
          </tbody>
        </table>
        <FloatingButton onClick={handleOpenAddPersonal} />
      </div>
      <EliminarModal
        onClose={handleEliminarClose}
        showContainer={showEliminar}
        empleado={selectedEmpleado}
        afterDelete={handleAfterDelete}
      />
      <AddPersonal
        visible={showAnadirEmpleado}
        onClose={handleCloseAddPersonal}
        afterAdd={handleAfterAddEmpleado}
      />
      {personalId && (
        <EditPersonal
          visible={showEditarEmpleado}
          onClose={handleCloseEditPersonal}
          afterAdd={handleAfterAddEmpleado}
          selectedPersonal={personalId}
        />
      )}
    </section>
  );
};

const TableRow = ({
  personal,
  handleEliminar,
  handleEdit,
  handleSelectedEmpleado,
  handleSelectedPersonalId,
}) => {
  const {
    id,
    nombre,
    apellido_paterno,
    apellido_materno,
    curp,
    rfc,
    correo_electronico,
    telefono,
    sucursal,
    turno,
    funcion,
    direccion,
    ano_ingreso,
  } = personal;

  const fechaFormateada = new Date(ano_ingreso);

  const handleEliminarSelected = () => {
    handleSelectedEmpleado(personal);
    handleEliminar();
  };

  const handleEditSelected = () => {
    handleSelectedPersonalId(id);
    handleEdit();
  };

  return (
    <tr className="space-x-24 p-6 text-center">
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{apellido_paterno}</td>
      <td>{apellido_materno}</td>
      <td>{curp}</td>
      <td>{rfc}</td>
      <td>{correo_electronico}</td>
      <td>{telefono}</td>
      <td>{sucursal.nombre}</td>
      <td>{funcion.nombre}</td>
      <td>{turno}</td>
      <td>{fechaFormateada.toLocaleDateString("es-MX")}</td>
      <td>{direccion}</td>
      <td>
        <button onClick={handleEditSelected}>{<AiFillEdit />}</button>
      </td>
      <td>
        <button onClick={handleEliminarSelected}>{<MdDeleteForever />}</button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  personal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido_paterno: PropTypes.string.isRequired,
    apellido_materno: PropTypes.string.isRequired,
    curp: PropTypes.string.isRequired,
    rfc: PropTypes.string.isRequired,
    correo_electronico: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    sucursal: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
    }),
    turno: PropTypes.string.isRequired,
    funcion: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
    }),
    direccion: PropTypes.string.isRequired,
    ano_ingreso: PropTypes.string.isRequired,
  }),
  handleEliminar: PropTypes.func.isRequired,
  handleSelectedEmpleado: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSelectedPersonalId: PropTypes.func.isRequired,
};

export default Plantilla;
